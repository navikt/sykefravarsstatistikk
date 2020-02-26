import * as React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import PanelBase from 'nav-frontend-paneler';
import './IAwebpanel.less';
import illustrasjon from './sort.svg';
import { sendEvent } from '../../utils/metrikk-api';
import amplitude from '../../utils/amplitude';

const IAwebpanel: React.FunctionComponent = () => {
    return (
        <PanelBase className="iawebpanel">
            <img src={illustrasjon} alt="" className="iawebpanel__illustrasjon" />
            <div className="iawebpanel__tekst-wrapper">
                <div className="iawebpanel__overskrift">
                    <Systemtittel className="iawebpanel__overskrift" tag="h2">
                        Se mer i Sykefraværsstatistikk for virksomheter (IA-web)
                    </Systemtittel>
                    <Normaltekst>
                        Her kan du se flere detaljer om virksomhetens sykefravær, kostnadskalkulator
                        og tjenester som er mottatt fra NAV Arbeidslivssenter.
                    </Normaltekst>
                </div>
                <a
                    href="https://www.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=2&ServiceCode=3403&Oselect=true&M=SP"
                    className="iawebpanel__lenke"
                    onClick={() => {
                        sendEvent('sykefravarsstatistikk.klikk-til-iaweb');
                        amplitude.logEvent('#sykefravarsstatistikk-forside iaweb-klikk');
                    }}
                >
                    Gå til IA-web
                </a>
            </div>
        </PanelBase>
    );
};

export default IAwebpanel;
