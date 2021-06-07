import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import Banner from './Banner/Banner';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import InnloggingssideWrapper from './Forside/InnloggingssideWrapper';
import { RestAltinnOrganisasjoner } from './api/altinnorganisasjon-api';
import { RestStatus } from './api/api-utils';
import Lasteside from './Lasteside/Lasteside';
import Innloggingsside from './Innloggingsside/Innloggingsside';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import KalkulatorPanel from './Forside/Kalkulatorpanel/KalkulatorPanel';
import Historikkpanel from './Forside/Historikkpanel/Historikkpanel';
import FeilFraAltinnSide from './FeilSider/FeilFraAltinnSide/FeilFraAltinnSide';
import GrafOgTabell from './GrafOgTabell/GrafOgTabell';
import { RestSykefraværshistorikk } from './api/kvartalsvisSykefraværshistorikk';
import { RestVirksomhetMetadata } from './api/virksomhetMetadata';
import IAWebRedirectPanel from './IAWebRedirectSide/IAWebRedirectPanel';
import IAWebRedirectSide from './IAWebRedirectSide/IAWebRedirectSide';
import {
    BASE_PATH,
    ER_VEDLIKEHOLD_AKTIVERT,
    PATH_FORSIDE,
    PATH_FORSIDE_BARNEHAGE,
    PATH_FORSIDE_GENERELL,
    PATH_HISTORIKK,
    PATH_IAWEB_REDIRECTSIDE,
    PATH_KALKULATOR,
} from './konstanter';
import {
    virksomhetMetadataContext,
    VirksomhetMetadataProvider,
} from './utils/virksomhetMetadataContext';
import {
    sykefraværshistorikkContext,
    SykefraværshistorikkProvider,
} from './utils/sykefraværshistorikkContext';
import { sendEventDirekte, useMålingAvTidsbruk } from './amplitude/amplitude';
import {
    altinnOrganisasjonerContext,
    altinnOrganisasjonerMedTilgangTilStatistikkContext,
    AltinnOrganisasjonerMedTilgangTilStatistikkProvider,
    AltinnOrganisasjonerProvider,
} from './utils/altinnOrganisasjonerContext';
import { useSetUserProperties } from './amplitude/userProperties';
import { FeatureTogglesProvider } from './utils/FeatureTogglesContext';
import Kalkulator from './Kalkulator/Kalkulator/Kalkulator';
import { Forside } from './Forside/Forside';
import { SammenligningspanelBarnehage } from './Forside/barnehage/SammenligningspanelBarnehage/SammenligningspanelBarnehage';
import {
    summertSykefraværshistorikkContext,
    SummertSykefraværshistorikkProvider,
} from './utils/summertSykefraværshistorikkContext';
import { RestSummertSykefraværshistorikk } from './api/summertSykefraværshistorikk';
import { TilbakemeldingContextProvider } from './utils/TilbakemeldingContext';
import {
    enhetsregisteretContext,
    EnhetsregisteretProvider,
    EnhetsregisteretState,
} from './utils/enhetsregisteretContext';
import { EkspanderbarSammenligning } from './Forside/barnehage/EkspanderbarSammenligning/EkspanderbarSammenligning';
import { KursForBarnehager } from './Forside/barnehage/KursForBarnehager/KursForBarnehager';
import { ArbeidsmiljøportalPanel } from './Forside/ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import { hentRestKurs, RestKursliste } from './api/kurs-api';
import {
    LegacyBarnehageSammenligningRedirect,
    LegacySammenligningRedirect,
} from './utils/redirects';
import { IaTjenesterMetrikkerContextProvider } from './metrikker/IaTjenesterMetrikkerContext';
import VedlikeholdSide from './FeilSider/Vedlikehold/VedlikeholdSide';

const App: FunctionComponent = () => {
    sendEventDirekte('forside', 'sidelastet');
    return (
        <BrowserRouter basename={BASE_PATH}>
            <AltinnOrganisasjonerProvider>
                <AltinnOrganisasjonerMedTilgangTilStatistikkProvider>
                    <VirksomhetMetadataProvider>
                        <EnhetsregisteretProvider>
                            <SummertSykefraværshistorikkProvider>
                                <SykefraværshistorikkProvider>
                                    <FeatureTogglesProvider>
                                        <TilbakemeldingContextProvider>
                                            <IaTjenesterMetrikkerContextProvider>
                                                <main id="maincontent">
                                                    <AppContent />
                                                </main>
                                            </IaTjenesterMetrikkerContextProvider>
                                        </TilbakemeldingContextProvider>
                                    </FeatureTogglesProvider>
                                </SykefraværshistorikkProvider>
                            </SummertSykefraværshistorikkProvider>
                        </EnhetsregisteretProvider>
                    </VirksomhetMetadataProvider>
                </AltinnOrganisasjonerMedTilgangTilStatistikkProvider>
            </AltinnOrganisasjonerProvider>
        </BrowserRouter>
    );
};

const AppContent: FunctionComponent = () => {
    const restOrganisasjoner = useContext<RestAltinnOrganisasjoner>(altinnOrganisasjonerContext);
    const restOrganisasjonerMedStatistikk = useContext<RestAltinnOrganisasjoner>(
        altinnOrganisasjonerMedTilgangTilStatistikkContext
    );
    const restSummertSykefraværshistorikk = useContext<RestSummertSykefraværshistorikk>(
        summertSykefraværshistorikkContext
    );
    const restSykefraværshistorikk = useContext<RestSykefraværshistorikk>(
        sykefraværshistorikkContext
    );
    const restVirksomhetMetadata = useContext<RestVirksomhetMetadata>(virksomhetMetadataContext);
    const location = useLocation();
    useSetUserProperties();
    useMålingAvTidsbruk('hele appen', 5, 30, 60, 120, 300);

    const { restUnderenhet } = useContext<EnhetsregisteretState>(enhetsregisteretContext);

    useEffect(() => {
        if (
            restUnderenhet.status === RestStatus.Suksess &&
            restUnderenhet.data.næringer.length > 1
        ) {
            sendEventDirekte('app', 'flere næringer', {
                antallNæringer: restUnderenhet.data.næringer.length,
                næringer: restUnderenhet.data.næringer.map((næring) => næring.kode),
            });
        }
    }, [restUnderenhet]);
    const [restKursliste, setRestKursliste] = useState<RestKursliste>({
        status: RestStatus.IkkeLastet,
    });

    useEffect(() => {
        const hentOgSetRestKurs = async () => {
            setRestKursliste(await hentRestKurs());
        };
        hentOgSetRestKurs();
    }, [setRestKursliste]);

    const brukerHarIkkeTilgangTilNoenOrganisasjoner =
        restOrganisasjoner.status === RestStatus.Suksess && restOrganisasjoner.data.length === 0;

    let innhold;
    if (ER_VEDLIKEHOLD_AKTIVERT) {
        return <VedlikeholdSide />;
    } else if (
        restOrganisasjoner.status === RestStatus.LasterInn ||
        restVirksomhetMetadata.status === RestStatus.LasterInn
    ) {
        innhold = <Lasteside />;
    } else if (
        restOrganisasjoner.status === RestStatus.IkkeInnlogget &&
        !location.pathname.includes('iawebredirectside')
    ) {
        return <Innloggingsside />;
    } else if (
        restOrganisasjoner.status !== RestStatus.Suksess &&
        !location.pathname.includes('iawebredirectside')
    ) {
        innhold = <FeilFraAltinnSide />;
    } else if (brukerHarIkkeTilgangTilNoenOrganisasjoner) {
        window.location.replace('/min-side-arbeidsgiver/mangler-tilgang');
    } else {
        innhold = (
            <>
                <Route path={PATH_FORSIDE_BARNEHAGE}>
                    <LegacyBarnehageSammenligningRedirect />
                </Route>
                <Route path={PATH_FORSIDE_GENERELL}>
                    <LegacySammenligningRedirect />
                </Route>
                <Route path={PATH_FORSIDE} exact={true}>
                    <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                    <InnloggingssideWrapper
                        restSykefraværshistorikk={restSykefraværshistorikk}
                        restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                    >
                        <Forside>
                            <SammenligningspanelBarnehage
                                restSummertSykefraværshistorikk={restSummertSykefraværshistorikk}
                                restAltinnOrganisasjoner={restOrganisasjoner}
                            >
                                <EkspanderbarSammenligning
                                    restSummertSykefraværshistorikk={
                                        restSummertSykefraværshistorikk
                                    }
                                    restVirksomhetMetadata={restVirksomhetMetadata}
                                />
                            </SammenligningspanelBarnehage>
                            <KalkulatorPanel liten />
                            <Historikkpanel />
                            <KursForBarnehager restKursliste={restKursliste} />
                            <ArbeidsmiljøportalPanel
                                restVirksomhetMetadata={restVirksomhetMetadata}
                            />
                        </Forside>
                    </InnloggingssideWrapper>
                </Route>
                <Route path={PATH_KALKULATOR} exact={true}>
                    <Brødsmulesti gjeldendeSide="kalkulator" />
                    <InnloggingssideWrapper
                        restSykefraværshistorikk={restSykefraværshistorikk}
                        restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                    >
                        <Kalkulator restSykefraværshistorikk={restSykefraværshistorikk} />
                    </InnloggingssideWrapper>
                </Route>
                <Route path={PATH_HISTORIKK} exact={true}>
                    <Brødsmulesti gjeldendeSide="historikk" />
                    <GrafOgTabell
                        restSykefraværsstatistikk={restSykefraværshistorikk}
                        restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                    />
                </Route>
                <Route path={PATH_IAWEB_REDIRECTSIDE} exact={true}>
                    <IAWebRedirectSide restSykefraværshistorikk={restSykefraværshistorikk}>
                        <IAWebRedirectPanel />
                    </IAWebRedirectSide>
                </Route>
            </>
        );
    }

    return (
        <>
            {!location.pathname.includes('iawebredirectside') && (
                <Banner tittel="Sykefraværsstatistikk" restOrganisasjoner={restOrganisasjoner} />
            )}
            {innhold}
        </>
    );
};

export default App;
