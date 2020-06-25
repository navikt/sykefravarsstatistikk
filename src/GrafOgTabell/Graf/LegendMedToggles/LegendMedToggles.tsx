import React, { FunctionComponent } from 'react';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { Linje, LinjerMedLabel } from '../graf-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { GrafSymbol } from '../GrafSymbol';

interface Props {
    linjerMedLabel: LinjerMedLabel;
    harBransje: boolean;
    setLinjerSomSkalVises: (linjer: Linje[]) => void;
    linjerSomSkalVises: Linje[];
}

export const LegendMedToggles: FunctionComponent<Props> = ({
    linjerMedLabel,
    harBransje,
    setLinjerSomSkalVises,
    linjerSomSkalVises,
}) => {
    const onChange = (e: any) => {
        const linje = e.target.value;
        if (linjerSomSkalVises.includes(linje)) {
            setLinjerSomSkalVises(linjerSomSkalVises.filter((enLinje) => enLinje !== linje));
        } else {
            setLinjerSomSkalVises([...linjerSomSkalVises, linje]);
        }
    };
    return (
        <CheckboxGruppe>
            <Checkbox
                checked={linjerSomSkalVises.includes('virksomhet')}
                value="virksomhet"
                onChange={onChange}
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
