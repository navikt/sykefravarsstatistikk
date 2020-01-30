import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as KalkisIkon } from './kalkis.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendEvent } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './KalkulatorPanel.less';
import Lenke from 'nav-frontend-lenker';

const KalkulatorPanel: FunctionComponent = () => (
    <PanelBase className="kalkulatorpanel">
        <Systemtittel className="kalkulatorpanel__overskrift" tag="h2">
            <KalkisIkon className="kalkulatorpanel__illustrasjon" />
            Så mye koster sykefraværet
        </Systemtittel>
        <Normaltekst className="kalkulatorpanel__ingress">
            Se hva sykefraværet koster, og hvor mye virksomheten deres kan spare.
        </Normaltekst>
        <Lenke
            className="kalkulatorpanel__lenke"
            href="/Kalkulator"
            onClick={() => sendEvent('sykefravarsstatistikk.klikk-til-kalkulator')}
        >
            Gå til kostnadskalkulatoren
        </Lenke>
    </PanelBase>
);
export default KalkulatorPanel;
