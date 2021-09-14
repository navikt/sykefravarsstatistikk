import React, { FunctionComponent, useRef } from 'react';
import './Sammenligningspanel.less';
import ReactToPrint from 'react-to-print';
import {AlertStripeFeil, AlertStripeInfo} from 'nav-frontend-alertstriper';
import { RestSummertSykefraværshistorikk } from '../../api/summertSykefraværshistorikk';
import { RestStatus } from '../../api/api-utils';
import { useSendEvent } from '../../amplitude/amplitude';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { RestAltinnOrganisasjoner } from '../../api/altinnorganisasjon-api';
import { useOrgnr } from '../../utils/orgnr-hook';
import Lenke from "nav-frontend-lenker";

export const Sammenligningspanel: FunctionComponent<{
    restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk;
    restAltinnOrganisasjoner: RestAltinnOrganisasjoner;
}> = ({ restSummertSykefraværshistorikk, restAltinnOrganisasjoner, children }) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const lastNedKnappRef = useRef<HTMLButtonElement>(null);
    const harFeil = restSummertSykefraværshistorikk.status === RestStatus.Feil;
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
                <AlertStripeFeil className="sammenligningspanel__info-eller-feilmelding">
                    Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv igjen senere.
                </AlertStripeFeil>
            )}
            <div className="sammenligningspanel" ref={panelRef}>
                <div className="sammenligningspanel__print-header">
                    <Normaltekst className="sammenligningspanel__href">
                        {window.location.href}
                    </Normaltekst>
                    <Systemtittel tag="h1" className="sammenligningspanel__print-tittel">
                        Sykefraværsstatistikk for {navnPåVirksomhet} ({orgnr})
                    </Systemtittel>
                </div>
                <ReactToPrint
                    //TODO finn ut av hvor dette blir brukt i amplitude
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
                            className="sammenligningspanel__knapp knapp"
                        >
                            Last ned
                        </button>
                    )}
                />
                {children}
            </div>
        </>
    )
};
