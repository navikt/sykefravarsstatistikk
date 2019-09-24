import React, { FunctionComponent, useContext } from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Legemeldtsykefravarpanel.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { Sykefraværprosent, SykefraværprosentContext } from './../SykefraværprosentProvider';

const Legemeldtsykefravarpanel: FunctionComponent = () => {
    const sykefraværprosent: Sykefraværprosent = useContext(SykefraværprosentContext);
    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                <Systemtittel>Legemeldt sykefravær i {sykefraværprosent.kvartal}. kvartal</Systemtittel>
            </div>
        </PanelBase>
    );
};

export default Legemeldtsykefravarpanel;
