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
import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react';
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

    if (!brukerHarIaRettighetTilValgtBedrift) {
        return (
            <ManglerRettigheterIAltinnSide
                restOrganisasjonerMedStatistikk={appData.altinnOrganisasjonerMedStatistikktilgang}
            />
        );
    }
    const innholdRef = useRef<HTMLDivElement>(null);
    const lastNedKnappRef = useRef<HTMLButtonElement>(null);

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
                        restPubliseringsdatoer={appData.publiseringsdatoer}
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
