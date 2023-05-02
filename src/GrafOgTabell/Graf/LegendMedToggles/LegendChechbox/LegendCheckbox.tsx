import React, { FunctionComponent } from 'react';
import { GrafSymbol } from '../../GrafSymbol/GrafSymbol';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';
import './LegendChechbox.less';
import { HistorikkLabel, HistorikkLabels } from '../../../../utils/sykefraværshistorikk-utils';

interface Props {
    linje: HistorikkLabel;
    prefiks?: string;
    linjerSomSkalVises: HistorikkLabel[];
    onChange: (event: any) => void;
    labels: HistorikkLabels;
}

export const LegendCheckbox: FunctionComponent<Props> = ({
    linje,
    prefiks,
    linjerSomSkalVises,
    onChange,
    labels,
}) => (
    <Checkbox
        checked={linjerSomSkalVises.includes(linje)}
        value={linje}
        onChange={onChange}
        label={
            <div className="legend-checkbox">
                <GrafSymbol linje={linje} className="legend-checkbox__symbol" />
                {prefiks && (
                    <Element tag="span" className="legend-checkbox__prefiks">
                        {prefiks}
                    </Element>
                )}
                <Normaltekst tag="span">{labels[linje]}</Normaltekst>
            </div>
        }
    />
);
