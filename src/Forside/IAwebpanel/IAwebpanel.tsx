import * as React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import PanelBase from 'nav-frontend-paneler';
import './IAwebpanel.less';
import illustrasjon from './sort.svg';
import { sendEvent } from '../../utils/metrikk-api';
import amplitude from '../../utils/amplitude';
import { ReactComponent as VarselIkon } from './varselIkon.svg';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';

const IAwebpanel: React.FunctionComponent = () => {
    return (
        <PanelBase className="iawebpanel">
            <img src={illustrasjon} alt="" className="iawebpanel__illustrasjon" />
            <div className="iawebpanel__tekst-wrapper">
                <div className="iawebpanel__overskrift">
                    <div className="iawebpanel__overskrift__header">
                        <VarselIkon className="iawebpanel__overskrift__ikon" />
                        <Systemtittel className="iawebpanel__overskrift" tag="h2">
                            IA-web blir fjernet 5. juni 2020{' '}
                        </Systemtittel>
                    </div>
                    <Normaltekst>
                        Her kan du se flere detaljer om virksomhetens sykefravær, kostnadskalkulator
                        og tjenester som er mottatt fra NAV Arbeidslivssenter.
                    </Normaltekst>
                </div>
                <EksternLenke
                    href="https://www.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=2&ServiceCode=3403&Oselect=true&M=SP"
                    className="iawebpanel__lenke"
                    onClick={() => {
                        sendEvent('sykefravarsstatistikk.klikk-til-iaweb');
                        amplitude.logEvent('#sykefravarsstatistikk-forside iaweb-klikk');
                        amplitude.logEvent('#sykefravarsstatistikk-forside noe-klikket-pa');
                    }}
                >
                    Gå til IA-web
                </EksternLenke>
            </div>
        </PanelBase>
    );
};

export default IAwebpanel;
