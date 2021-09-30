import * as React from 'react';
import { FunctionComponent } from 'react';
import kalkisSvg from './kalkis.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import PanelBase from 'nav-frontend-paneler';
import './KalkulatorPanel.less';
import { PATH_KALKULATOR } from '../../konstanter';
import { Link, useLocation } from 'react-router-dom';
import { useSendEvent } from '../../amplitude/events';
import classNames from 'classnames';
import { PaneltittelMedIkon } from '../../felleskomponenter/PaneltittelMedIkon/PaneltittelMedIkon';

const KalkulatorPanel: FunctionComponent<{ liten?: boolean }> = ({ liten }) => {
    const location = useLocation();
    const sendEvent = useSendEvent();

    return (
        <PanelBase className={classNames('kalkulatorpanel', liten && 'kalkulatorpanel--liten')}>
            <PaneltittelMedIkon src={kalkisSvg} alt="Kalkulatorikon">
                Hvor mye koster sykefraværet?
            </PaneltittelMedIkon>
            <Normaltekst className="kalkulatorpanel__ingress">
                Her kan du beregne hvor mye sykefraværet koster, og hvor mye du kan spare.
            </Normaltekst>
            <Link
                to={{
                    pathname: PATH_KALKULATOR,
                    search: location.search,
                }}
                className="kalkulatorpanel__lenke"
                onClick={() => sendEvent('forside kalkulator', 'klikk')}
            >
                Gå til kostnadskalkulatoren
            </Link>
        </PanelBase>
    );
};
export default KalkulatorPanel;
