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

const Kostnad: FunctionComponent<Props> = ({
    nåværendeKostnad,
    ønsketKostnad,
    ønsketRedusert,
    antallTapteDagsverkEllerProsent,
}) => (
    <div className="kostnad">
        <Systemtittel tag="h2" className="kostnad__tittel">
            Resultat <SedlerIkon className="kostnad__ikon" />
        </Systemtittel>
        <div className="kostnad__tekst">
            <Element>Totale kostnader per år med nåværende sykefravær</Element>
            <Element>{formaterTall(nåværendeKostnad)}&nbsp;kr</Element>
        </div>
        <div className={classNames('kostnad__tekst', 'kostnad__sisterad')}>
            <Element>Totale kostnader per år med ønsket sykefravær </Element>
            <Element>{formaterTall(ønsketKostnad)}&nbsp;kr</Element>
        </div>

        <div className={classNames('kostnad__tekst', 'kostnad__resultatrad')}>
            <Element>
                {nåværendeKostnad - ønsketKostnad >= 0
                    ? 'Reduserer sykefraværet til ' +
                      (ønsketRedusert !== undefined ? ønsketRedusert.toFixed(2) : 0) +
                      (antallTapteDagsverkEllerProsent ===
                      AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                          ? ' %'
                          : ' dagsverk') +
                      ' øker bunnlinjen årlig med'
                    : 'Økes sykefraværet til ' +
                      (ønsketRedusert !== undefined ? ønsketRedusert.toFixed(2) : 0) +
                      (antallTapteDagsverkEllerProsent ===
                      AntallTapteDagsverkEllerProsent.SYKEFRAVÆRSPROSENT
                          ? ' %'
                          : ' dagsverk') +
                      ' taper dere ytterligere'}
            </Element>

            <Element
                className={
                    nåværendeKostnad - ønsketKostnad >= 0
                        ? 'kostnad__sisteresultat'
                        : 'kostnad__sisteresultat_minus'
                }
            >
                {formaterTall(nåværendeKostnad - ønsketKostnad)}&nbsp;kr
            </Element>
        </div>
    </div>
);

const formaterTall = (tall: number): string => {
    return tall.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

export default Kostnad;
