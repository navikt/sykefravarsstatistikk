import React, { FunctionComponent, useState } from 'react';

import './Graf.less';
import 'nav-frontend-tabell-style';
import { Sykefraværshistorikk } from '../../api/sykefraværshistorikk';
import {
    finnesBransjeIHistorikken,
    getLinjeneSomFinnesIHistorikkenMedLabels,
    Linje,
    LabelsForLinjer,
} from './graf-utils';
import { LegendMedToggles } from './LegendMedToggles/LegendMedToggles';
import GrafVisning from './GrafVisning';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const Graf: FunctionComponent<Props> = (props) => {
    const linjerSomKanVises = getLinjeneSomFinnesIHistorikkenMedLabels(props.sykefraværshistorikk);
    const [linjerSomSkalVises, setLinjerSomSkalVises] = useState<Linje[]>(
        Object.keys(linjerSomKanVises)
    );

    const harBransje = finnesBransjeIHistorikken(props.sykefraværshistorikk);

    return (
        <>
            <LegendMedToggles
                labels={linjerSomKanVises}
                harBransje={harBransje}
                linjerSomSkalVises={linjerSomSkalVises}
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
