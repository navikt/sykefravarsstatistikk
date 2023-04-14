import React, { FunctionComponent, useRef } from 'react';
import './Sammenligningspanel.less';
import ReactToPrint from 'react-to-print';
import { Alert } from '@navikt/ds-react';
import { RestStatus } from '../../api/api-utils';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { RestAltinnOrganisasjoner } from '../../api/altinnorganisasjon-api';
import { useOrgnr } from '../../hooks/useOrgnr';
import { sendKnappEvent } from '../../amplitude/events';

export const Sammenligningspaneler: FunctionComponent<{
    restAltinnOrganisasjoner: RestAltinnOrganisasjoner;
    restAltinnOrganisasjonerMedStatistikktilgang: RestAltinnOrganisasjoner;
    restStatus: RestStatus;
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

    return (
        <>
            {harFeil && (
                <Alert variant={'error'} className="sammenligningspanel__info-eller-feilmelding">
                    Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv igjen senere.
                </Alert>
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
                    onBeforePrint={() => sendKnappEvent('skriv ut')}
                    onAfterPrint={() => {
                        if (lastNedKnappRef.current) {
                            lastNedKnappRef.current.focus();
                        }
                    }}
                    content={() => panelRef.current}
                    trigger={() => (
                        <button ref={lastNedKnappRef} className="sammenligningspanel__knapp knapp">
                            Last ned
                        </button>
                    )}
                />
                {children}
            </div>
        </>
    );
};
