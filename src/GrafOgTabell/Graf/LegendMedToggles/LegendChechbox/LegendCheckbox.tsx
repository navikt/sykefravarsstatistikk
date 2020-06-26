import React, { FunctionComponent } from 'react';
import { Linje, LinjerMedLabel } from '../../graf-utils';
import { GrafSymbol } from '../../GrafSymbol';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';
import './LegendChechbox.less';

interface Props {
    linje: Linje;
    prefiks?: string;
    linjerSomSkalVises: Linje[];
    onChange: (e: any) => any; // TODO
    linjerMedLabel: LinjerMedLabel;
}

export const LegendCheckbox: FunctionComponent<Props> = ({
    linje,
    prefiks,
    linjerSomSkalVises,
    onChange,
    linjerMedLabel,
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
                <Normaltekst tag="span">{linjerMedLabel[linje]}</Normaltekst>
            </div>
        }
    />
);
