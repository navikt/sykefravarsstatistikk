import React, { FunctionComponent } from 'react';

import './Graf.less';
import 'nav-frontend-tabell-style';
import { Sykefraværshistorikk } from '../../api/sykefraværshistorikk';
import { finnesBransjeIHistorikken, getLinjerMedLabel } from './graf-utils';
import { konverterTilKvartalsvisSammenligning } from '../../utils/sykefraværshistorikk-utils';
import { LegendMedToggles } from './LegendMedToggles/LegendMedToggles';
import GrafVisning from './GrafVisning';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const Graf: FunctionComponent<Props> = (props) => {
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
