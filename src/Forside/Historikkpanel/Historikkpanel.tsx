import React, { FunctionComponent } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { ReactComponent as GrafIkon } from './graf.svg';
import { PATH_HISTORIKK } from '../../App';
import InternLenke from '../../felleskomponenter/InternLenke/InternLenke';
import './Historikkpanel.less';
import { useSendEvent } from '../../amplitude/amplitude';

const Historikkpanel: FunctionComponent = () => {
    const sendEvent = useSendEvent();

    return (
        <PanelBase className="historikkpanel">
            <Systemtittel className="historikkpanel__overskrift" tag="h2">
                <GrafIkon className="historikkpanel__illustrasjon" />
                Sykefraværshistorikk
            </Systemtittel>
            <Normaltekst className="historikkpanel__ingress">
                Se hvordan det legemeldte sykefraværet har endret seg de siste årene og se
                statistikken kvartalsvis.
            </Normaltekst>
            <InternLenke
                pathname={PATH_HISTORIKK}
                onClick={() => sendEvent('forside historikk', 'klikk')}
            >
                Gå til sykefravær over tid
            </InternLenke>
        </PanelBase>
    );
};

export default Historikkpanel;
