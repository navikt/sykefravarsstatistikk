import React, { FunctionComponent, useRef } from 'react';
import './SammenligningspanelBarnehage.less';
import { Knapp } from 'nav-frontend-knapper';
import ReactToPrint from 'react-to-print';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { RestSykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import { useSendEvent } from '../../../amplitude/amplitude';
import { Normaltekst } from 'nav-frontend-typografi';

export const SammenligningspanelBarnehage: FunctionComponent<{
    restSykefraværsvarighet: RestSykefraværsvarighet;
}> = (props) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const harFeil = props.restSykefraværsvarighet.status === RestStatus.Feil;
    const sendEvent = useSendEvent();

    return (
        <>
            {harFeil && (
                <AlertStripeFeil className="sammenligningspanel-barnehage__feilmelding">
                    Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv igjen senere.
                </AlertStripeFeil>
            )}
            <div className="sammenligningspanel-barnehage" ref={panelRef}>
                <Normaltekst className="sammenligningspanel-barnehage__href">{window.location.href}</Normaltekst>
                <ReactToPrint
                    onBeforePrint={() => sendEvent('forside barnehage', 'print')}
                    content={() => panelRef.current}
                    trigger={() => (
                        <Knapp className="sammenligningspanel-barnehage__knapp">Skriv ut</Knapp>
                    )}
                />
                {props.children}
            </div>
        </>
    );
};
