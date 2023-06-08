import React, { FunctionComponent, useState } from 'react';

import './Graf.less';
import { getLinjerSomHarData } from './graf-utils';
import { LegendMedToggles } from './LegendMedToggles/LegendMedToggles';
import GrafVisning from './GrafVisning';
import { listFilterBuilder } from '../../utils/app-utils';
import {
    HistorikkLabel,
    HistorikkLabels,
    KvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';

interface Props {
    kvartalsvisSammenligning: KvartalsvisSammenligning[];
    historikkLabels: HistorikkLabels;
}

const defaultLinjer: readonly HistorikkLabel[] = [
    'virksomhet',
    'overordnetEnhet',
    'næringEllerBransje',
] as const;

const Graf: FunctionComponent<Props> = (props) => {
    const linjerSomKanVises = getLinjerSomHarData(props.kvartalsvisSammenligning);
    const linjeFilter = listFilterBuilder(linjerSomKanVises);
    const [linjerSomSkalVises, setLinjerSomSkalVises] = useState<HistorikkLabel[]>(
        defaultLinjer.filter(linjeFilter)
    );

    return (
        <>
            <LegendMedToggles
                labels={props.historikkLabels}
                linjerSomKanVises={linjerSomKanVises}
                linjerSomSkalVises={linjerSomSkalVises}
                setLinjerSomSkalVises={setLinjerSomSkalVises}
            />
            <GrafVisning
                kvartalsvisSammenligning={props.kvartalsvisSammenligning}
                linjerSomSkalVises={linjerSomSkalVises}
            />
        </>
    );
};

export default Graf;
