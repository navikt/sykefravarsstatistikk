import React, { FunctionComponent } from 'react';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import './LegendMedToggles.css';
import { HistorikkLabel, HistorikkLabels } from '../../../utils/sykefraværshistorikk-utils';
import { GrafSymbol } from '../GrafSymbol/GrafSymbol';

interface Props {
    labels: HistorikkLabels;
    linjerSomKanVises: HistorikkLabel[];
    linjerSomSkalVises: HistorikkLabel[];
    setLinjerSomSkalVises: (linjer: HistorikkLabel[]) => void;
}

export const LegendMedToggles: FunctionComponent<Props> = ({
    labels,
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

    const prefikser: { [linje in HistorikkLabel]: string } = {
        virksomhet: 'Virksomhet:',
        overordnetEnhet: 'Overordnet enhet:',
        næringEllerBransje: 'Bransje:',
        sektor: 'Sektor:',
        land: '',
    };

    return (
        <CheckboxGroup legend="Velg linjer som skal vises i grafen">
            {linjerSomKanVises.map((linje) => (
                <Checkbox
                    checked={linjerSomSkalVises.includes(linje)}
                    value={linje}
                    onChange={onChange}
                >
                    <div className="legend-med-toggles__symbol_og_tekst_wrapper">
                        <GrafSymbol linje={linje} className="legend-med-toggles__symbol" />
                        {prefikser[linje]} {labels[linje]}
                    </div>
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
};
