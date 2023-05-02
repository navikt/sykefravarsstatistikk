import React, { FunctionComponent } from 'react';
import { CheckboxGruppe } from 'nav-frontend-skjema';
import { LegendCheckbox } from './LegendChechbox/LegendCheckbox';
import './LegendMedToggles.less';
import {
    BransjeEllerNæringLabel,
    HistorikkLabel,
    HistorikkLabels,
} from '../../../utils/sykefraværshistorikk-utils';

interface Props {
    labels: HistorikkLabels;
    bransjeEllerNæringLabel: BransjeEllerNæringLabel;
    linjerSomKanVises: HistorikkLabel[];
    linjerSomSkalVises: HistorikkLabel[];
    setLinjerSomSkalVises: (linjer: HistorikkLabel[]) => void;
}

export const LegendMedToggles: FunctionComponent<Props> = ({
    labels,
    bransjeEllerNæringLabel,
    linjerSomKanVises,
    linjerSomSkalVises,
    setLinjerSomSkalVises,
}) => {
    const onChange = (event: any) => {
        const linje = event.target.value;
        if (linjerSomSkalVises.includes(linje)) {
            setLinjerSomSkalVises(linjerSomSkalVises.filter((enLinje) => enLinje !== linje));
        } else {
            setLinjerSomSkalVises([...linjerSomSkalVises, linje]);
        }
    };

    const checkboxProps = {
        linjerSomSkalVises,
        labels,
        onChange,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prefikser: { [linje in HistorikkLabel]: string } = {
        virksomhet: 'Virksomhet:',
        overordnetEnhet: 'Overordnet enhet:',
        næringEllerBransje: bransjeEllerNæringLabel + ':',
        sektor: 'Sektor:',
        land: '',
    };

    return (
        <div className="legend-med-toggles">
            <CheckboxGruppe>
                {linjerSomKanVises.map((linje) => (
                    <LegendCheckbox
                        key={linje}
                        {...checkboxProps}
                        linje={linje}
                        prefiks={prefikser[linje]}
                    />
                ))}
            </CheckboxGruppe>
        </div>
    );
};
