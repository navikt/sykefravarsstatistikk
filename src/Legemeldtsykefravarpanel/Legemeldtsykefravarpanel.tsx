import * as React from 'react';
import PanelBase from 'nav-frontend-paneler';
import './Legemeldtsykefravarpanel.less'
import {Systemtittel} from "nav-frontend-typografi";
import { Sykefraværprosent } from './../SykefraværprosentProvider';

const Legemeldtsykefravarpanel: React.FunctionComponent<Sykefraværprosent> = (sykefraværprosent) => {

    return (
        <PanelBase className="legemeldtsykefravarpanel">
            <div className="legemeldtsykefravarpanel__tekst-wrapper">
                <Systemtittel>Legemeldt sykefravær i {sykefraværprosent.kvartal}. kvartal</Systemtittel>
            </div>
        </PanelBase>
    );
};

export default Legemeldtsykefravarpanel;
