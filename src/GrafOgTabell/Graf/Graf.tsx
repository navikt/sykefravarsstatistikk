import React, { FunctionComponent } from 'react';

import './Graf.less';
import 'nav-frontend-tabell-style';
import { Sykefraværshistorikk } from '../../api/sykefraværshistorikk';
import { finnesBransjeIHistorikken, getLinjerMedLabel, lagTickString } from './graf-utils';
import { useInnerWidth } from '../../utils/innerWidth-hook';
import { konverterTilKvartalsvisSammenligning } from '../../utils/sykefraværshistorikk-utils';
import { LegendMedToggles } from './LegendMedToggles/LegendMedToggles';
import GrafVisning from './GrafVisning';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const Graf: FunctionComponent<Props> = (props) => {
    const innerWidth = useInnerWidth();

    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        props.sykefraværshistorikk
    );

    const kvartalsvisSammenligningData = kvartalsvisSammenligning.map((sammenligning) => {
        const {
            årstall,
            kvartal,
            virksomhet,
            overordnetEnhet,
            næringEllerBransje,
            sektor,
            land,
        } = sammenligning;
        return {
            ...sammenligning,
            name: lagTickString(årstall, kvartal),
            virksomhet: virksomhet.prosent,
            overordnetEnhet: overordnetEnhet.prosent,
            næringEllerBransje: næringEllerBransje.prosent,
            sektor: sektor.prosent,
            land: land.prosent,
        };
    });

    const harBransje = finnesBransjeIHistorikken(props.sykefraværshistorikk);
    const linjerMedLabel = getLinjerMedLabel(props.sykefraværshistorikk);

    return (
        <>
            <LegendMedToggles linjerMedLabel={linjerMedLabel} harBransje={harBransje} />
            <GrafVisning
                sykefraværshistorikk={props.sykefraværshistorikk}
                harBransje={harBransje}
                linjerSomSkalVises={linjerMedLabel}
            />
        </>
    );
};

export default Graf;
