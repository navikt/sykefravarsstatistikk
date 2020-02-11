import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as KalkisIkon } from '../Kalkulatorpanel/kalkis.svg';
import { PATH_HISTORIKK } from '../../App';
import { sendEvent } from '../../utils/metrikk-api';
import InternLenke from '../../felleskomponenter/InternLenke/InternLenke';
import './Historikkpanel.less';

const Historikkpanel: FunctionComponent = () => {
    return (
        <PanelBase className="historikkpanel">
            <Systemtittel className="historikkpanel__overskrift" tag="h2">
                <KalkisIkon className="historikkpanel__illustrasjon" />
                Sykefraværshistorikk
            </Systemtittel>
            <Normaltekst className="historikkpanel__ingress">
                Se hvordan det legemeldte sykefraværet har endret seg de siste årene.
            </Normaltekst>
            <InternLenke
                pathname={PATH_HISTORIKK}
                onClick={() => sendEvent('sykefravarsstatistikk.klikk-til-historikk')}
            >
                Gå til sykefraværsstatistikken
            </InternLenke>
        </PanelBase>
    );
};

export default Historikkpanel;
