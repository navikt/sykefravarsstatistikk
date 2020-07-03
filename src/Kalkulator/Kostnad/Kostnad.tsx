import React, { FunctionComponent } from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as SedlerIkon } from '../sedlerIkon.svg';
import './Kostnad.less';
import classNames from 'classnames';
import { Kalkulatorvariant } from '../kalkulator-utils';

interface Props {
    nåværendeKostnad: number;
    ønsketKostnad: number;
    ønsketRedusert: number;
    antallTapteDagsverkEllerProsent?: Kalkulatorvariant;
}

const Kostnad: FunctionComponent<Props> = (props) => {
    const redusertKostnadTekst = `Reduserer dere sykefraværet til  
        ${
            props.ønsketRedusert !== undefined && !isNaN(props.ønsketRedusert)
                ? props.antallTapteDagsverkEllerProsent ===
                  Kalkulatorvariant.Prosent
                    ? props.ønsketRedusert.toFixed(1).replace('.', ',')
                    : props.ønsketRedusert.toFixed(0)
                : 0
        } 
        ${
            props.antallTapteDagsverkEllerProsent ===
            Kalkulatorvariant.Prosent
                ? ' %'
                : ' dagsverk'
        } 
         sparer dere årlig`;
    const øktKostnadTekst = `Øker dere sykefraværet til 
        ${
            props.ønsketRedusert !== undefined && !isNaN(props.ønsketRedusert)
                ? props.antallTapteDagsverkEllerProsent ===
                  Kalkulatorvariant.Prosent
                    ? props.ønsketRedusert.toFixed(1).replace('.', ',')
                    : props.ønsketRedusert.toFixed(0)
                : 0
        } 
        ${
            props.antallTapteDagsverkEllerProsent ===
            Kalkulatorvariant.Prosent
                ? ' %'
                : ' dagsverk'
        } 
         taper dere ytterligere årlig`;
    return (
        <div className="kostnad">
            <Systemtittel tag="h2" className="kostnad__tittel">
                Resultat <SedlerIkon className="kostnad__ikon" />
            </Systemtittel>
            <div className="kostnad__tekst">
                <Element>Totale kostnader per år med nåværende sykefravær</Element>
                <Element>{formaterTall(props.nåværendeKostnad)}&nbsp;kr</Element>
            </div>
            <div className={classNames('kostnad__tekst', 'kostnad__sisterad')}>
                <Element>Totale kostnader per år med ønsket sykefravær </Element>
                <Element>{formaterTall(props.ønsketKostnad)}&nbsp;kr</Element>
            </div>

            <div className={classNames('kostnad__tekst', 'kostnad__resultatrad')}>
                <Element>
                    {props.nåværendeKostnad - props.ønsketKostnad >= 0
                        ? redusertKostnadTekst
                        : øktKostnadTekst}
                </Element>
                <Element
                    className={
                        props.nåværendeKostnad - props.ønsketKostnad >= 0
                            ? 'kostnad__sisteresultat'
                            : 'kostnad__sisteresultat_minus'
                    }
                >
                    {formaterTall(props.nåværendeKostnad - props.ønsketKostnad)}&nbsp;kr
                </Element>
            </div>
        </div>
    );
};

const formaterTall = (tall: number): string => {
    return tall.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

export default Kostnad;
