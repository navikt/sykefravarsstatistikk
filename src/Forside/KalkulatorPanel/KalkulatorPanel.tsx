import * as React  from 'react';
import { FunctionComponent } from 'react';
import illustrasjon from '../IAwebpanel/sort.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendEvent } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './KalkulatorPanel.less';

const KalkulatorPanel: FunctionComponent =()=>(
    <PanelBase className="kalkulatorpanel">
        <img src={illustrasjon} alt="" className="kalkulatorpanel__illustrasjon" />
        <div className="kalkulatorpanel__tekst-wrapper">
            <div className="kalkulatorpanel__overskrift">
                <Systemtittel className="kalkulatorpanel__overskrift" tag="h2">
                    Se mer i Sykefraværsstatistikk for virksomheter (IA-web)
                </Systemtittel>
                <Normaltekst>
                    Her kan du se flere detaljer om virksomhetens sykefravær, kostnadskalkulator
                    og tjenester som er mottatt fra NAV Arbeidslivssenter.
                </Normaltekst>
            </div>
            <a
                href="/Kalkulator"
                className="lenke"
                onClick={() => sendEvent('sykefravarsstatistikk.klikk-til-iaweb')}
            >
                Gå til IA-web
            </a>
        </div>
    </PanelBase>
);
export default  KalkulatorPanel;
