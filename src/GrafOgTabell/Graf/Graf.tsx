import React, { FunctionComponent, useState } from 'react';

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
        ['virksomhet', 'overordnetEnhet', 'næringEllerBransje'].filter((linje) =>
            linjerSomKanVises.includes(linje)
        )
    );
    const harBransje = finnesBransjeIHistorikken(props.sykefraværshistorikk);

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
