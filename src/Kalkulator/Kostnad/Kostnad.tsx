import React, { FunctionComponent } from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as SedlerIkon } from '../sedlerIkon.svg';
import './Kostnad.less';
import classNames from 'classnames';
import { Kalkulatorvariant } from '../kalkulator-utils';
import { sendInputfeltUtfyltEvent } from '../../amplitude/events';

interface Props {
    nåværendeKostnad: number;
    ønsketKostnad: number;
    ønsketRedusert: number;
    antallTapteDagsverkEllerProsent?: Kalkulatorvariant;
}

const regnUtKostnad = (props: Props) => {
    return props.nåværendeKostnad - props.ønsketKostnad;
};

let utregnetKostnadHarBlittEndret = false;
let endringIUtregnetKostnadHarBlittLogget = false;

const regnUtKostnadOgSendEventHvisTalletErEndret = (props: Props) => {
    // Endring i utregnet kostnad impliserer at brukeren har endret noe i minst ett av inputfeltene.
    if (utregnetKostnadHarBlittEndret && !endringIUtregnetKostnadHarBlittLogget) {
        sendInputfeltUtfyltEvent(window.location.href, 'any');
        endringIUtregnetKostnadHarBlittLogget = true;
        console.log('indre hei');
    }
    console.log('Hei');
    utregnetKostnadHarBlittEndret = true;
    return somKroneverdi(regnUtKostnad(props));
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
                    {regnUtKostnad(props) >= 0
                        ? redusertKostnadTekst
                        : øktKostnadTekst}
                </Element>
                <Element
                    className={
                        regnUtKostnad(props) >= 0
                            ? 'kostnad__sisteresultat'
                            : 'kostnad__sisteresultat_minus'
                    }
                >
                    {regnUtKostnadOgSendEventHvisTalletErEndret(props)}
                </Element>
            </div>
        </div>
    );
};

const somKroneverdi = (tall: number): string => {
    return tall.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + ' kr';
};

export default Kostnad;
