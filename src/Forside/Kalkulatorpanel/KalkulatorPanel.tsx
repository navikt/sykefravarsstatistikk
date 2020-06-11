import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as KalkisIkon } from './kalkis.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendMetrikker } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './KalkulatorPanel.less';
import { PATH_KALKULATOR } from '../../App';
import { Link, useLocation } from 'react-router-dom';
import { sendEvent } from '../../utils/amplitude';

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
                    sendMetrikker('sykefravarsstatistikk.klikk-til-kalkulator');
                    sendEvent('forside kalkulator-klikk', '');
                    sendEvent('forside noe-klikket-pa', '');
                }}
            >
                Gå til kostnadskalkulatoren
            </Link>
        </PanelBase>
    );
};
export default KalkulatorPanel;
