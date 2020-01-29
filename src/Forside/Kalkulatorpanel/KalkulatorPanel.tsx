import * as React from 'react';
import { FunctionComponent } from 'react';
import KalkisIkon from './kalkis.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendEvent } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './KalkulatorPanel.less';
import Lenke from 'nav-frontend-lenker';

const KalkulatorPanel: FunctionComponent = () => (
    <PanelBase className="kalkulatorpanel">
        <div className="kalkulatorpanel__tekst-wrapper">
            <div className="kalkulatorpanel__overskrift">
                <Systemtittel className="kalkulatorpanel__overskrift kalkulatorpanel__ikon-tittel" tag="h2">
                    <img src={KalkisIkon} alt="" className="kalkulatorpanel__illustrasjon" />
                    Så mye koster sykefraværet
                </Systemtittel>
                <Normaltekst>
                    Se hva sykefraværet koster, og hvor mye virksomheten deres kan spare.
                </Normaltekst>
            </div>
            <Lenke
                href="/Kalkulator"
                onClick={() => sendEvent('sykefravarsstatistikk.klikk-til-kalkulator')}
            >
                Gå til kostnadskalkulatoren
            </Lenke>
        </div>
    </PanelBase>
);
export default KalkulatorPanel;
