import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as KalkisIkon } from './kalkis.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendEvent } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './KalkulatorPanel.less';
import { PATH_KALKULATOR } from '../../App';
import { Link, useLocation } from 'react-router-dom';
import amplitude from '../../utils/amplitude';

const KalkulatorPanel: FunctionComponent = () => {
    const location = useLocation();

    return (
        <PanelBase className="kalkulatorpanel">
            <Systemtittel className="kalkulatorpanel__overskrift" tag="h2">
                <KalkisIkon className="kalkulatorpanel__illustrasjon" />
                Så mye koster sykefraværet
            </Systemtittel>
            <Normaltekst className="kalkulatorpanel__ingress">
                Se hva sykefraværet koster, og hvor mye virksomheten deres kan spare.
            </Normaltekst>
            <Link
                to={{
                    pathname: PATH_KALKULATOR,
                    search: location.search,
                }}
                className="kalkulatorpanel__lenke"
                onClick={() => {
                    sendEvent('sykefravarsstatistikk.klikk-til-kalkulator');
                    amplitude.logEvent('#sykefravarsstatistikk-forside kalkulator-klikk');
                }}
            >
                Gå til kostnadskalkulatoren
            </Link>
        </PanelBase>
    );
};
export default KalkulatorPanel;
