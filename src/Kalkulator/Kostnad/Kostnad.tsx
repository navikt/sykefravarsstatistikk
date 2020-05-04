import React, { FunctionComponent } from 'react';
import { Element, Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as SedlerIkon } from '../sedlerIkon.svg';
import './Kostnad.less';

interface Props {
    nåværendeKostnad: number;
    ønsketKostnad: number;
}

const Kostnad: FunctionComponent<Props> = ({ nåværendeKostnad, ønsketKostnad }) => (
    <div className="kostnad">
        <Systemtittel tag="h2" className="kostnad__tittel">
            Kostnad <SedlerIkon className="kostnad__ikon" />
        </Systemtittel>
        <Element className="kostnad__tekst">
            Totale kosnader per år med nåværende sykefravær
        </Element>
        <Sidetittel>{formaterTall(nåværendeKostnad)}&nbsp;kr</Sidetittel>
        <Element className="kostnad__tekst">Totale kosnader per år med ønsket sykefravær </Element>
        <Sidetittel>{formaterTall(ønsketKostnad)}&nbsp;kr</Sidetittel>
        <Element className="kostnad__tekst">
            Reduserers sykefraværet til 35 dagsverk øker bunnlinjen årlig med
        </Element>
        <Sidetittel>{formaterTall(nåværendeKostnad - ønsketKostnad)}&nbsp;kr</Sidetittel>
    </div>
);

const formaterTall = (tall: number): string => {
    return tall.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

export default Kostnad;
