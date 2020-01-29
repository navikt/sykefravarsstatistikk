import React, { FunctionComponent } from 'react';
import { Element, Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as SedlerIkon } from '../sedlerIkon.svg';
import './Kostnad.less';

interface Props {
    kostnad: number;
}

const Kostnad: FunctionComponent<Props> = ({ kostnad }) => (
    <div className="kostnad">
        <Systemtittel tag="h2" className="kostnad__tittel">
            Kostnad <SedlerIkon className="kostnad__ikon" />
        </Systemtittel>
        <Element className="kostnad__tekst">Kostnad siste 12 mnd</Element>
        <Sidetittel>{formaterTall(kostnad)}&nbsp;kr</Sidetittel>
    </div>
);

const formaterTall = (tall: number): string => {
    return tall.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

export default Kostnad;
