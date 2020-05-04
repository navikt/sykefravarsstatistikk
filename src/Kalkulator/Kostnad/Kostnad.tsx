import React, { FunctionComponent } from 'react';
import { Element, Ingress, Sidetittel, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { ReactComponent as SedlerIkon } from '../sedlerIkon.svg';
import './Kostnad.less';

interface Props {
    nåværendeKostnad: number;
    ønsketKostnad: number;
    ønsketRedusert: number;
}

const Kostnad: FunctionComponent<Props> = ({ nåværendeKostnad, ønsketKostnad, ønsketRedusert }) => (
    <div className="kostnad">
        <Systemtittel tag="h2" className="kostnad__tittel">
            Resultat <SedlerIkon className="kostnad__ikon" />
        </Systemtittel>
        <div className="kostnad__tekst">
            <Element>Totale kosnader per år med nåværende sykefravær</Element>
            <Element>{formaterTall(nåværendeKostnad)}&nbsp;kr</Element>
        </div>
        <div className="kostnad__tekst">
            <Element>Totale kosnader per år med ønsket sykefravær </Element>
            <Element>{formaterTall(ønsketKostnad)}&nbsp;kr</Element>
        </div>

        <div className="kostnad__tekst">
            <Element>
                {'Reduserers sykefraværet til ' +
                    ønsketRedusert +
                    ' dagsverk øker bunnlinjen årlig med'}
            </Element>
            <Element>{formaterTall(nåværendeKostnad - ønsketKostnad)}&nbsp;kr</Element>
        </div>
    </div>
);

const formaterTall = (tall: number): string => {
    return tall.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

export default Kostnad;
