import React, { FunctionComponent } from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as SedlerIkon } from '../sedlerIkon.svg';
import './Kostnad.less';
import classNames from 'classnames';
import { AntallTapteDagsverkEllerProsent } from '../kalkulator-utils';

interface Props {
    nåværendeKostnad: number;
    ønsketKostnad: number;
    ønsketRedusert: number;
    antallTapteDagsverkEllerProsent?: AntallTapteDagsverkEllerProsent;
}

const Kostnad: FunctionComponent<Props> = props => {
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
                        ? 'Reduserer sykefraværet til ' +
                          (props.ønsketRedusert !== undefined
                              ? props.ønsketRedusert.toFixed(2)
                              : 0) +
                          (props.antallTapteDagsverkEllerProsent ===
                          AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                              ? ' %'
                              : ' dagsverk') +
                          ' øker bunnlinjen årlig med'
                        : 'Økes sykefraværet til ' +
                          (props.ønsketRedusert !== undefined
                              ? props.ønsketRedusert.toFixed(2)
                              : 0) +
                          (props.antallTapteDagsverkEllerProsent ===
                          AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                              ? ' %'
                              : ' dagsverk') +
                          ' taper dere ytterligere'}
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
