import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as KalkisIkon } from './kalkis.svg';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { sendMetrikker } from '../../utils/metrikk-api';
import PanelBase from 'nav-frontend-paneler';
import './KalkulatorPanel.less';
import { PATH_KALKULATOR } from '../../App';
import { Link, useLocation } from 'react-router-dom';
import { useSendEvent } from '../../amplitude/amplitude';

const KalkulatorPanel: FunctionComponent = () => {
    const location = useLocation();
    const sendEvent = useSendEvent();

    return (
        <PanelBase className="kalkulatorpanel">
            <Systemtittel className="kalkulatorpanel__overskrift" tag="h2">
                <KalkisIkon className="kalkulatorpanel__illustrasjon" />
                Hvor mye koster sykefraværet?
            </Systemtittel>
            <Normaltekst className="kalkulatorpanel__ingress">
                Her kan du beregne hvor mye sykefraværet koster, og hvor mye du kan spare.
            </Normaltekst>
            <Link
                to={{
                    pathname: PATH_KALKULATOR,
                    search: location.search,
                }}
                className="kalkulatorpanel__lenke"
                onClick={() => {
                    sendMetrikker('sykefravarsstatistikk.klikk-til-kalkulator');
                    sendEvent('forside kalkulator', 'klikk');
                }}
            >
                Gå til kostnadskalkulatoren
            </Link>
        </PanelBase>
    );
};
export default KalkulatorPanel;
