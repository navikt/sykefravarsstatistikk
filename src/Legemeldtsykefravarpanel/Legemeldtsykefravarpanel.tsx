import React, { FunctionComponent, useContext } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Legemeldtsykefravarpanel.less';
import {Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import {SammenligningContext, Sammenligning} from '../SammenligningProvider';

const Legemeldtsykefravarpanel: FunctionComponent = () => {
    const sammenligning: Sammenligning = useContext(SammenligningContext);
    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                <Systemtittel>Legemeldt sykefravær i {sammenligning.kvartal}. kvartal {sammenligning.år}</Systemtittel>
                <Normaltekst>{sammenligning.land.prosent}% {sammenligning.land.label}</Normaltekst>
            </div>
        </PanelBase>
    );
};

export default Legemeldtsykefravarpanel;
