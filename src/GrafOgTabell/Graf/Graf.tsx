import React, { FunctionComponent, useEffect, useState } from 'react';

import './Graf.less';
import 'nav-frontend-tabell-style';
import { Sykefraværshistorikk } from '../../api/sykefraværshistorikk';
import {
    finnesBransjeIHistorikken,
    getLabelsForLinjene,
    getLinjerSomHarData,
    Linje,
} from './graf-utils';
import { LegendMedToggles } from './LegendMedToggles/LegendMedToggles';
import GrafVisning from './GrafVisning';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const Graf: FunctionComponent<Props> = (props) => {
    const labelsForLinjer = getLabelsForLinjene(props.sykefraværshistorikk);
    const linjerSomKanVises = getLinjerSomHarData(props.sykefraværshistorikk);
    const [linjerSomSkalVises, setLinjerSomSkalVises] = useState<Linje[]>(
        Object.keys(labelsForLinjer)
    );
    const defaultLinjerSomSkalVises = ['virksomhet', 'overordnetEnhet'];
    const harBransje = finnesBransjeIHistorikken(props.sykefraværshistorikk);

    useEffect(() => {
        setLinjerSomSkalVises(
            linjerSomSkalVises.filter((linje) => defaultLinjerSomSkalVises.includes(linje))
        );
    }, []);

    return (
        <>
            <LegendMedToggles
                labels={labelsForLinjer}
                harBransje={harBransje}
                linjerSomKanVises={linjerSomKanVises}
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
