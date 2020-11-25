import React, { FunctionComponent, useRef } from 'react';
import './SammenligningspanelBarnehage.less';
import ReactToPrint from 'react-to-print';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { RestSummertSykefraværshistorikk } from '../../../api/sykefraværsvarighet';
import { RestStatus } from '../../../api/api-utils';
import { useSendEvent } from '../../../amplitude/amplitude';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { RestAltinnOrganisasjoner } from '../../../api/altinnorganisasjon-api';
import { useOrgnr } from '../../../utils/orgnr-hook';

export const SammenligningspanelBarnehage: FunctionComponent<{
    restSykefraværsvarighet: RestSummertSykefraværshistorikk;
    restAltinnOrganisasjoner: RestAltinnOrganisasjoner;
}> = ({ restSykefraværsvarighet, restAltinnOrganisasjoner, children }) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const lastNedKnappRef = useRef<HTMLButtonElement>(null);
    const harFeil = restSykefraværsvarighet.status === RestStatus.Feil;
    const sendEvent = useSendEvent();
    const orgnr = useOrgnr();
    const navnPåVirksomhet =
        restAltinnOrganisasjoner.status === RestStatus.Suksess &&
        restAltinnOrganisasjoner.data.find(
            (organisasjon) => organisasjon.OrganizationNumber === orgnr
        )?.Name;

    return (
        <>
            {harFeil && (
                <AlertStripeFeil className="sammenligningspanel-barnehage__feilmelding">
                    Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv igjen senere.
                </AlertStripeFeil>
            )}
            <div className="sammenligningspanel-barnehage" ref={panelRef}>
                <div className="sammenligningspanel-barnehage__print-header">
                    <Normaltekst className="sammenligningspanel-barnehage__href">
                        {window.location.href}
                    </Normaltekst>
                    <Systemtittel tag="h1" className="sammenligningspanel-barnehage__print-tittel">
                        Sykefraværsstatistikk for {navnPåVirksomhet} ({orgnr})
                    </Systemtittel>
                </div>
                <ReactToPrint
                    onBeforePrint={() => sendEvent('forside barnehage', 'print')}
                    onAfterPrint={() => {
                        if (lastNedKnappRef.current) {
                            lastNedKnappRef.current.focus();
                        }
                    }}
                    content={() => panelRef.current}
                    trigger={() => (
                        <button
                            ref={lastNedKnappRef}
                            className="sammenligningspanel-barnehage__knapp knapp"
                        >
                            Last ned
                        </button>
                    )}
                />
                {children}
            </div>
        </>
    );
};
