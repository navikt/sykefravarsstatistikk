import React, { FunctionComponent, useState } from 'react';

import './Graf.less';
import 'nav-frontend-tabell-style';
import { Sykefraværshistorikk } from '../../api/sykefraværshistorikk';
import {
    finnesBransjeIHistorikken,
    getLinjeneSomFinnesIHistorikkenMedLabels,
    Linje,
    LinjerMedLabel,
} from './graf-utils';
import { konverterTilKvartalsvisSammenligning } from '../../utils/sykefraværshistorikk-utils';
import { LegendMedToggles } from './LegendMedToggles/LegendMedToggles';
import GrafVisning from './GrafVisning';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const Graf: FunctionComponent<Props> = (props) => {
    const linjerSomKanVises = getLinjeneSomFinnesIHistorikkenMedLabels(props.sykefraværshistorikk);
    const [linjerSomSkalVises, setLinjerSomSkalVisesMedLabel] = useState<LinjerMedLabel>(
        linjerSomKanVises
    );
    const setLinjerSomSkalVises = (linjer: Linje[]) => {
        const alleLinjer = Object.keys(linjerSomKanVises);
        const nyeLinjer = { ...linjerSomKanVises };
        alleLinjer.forEach((linje) => {
            if (!linjer.includes(linje)) {
                delete nyeLinjer[linje];
            }
        });
        setLinjerSomSkalVisesMedLabel(nyeLinjer);
    };

    const harBransje = finnesBransjeIHistorikken(props.sykefraværshistorikk);

    return (
        <>
            <LegendMedToggles
                linjerMedLabel={linjerSomKanVises}
                linjerSomSkalVises={Object.keys(linjerSomSkalVises)}
                harBransje={harBransje}
                setLinjerSomSkalVises={setLinjerSomSkalVises}
            />
            <GrafVisning
                sykefraværshistorikk={props.sykefraværshistorikk}
                harBransje={harBransje}
                linjerSomSkalVises={linjerSomSkalVises}
            />
        </>
    );
};

export default Graf;
