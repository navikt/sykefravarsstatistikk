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

let utregnetKostnadHarBlittEndret = false;
let utregnetKostnadEndringHarBlittLogget = false;

const regnUtKostnad = (nåværendeKostnad: number, ønsketKostnad: number) => {
    if (utregnetKostnadHarBlittEndret && !utregnetKostnadEndringHarBlittLogget) {
        // send event her
        console.log('Sender endringsevent');
        utregnetKostnadEndringHarBlittLogget = true;
    }
    utregnetKostnadHarBlittEndret = true;
    return somKroneverdi(nåværendeKostnad - ønsketKostnad);
};

const Kostnad: FunctionComponent<Props> = (props) => {
    const sykefraværMål =
        props.ønsketRedusert !== undefined && !isNaN(props.ønsketRedusert)
            ? props.antallTapteDagsverkEllerProsent === Kalkulatorvariant.Prosent
                ? props.ønsketRedusert.toFixed(1).replace('.', ',')
                : props.ønsketRedusert.toFixed(0)
            : 0;
    const formatertSykefraværMål =
        `${sykefraværMål} ` +
        (props.antallTapteDagsverkEllerProsent === Kalkulatorvariant.Prosent ? '%' : 'dagsverk');

    const redusertKostnadTekst = `Reduserer dere sykefraværet til ${formatertSykefraværMål} sparer dere årlig`;
    const øktKostnadTekst = `Øker dere sykefraværet til ${formatertSykefraværMål} taper dere ytterligere årlig`;

    return (
        <div className='kostnad'>
            <Systemtittel tag='h2' className='kostnad__tittel'>
                Resultat <SedlerIkon className='kostnad__ikon' />
            </Systemtittel>
            <div className='kostnad__tekst'>
                <Element>Totale kostnader per år med nåværende sykefravær</Element>
                <Element>{somKroneverdi(props.nåværendeKostnad)}</Element>
            </div>
            <div className={classNames('kostnad__tekst', 'kostnad__sisterad')}>
                <Element>Totale kostnader per år ved målsatt sykefravær</Element>
                <Element>{somKroneverdi(props.ønsketKostnad)}</Element>
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
                    {regnUtKostnad(props.nåværendeKostnad, props.ønsketKostnad)}
                </Element>
            </div>
        </div>
    );
};

const somKroneverdi = (tall: number): string => {
    return tall.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' kr';
};

export default Kostnad;
