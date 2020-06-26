import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import EksternLenke from '../felleskomponenter/EksternLenke/EksternLenke';

interface Props {
    onChange: (event: any) => void;
    onClick: (event: any) => void;
    value: number | undefined;
}

export const Kalkulatorrad: FunctionComponent<Props> = props => {
    return (
        <div className="kalkulator__rad">
            <Element className="kalkulator__label_fast_størrelse">
                Kostnad per dag per ansatt i kroner
            </Element>
            <Input
                label={''}
                onChange={props.onChange}
                onClick={props.onClick}
                value={props.value || ''}
                bredde={'XS'}
                maxLength={15}
                type="number"
                className="kalkulator__input"
                placeholder="kr"
            />
            <Hjelpetekst>
                <Normaltekst className="kalkulator__hjelpetekst-innhold">
                    Hvor mye taper virksomheten på at noen er sykemeldt en dag? I 2011 beregnet
                    SINTEF og NHO at hver uke med sykefravær koster en arbeidsgiver i snitt 13 000
                    kr. Det vil si 2600 kr per dag.{' '}
                    <EksternLenke href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/">
                        Les mer om hva som påvirker kostnader ved sykefravær.
                    </EksternLenke>
                </Normaltekst>
            </Hjelpetekst>
        </div>
    );
};
