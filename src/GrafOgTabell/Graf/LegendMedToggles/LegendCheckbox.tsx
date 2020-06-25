import React, { FunctionComponent } from 'react';
import { Linje, LinjerMedLabel } from '../graf-utils';
import { GrafSymbol } from '../GrafSymbol';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';

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
            <div className="graf-legend__tekst">
                <GrafSymbol linje={linje} />
                {prefiks && (
                    <>
                        <Element tag="span" className="graf-legend__tekst-element">
                            {prefiks}
                        </Element>{' '}
                    </>
                )}
                <Normaltekst tag="span">{linjerMedLabel[linje]}</Normaltekst>
            </div>
        }
    />
);
