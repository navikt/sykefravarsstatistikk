import React, { FunctionComponent } from 'react';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { getFarge, getSymbol, LinjerMedLabel } from '../graf-utils';
import SymbolSvg from '../SymbolSvg';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { GrafSymbol } from '../GrafSymbol';

interface Props {
    linjerMedLabel: LinjerMedLabel;
    harBransje: boolean;
}

export const LegendMedToggles: FunctionComponent<Props> = ({ linjerMedLabel, harBransje }) => {
    const labels = {
        virksomhet: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">Virksomhet:</Element>
                <Normaltekst>{linjerMedLabel.virksomhet}</Normaltekst>
            </div>
        ),
        overordnetEnhet: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">Overordnet enhet:</Element>
                <Normaltekst>{linjerMedLabel.overordnetEnhet}</Normaltekst>
            </div>
        ),
        næringEllerBransje: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">
                    {harBransje ? 'Bransje:' : 'Næring:'}
                </Element>
                <Normaltekst>{linjerMedLabel.næringEllerBransje}</Normaltekst>
            </div>
        ),
        sektor: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">Sektor:</Element>
                <Normaltekst>{linjerMedLabel.sektor}</Normaltekst>
            </div>
        ),
        land: (
            <div className="graf-legend__tekst">
                <Element>Norge</Element>
            </div>
        ),
    };

    return (
        <CheckboxGruppe>
            <Checkbox
                label={
                    <div className="graf-legend__tekst">
                        <GrafSymbol linje="virksomhet" />
                        <Element tag="span" className="graf-legend__tekst-element">
                            Virksomhet:
                        </Element>{' '}
                        <Normaltekst tag="span">{linjerMedLabel.virksomhet}</Normaltekst>
                    </div>
                }
            />
            <Checkbox
                label={
                    <div className="graf-legend__tekst">
                        <GrafSymbol linje="overordnetEnhet" />
                        <Element tag="span" className="graf-legend__tekst-element">
                            Overordnet enhet:
                        </Element>{' '}
                        <Normaltekst tag="span">{linjerMedLabel.overordnetEnhet}</Normaltekst>
                    </div>
                }
            />
            <Checkbox
                label={
                    <div className="graf-legend__tekst">
                        <GrafSymbol linje="næringEllerBransje" />
                        <Element tag="span" className="graf-legend__tekst-element">
                            {harBransje ? 'Bransje:' : 'Næring:'}
                        </Element>{' '}
                        <Normaltekst tag="span">{linjerMedLabel.næringEllerBransje}</Normaltekst>
                    </div>
                }
            />
            <Checkbox
                label={
                    <div className="graf-legend__tekst">
                        <GrafSymbol linje="sektor" />
                        <Element tag="span" className="graf-legend__tekst-element">
                            Sektor:
                        </Element>{' '}
                        <Normaltekst tag="span">{linjerMedLabel.sektor}</Normaltekst>
                    </div>
                }
            />
            <Checkbox
                label={
                    <div className="graf-legend__tekst">
                        <GrafSymbol linje="land" />
                        <Element tag="span">{linjerMedLabel.land}</Element>
                    </div>
                }
            />
        </CheckboxGruppe>
    );
};
