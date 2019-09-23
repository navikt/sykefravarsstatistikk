import * as React from 'react';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import PanelBase from 'nav-frontend-paneler';
import './IAwebpanel.less';
import illustrasjon from './sort.svg';

const IAwebpanel: React.FunctionComponent = () => {
    return (
        <PanelBase className="iawebpanel">
            <img src={illustrasjon} alt="" />
            <div className="iawebpanel__tekst-wrapper">
                <div className="iawebpanel__overskrift">
                    <Systemtittel className="iawebpanel__overskrift" tag="h2">
                        Se mer statistikk i IA-web
                    </Systemtittel>
                    <Normaltekst>
                        I IA-web kan du se flere detaljer om sykefraværet til virksomheten
                    </Normaltekst>
                </div>
                <a
                    href="https://www.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=2&ServiceCode=3403&Oselect=true&M=SP"
                    className="lenke"
                >
                    Gå til IA-web
                </a>
            </div>
        </PanelBase>
    );
};

export default IAwebpanel;
