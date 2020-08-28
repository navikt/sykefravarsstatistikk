import React, { FunctionComponent, useRef } from 'react';
import './SammenligningspanelBarnehage.less';
import { Knapp } from 'nav-frontend-knapper';
import ReactToPrint from 'react-to-print';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { RestSykefraværsvarighet } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';

export const SammenligningspanelBarnehage: FunctionComponent<{
    restSykefraværsvarighet: RestSykefraværsvarighet;
}> = (props) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const harFeil = props.restSykefraværsvarighet.status === RestStatus.Feil;
    return (
        <>
            {harFeil && (
                <AlertStripeFeil className="sammenligningspanel-barnehage__feilmelding">
                    Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv igjen senere.
                </AlertStripeFeil>
            )}
            <div className="sammenligningspanel-barnehage" ref={panelRef}>
                <ReactToPrint
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
