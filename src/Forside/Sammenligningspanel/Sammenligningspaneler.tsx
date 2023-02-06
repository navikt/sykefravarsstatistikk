import React, { FunctionComponent, useRef } from 'react';
import './Sammenligningspanel.less';
import ReactToPrint from 'react-to-print';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Alert } from "@navikt/ds-react";
import { RestStatus } from '../../api/api-utils';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { RestAltinnOrganisasjoner } from '../../api/altinnorganisasjon-api';
import { useOrgnr } from '../../hooks/useOrgnr';
import { sendKnappEvent } from '../../amplitude/events';
import EksternLenke from '../../felleskomponenter/EksternLenke/EksternLenke';

export const Sammenligningspaneler: FunctionComponent<{
    restAltinnOrganisasjoner: RestAltinnOrganisasjoner;
    restAltinnOrganisasjonerMedStatistikktilgang: RestAltinnOrganisasjoner;
    restStatus: RestStatus;
}> = ({
    restAltinnOrganisasjoner,
    restAltinnOrganisasjonerMedStatistikktilgang,
    restStatus,
    children,
}) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const lastNedKnappRef = useRef<HTMLButtonElement>(null);
    const harFeil = restStatus === RestStatus.Feil;
    const orgnr = useOrgnr() || '';
    const navnPåVirksomhet =
        restAltinnOrganisasjoner.status === RestStatus.Suksess &&
        restAltinnOrganisasjoner.data.find(
            (organisasjon) => organisasjon.OrganizationNumber === orgnr
        )?.Name;

    const brukerHarIaRettighetTilValgtBedrift =
        restAltinnOrganisasjonerMedStatistikktilgang.status === RestStatus.Suksess &&
        restAltinnOrganisasjonerMedStatistikktilgang.data
            .map((org) => org.OrganizationNumber)
            .includes(orgnr);

    return (
        <>
            {harFeil && (
                <AlertStripeFeil className="sammenligningspanel__info-eller-feilmelding">
                    Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv igjen senere.
                </AlertStripeFeil>
            )}
            {!brukerHarIaRettighetTilValgtBedrift && (
                <Alert variant={"warning"} className="sammenligningspanel__info-eller-feilmelding">
                    Du mangler rettigheter til å se tallene for bedriften du har valgt.{' '}
                    <EksternLenke
                        href={
                            'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'
                        }
                    >
                        Be om tilgang
                    </EksternLenke>
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
