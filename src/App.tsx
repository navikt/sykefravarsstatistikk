import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import Banner from './Banner/Banner';
import { BrowserRouter, Route } from 'react-router-dom';
import InnloggingssideWrapper from './Forside/InnloggingssideWrapper';
import { RestStatus } from './api/api-utils';
import Lasteside from './Lasteside/Lasteside';
import Innloggingsside from './Innloggingsside/Innloggingsside';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import KalkulatorPanel from './Forside/Kalkulatorpanel/KalkulatorPanel';
import Historikkpanel from './Forside/Historikkpanel/Historikkpanel';
import FeilFraAltinnSide from './FeilSider/FeilFraAltinnSide/FeilFraAltinnSide';
import GrafOgTabell from './GrafOgTabell/GrafOgTabell';
import { RestSykefraværshistorikk } from './api/kvartalsvis-sykefraværshistorikk-api';
import { RestVirksomhetsdata } from './api/virksomhetsdata-api';
import {
    BASE_PATH,
    ER_VEDLIKEHOLD_AKTIVERT,
    PATH_FORSIDE,
    PATH_FORSIDE_BARNEHAGE,
    PATH_FORSIDE_GENERELL,
    PATH_HISTORIKK,
    PATH_KALKULATOR,
} from './konstanter';
import { virksomhetsdataContext, VirksomhetsdataProvider } from './utils/virksomhetsdataContext';
import {
    sykefraværshistorikkContext,
    SykefraværshistorikkProvider,
} from './utils/sykefraværshistorikkContext';
import { sendEventDirekte } from './amplitude/events';
import { FeatureTogglesProvider } from './utils/FeatureTogglesContext';
import Kalkulator from './Kalkulator/Kalkulator/Kalkulator';
import { Forside } from './Forside/Forside';
import { Sammenligningspanel } from './Forside/Sammenligningspanel/Sammenligningspanel';
import {
    summertSykefraværshistorikkContext,
    SummertSykefraværshistorikkProvider,
} from './utils/summertSykefraværshistorikkContext';
import { RestSummertSykefraværshistorikk } from './api/summert-sykefraværshistorikk-api';
import { EnhetsregisteretProvider } from './utils/enhetsregisteretContext';
import { EkspanderbarSammenligning } from './Forside/EkspanderbarSammenligning/EkspanderbarSammenligning';
import { Kurskalender } from './Forside/Kurskalender/Kurskalender';
import { ArbeidsmiljøportalPanel } from './Forside/ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import { hentRestKurs, RestKursliste } from './api/kurs-api';
import {
    LegacyBarnehageSammenligningRedirect,
    LegacySammenligningRedirect,
} from './utils/redirects';
import { IaTjenesterMetrikkerContextProvider } from './metrikker/IaTjenesterMetrikkerContext';
import VedlikeholdSide from './FeilSider/Vedlikehold/VedlikeholdSide';
import SamtalestøttePodletpanel from './Forside/Samtalestøttepanel/SamtalestøttePodletpanel';
import { amplitudeClient } from './amplitude/client';
import { useOrgnr } from './utils/orgnr-hook';
import { Sykefravarsstatistikk, useSykefravarsstatistikk } from './hooks/useSykefravarsstatistikk';

const App: FunctionComponent = () => {
    sendEventDirekte('forside', 'sidelastet');
    return (
        <BrowserRouter basename={BASE_PATH}>
            <VirksomhetsdataProvider>
                <EnhetsregisteretProvider>
                    <SummertSykefraværshistorikkProvider>
                        <SykefraværshistorikkProvider>
                            <FeatureTogglesProvider>
                                <IaTjenesterMetrikkerContextProvider>
                                    <main id="maincontent">
                                        <AppContent {...useSykefravarsstatistikk()} />
                                    </main>
                                </IaTjenesterMetrikkerContextProvider>
                            </FeatureTogglesProvider>
                        </SykefraværshistorikkProvider>
                    </SummertSykefraværshistorikkProvider>
                </EnhetsregisteretProvider>
            </VirksomhetsdataProvider>
        </BrowserRouter>
    );
};

const AppContent = ({
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikk,
}: Sykefravarsstatistikk) => {
    const orgnr = useOrgnr();
    amplitudeClient.setUserProperties({ 'orgnr: ': orgnr });

    const restOrganisasjoner = altinnOrganisasjoner;
    const restOrganisasjonerMedStatistikk = altinnOrganisasjonerMedStatistikk;

    const restSummertSykefraværshistorikk = useContext<RestSummertSykefraværshistorikk>(
        summertSykefraværshistorikkContext
    );
    const restSykefraværshistorikk = useContext<RestSykefraværshistorikk>(
        sykefraværshistorikkContext
    );
    const restvirksomhetsdata = useContext<RestVirksomhetsdata>(virksomhetsdataContext);

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
        restvirksomhetsdata.status === RestStatus.LasterInn
    ) {
        innhold = <Lasteside />;
    } else if (restOrganisasjoner.status === RestStatus.IkkeInnlogget) {
        return <Innloggingsside redirectUrl={window.location.href} />;
    } else if (restOrganisasjoner.status !== RestStatus.Suksess) {
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
                            <Sammenligningspanel
                                restSummertSykefraværshistorikk={restSummertSykefraværshistorikk}
                                restAltinnOrganisasjoner={restOrganisasjoner}
                            >
                                <EkspanderbarSammenligning
                                    restSummertSykefraværshistorikk={
                                        restSummertSykefraværshistorikk
                                    }
                                    restVirksomhetsdata={restvirksomhetsdata}
                                />
                            </Sammenligningspanel>
                            <KalkulatorPanel liten />
                            <Historikkpanel />
                            <Kurskalender restKursliste={restKursliste} liten={true} />
                            <SamtalestøttePodletpanel />
                            <ArbeidsmiljøportalPanel restvirksomhetsdata={restvirksomhetsdata} />
                        </Forside>
                    </InnloggingssideWrapper>
                </Route>
                <Route path={PATH_KALKULATOR} exact={true}>
                    <Brødsmulesti gjeldendeSide="kalkulator" />
                    <Kalkulator restSykefraværshistorikk={restSykefraværshistorikk} />
                </Route>
                <Route path={PATH_HISTORIKK} exact={true}>
                    <Brødsmulesti gjeldendeSide="historikk" />
                    <GrafOgTabell
                        restSykefraværsstatistikk={restSykefraværshistorikk}
                        restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                    />
                </Route>
            </>
        );
    }

    return (
        <>
            {<Banner tittel="Sykefraværsstatistikk" restOrganisasjoner={restOrganisasjoner} />}
            {innhold}
        </>
    );
};

export default App;
