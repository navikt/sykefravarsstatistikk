import React, { FunctionComponent, ReactNode, useEffect, useRef } from 'react';
import './Sammenligningspaneler.less';
import ReactToPrint from 'react-to-print';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import { RestStatus } from '../../api/api-utils';
import { RestAltinnOrganisasjoner } from '../../api/altinnorganisasjon-api';
import { useOrgnr } from '../../hooks/useOrgnr';
import { sendKnappEvent } from '../../amplitude/events';
import { sendIaTjenesteMetrikkMottatt } from '../../metrikker/iatjenester';
import { RestSykefraværshistorikk } from '../../api/kvartalsvis-sykefraværshistorikk-api';
import {
    getBransjeEllerNæringLabel,
    getHistorikkLabels,
    historikkHarOverordnetEnhet,
    konverterTilKvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';
import Tabell, { TabellProps } from '../../GrafOgTabell/Tabell/Tabell';
import { PubliseringsdatoOppdateringsinfo } from '../SammenligningMedBransje/PubliseringsdatoOppdateringsinfo';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { PeriodeForStatistikk } from '../SammenligningMedBransje/PeriodeForStatistikk';

export const Sammenligningspaneler: FunctionComponent<{
    restAltinnOrganisasjoner: RestAltinnOrganisasjoner;
    restPubliseringsdatoer: RestPubliseringsdatoer;
    restStatus: RestStatus;
    children?: ReactNode;
    restSykefraværshistorikk: RestSykefraværshistorikk;
}> = ({
    restAltinnOrganisasjoner,
    restPubliseringsdatoer,
    restStatus,
    children,
    restSykefraværshistorikk,
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
    const tabellProps = hentTabellProps(restSykefraværshistorikk);

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
                <div className="sammenligningspaneler__header">
                    <BodyShort className="sammenligningspaneler__href">
                        {window.location.href}
                    </BodyShort>
                    <Heading spacing size="medium" level="1">
                        Sykefraværsstatistikk for {navnPåVirksomhet} ({orgnr})
                    </Heading>
                    <PeriodeForStatistikk restPubliseringsdatoer={restPubliseringsdatoer} />
                    <PubliseringsdatoOppdateringsinfo
                        restPubliseringsdatoer={restPubliseringsdatoer}
                    />
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
                {!!tabellProps && (
                    <div className="sammenligningspaneler__kun-print">
                        <Tabell {...tabellProps} />
                    </div>
                )}
            </div>
        </>
    );

    function hentTabellProps(
        restSykefraværsstatistikk: RestSykefraværshistorikk
    ): TabellProps | undefined {
        if (restSykefraværsstatistikk.status === RestStatus.Suksess) {
            const harOverordnetEnhet = historikkHarOverordnetEnhet(restSykefraværsstatistikk.data);
            const bransjeEllerNæringLabel = getBransjeEllerNæringLabel(
                restSykefraværsstatistikk.data
            );
            const historikkLabels = getHistorikkLabels(restSykefraværsstatistikk.data);
            const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
                restSykefraværsstatistikk.data
            );
            const kvartalsvisSammenligningReversed = kvartalsvisSammenligning.toReversed();

            return {
                harOverordnetEnhet,
                bransjeEllerNæringLabel,
                historikkLabels,
                kvartalsvisSammenligning: kvartalsvisSammenligningReversed,
            };
        }
    }
};
