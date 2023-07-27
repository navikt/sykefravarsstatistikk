import { default as React, FunctionComponent, useRef } from 'react';
import { EkspanderbarSammenligning } from './EkspanderbarSammenligning/EkspanderbarSammenligning';
import { SykefraværAppData } from '../hooks/useSykefraværAppData';
import { RestStatus } from '../api/api-utils';
import { ManglerRettigheterIAltinnSide } from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import { useOrgnr } from '../hooks/useOrgnr';
import './Forside.css';
import Historikk from '../Historikk/Historikk';
import { getBransjeEllerNæringKategori } from './EkspanderbarSammenligning/GetBransjeEllerNæringKategori';
import { Statistikkategori } from '../domene/statistikkategori';
import { Alert, BodyShort, Button, Heading, Skeleton } from '@navikt/ds-react';
import ReactToPrint from 'react-to-print';
import { sendKnappEvent } from '../amplitude/events';
import { sendIaTjenesteMetrikkMottatt } from '../metrikker/iatjenester';
import Tabell, { hentTabellProps } from '../Historikk/Tabell/Tabell';
import { SlikHarViKommetFramTilDittResultat } from './SlikHarViKommetFramTilDittResultat/SlikHarViKommetFramTilDittResultat';
import { PeriodeForStatistikk } from './PeriodeForStatistikk';
import { PubliseringsdatoOppdateringsinfo } from './PubliseringsdatoOppdateringsinfo';

export const Forside: FunctionComponent<SykefraværAppData> = (appData) => {
    const orgnr = useOrgnr() || '';
    const harFeil = appData.aggregertStatistikk.restStatus === RestStatus.Feil;

    const brukerHarIaRettighetTilValgtBedrift =
        appData.altinnOrganisasjonerMedStatistikktilgang.status === RestStatus.Suksess &&
        appData.altinnOrganisasjonerMedStatistikktilgang.data
            .map((org) => org.OrganizationNumber)
            .includes(orgnr);

    const innholdRef = useRef<HTMLDivElement>(null);
    const lastNedKnappRef = useRef<HTMLButtonElement>(null);

    const loading = React.useMemo(() => {
        return [
            appData.aggregertStatistikk.restStatus,
            appData.altinnOrganisasjoner.status,
            appData.altinnOrganisasjonerMedStatistikktilgang.status,
            appData.publiseringsdatoer.status,
            appData.sykefraværshistorikk.status,
        ].some((status) => [RestStatus.LasterInn, RestStatus.IkkeLastet].includes(status));
    }, [
        appData.aggregertStatistikk.restStatus,
        appData.altinnOrganisasjoner.status,
        appData.altinnOrganisasjonerMedStatistikktilgang.status,
        appData.publiseringsdatoer.status,
        appData.sykefraværshistorikk.status,
    ]);

    if (loading) {
        return (
            <div className="forside__wrapper">
                <div className="forside">
                    <div className="forside__innhold">
                        <div className="forside__innhold__header">
                            <BodyShort className="forside__innhold__href">
                                {window.location.href}
                            </BodyShort>
                            <Heading spacing size="medium" level="2" as="span">
                                <Skeleton width="65%" />
                            </Heading>
                        </div>
                        <Skeleton
                            variant="rectangle"
                            width={105}
                            height={48}
                            className="forside__innhold__knapp"
                        />
                        <BodyShort as="div">
                            <strong>
                                <Skeleton width="40%" />
                            </strong>
                        </BodyShort>
                        <BodyShort spacing as="div">
                            <strong>
                                <Skeleton width="30%" />
                            </strong>
                        </BodyShort>
                        <Skeleton width="60%" />
                        <Skeleton width="30%" />
                        <Skeleton width="45%" />
                        <Skeleton width="50%" />
                        <EkspanderbarSammenligning
                            aggregertStatistikk={{ restStatus: RestStatus.IkkeLastet }}
                            orgnr={orgnr}
                        />
                        <Historikk restSykefraværsstatistikk={{ status: RestStatus.IkkeLastet }} />
                    </div>
                </div>
            </div>
        );
    }

    if (!brukerHarIaRettighetTilValgtBedrift) {
        return (
            <ManglerRettigheterIAltinnSide
                restOrganisasjonerMedStatistikk={appData.altinnOrganisasjonerMedStatistikktilgang}
            />
        );
    }

    const statistikKategori = getBransjeEllerNæringKategori(appData.aggregertStatistikk);
    const harBransje = statistikKategori === Statistikkategori.BRANSJE;

    const bransjeEllerNæring = appData.aggregertStatistikk.aggregertData?.get(
        harBransje ? Statistikkategori.BRANSJE : Statistikkategori.NÆRING
    );
    const navnPåVirksomhet =
        appData.altinnOrganisasjoner.status === RestStatus.Suksess &&
        appData.altinnOrganisasjoner.data.find(
            (organisasjon) => organisasjon.OrganizationNumber === orgnr
        )?.Name;
    const tabellProps = hentTabellProps(appData.sykefraværshistorikk);

    return (
        <div className="forside__wrapper">
            <div className="forside">
                <div className="forside__innhold" ref={innholdRef}>
                    {harFeil && (
                        <Alert
                            variant={'error'}
                            className="forside__innhold__info-eller-feilmelding"
                        >
                            Kan ikke vise sykefraværsstatistikken akkurat nå. Vennligst prøv igjen
                            senere.
                        </Alert>
                    )}
                    <div className="forside__innhold__header">
                        <BodyShort className="forside__innhold__href">
                            {window.location.href}
                        </BodyShort>
                        <Heading spacing size="medium" level="2">
                            Sykefraværsstatistikk for {navnPåVirksomhet}
                        </Heading>
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
                        content={() => innholdRef.current}
                        trigger={() => (
                            <Button
                                variant="secondary"
                                lang="nb"
                                aria-label="Last ned sykefraværsstatistikken"
                                ref={lastNedKnappRef}
                                className="forside__innhold__knapp knapp"
                            >
                                Last ned
                            </Button>
                        )}
                    />
                    <BodyShort>
                        <strong>Organisasjonsnummer: {orgnr}</strong>
                    </BodyShort>
                    <BodyShort spacing>
                        <strong>
                            {harBransje ? 'Bransje' : 'Næring'}:{' '}
                            {bransjeEllerNæring?.prosentSiste4KvartalerTotalt?.label}
                        </strong>
                    </BodyShort>
                    <PeriodeForStatistikk restPubliseringsdatoer={appData.publiseringsdatoer} />
                    <PubliseringsdatoOppdateringsinfo
                        restPubliseringsdatoer={appData.publiseringsdatoer}
                    />
                    <SlikHarViKommetFramTilDittResultat />
                    <EkspanderbarSammenligning
                        aggregertStatistikk={appData.aggregertStatistikk}
                        orgnr={orgnr}
                    />
                    {!!tabellProps && (
                        <div className="forside__innhold__kun-print">
                            <Tabell {...tabellProps} />
                        </div>
                    )}
                    <Historikk restSykefraværsstatistikk={appData.sykefraværshistorikk} />
                </div>
            </div>
        </div>
    );
};
