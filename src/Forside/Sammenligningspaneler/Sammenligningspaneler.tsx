import React, { FunctionComponent, ReactNode, useEffect, useRef } from 'react';
import './Sammenligningspaneler.less';
import ReactToPrint from 'react-to-print';
import { Alert } from '@navikt/ds-react';
import { RestStatus } from '../../api/api-utils';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { RestAltinnOrganisasjoner } from '../../api/altinnorganisasjon-api';
import { useOrgnr } from '../../hooks/useOrgnr';
import { sendKnappEvent } from '../../amplitude/events';
import { sendIaTjenesteMetrikkMottatt } from '../../metrikker/iatjenester';

export const Sammenligningspaneler: FunctionComponent<{
    restAltinnOrganisasjoner: RestAltinnOrganisasjoner;
    restAltinnOrganisasjonerMedStatistikktilgang: RestAltinnOrganisasjoner;
    restStatus: RestStatus;
    children?: ReactNode;
}> = ({ restAltinnOrganisasjoner, restStatus, children }) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const lastNedKnappRef = useRef<HTMLButtonElement>(null);
    const harFeil = restStatus === RestStatus.Feil;
    const orgnr = useOrgnr() || '';
    const navnPåVirksomhet =
        restAltinnOrganisasjoner.status === RestStatus.Suksess &&
        restAltinnOrganisasjoner.data.find(
            (organisasjon) => organisasjon.OrganizationNumber === orgnr
        )?.Name;

    useEffect(() => {
        const timer = setTimeout(() => sendIaTjenesteMetrikkMottatt(orgnr), 5000);
        return () => clearTimeout(timer);
    }, [orgnr]);

    return (
        <>
            {harFeil && (
                <Alert variant={'error'} className="sammenligningspaneler__info-eller-feilmelding">
                    Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv igjen senere.
                </Alert>
            )}
            <div className="sammenligningspaneler" ref={panelRef}>
                <div className="sammenligningspaneler__print-header">
                    <Normaltekst className="sammenligningspaneler__href">
                        {window.location.href}
                    </Normaltekst>
                    <Systemtittel tag="h1" className="sammenligningspaneler__print-tittel">
                        Sykefraværsstatistikk for {navnPåVirksomhet} ({orgnr})
                    </Systemtittel>
                </div>
                <ReactToPrint
                    onBeforePrint={() => {
                        sendKnappEvent('skriv ut');
                        sendIaTjenesteMetrikkMottatt(orgnr);
                    }}
                    onAfterPrint={() => {
                        if (lastNedKnappRef.current) {
                            lastNedKnappRef.current.focus();
                        }
                    }}
                    content={() => panelRef.current}
                    trigger={() => (
                        <button
                            ref={lastNedKnappRef}
                            className="sammenligningspaneler__knapp knapp"
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
