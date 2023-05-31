import React, { FunctionComponent } from 'react';
import { GrafSymbol } from '../../GrafSymbol/GrafSymbol';
import { Checkbox } from 'nav-frontend-skjema';
import './LegendChechbox.less';
import { HistorikkLabel, HistorikkLabels } from '../../../../utils/sykefraværshistorikk-utils';
import { Label, BodyLong } from "@navikt/ds-react";

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
                    <Label className="legend-checkbox__prefiks" as="span">
                        {prefiks}
                    </Label>
                )}
                <BodyLong as="span">{labels[linje]}</BodyLong>
            </div>
        }
    />
);
