import React, { FunctionComponent, useContext, useEffect, useMemo } from 'react';
import { NotifikasjonWidgetProvider } from '@navikt/arbeidsgiver-notifikasjon-widget';
import Banner from './Banner/Banner';
import { Route, Routes } from 'react-router-dom';
import { RestStatus } from './api/api-utils';
import Lasteside from './Lasteside/Lasteside';
import Innloggingsside from './Innloggingsside/Innloggingsside';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import FeilFraAltinnSide from './FeilSider/FeilFraAltinnSide/FeilFraAltinnSide';
import { ER_VEDLIKEHOLD_AKTIVERT, MILJØ, PATH_FORSIDE } from './konstanter';
import { Forside } from './Forside/Forside';
import { ManglerRettighetRedirect } from './utils/redirects';
import VedlikeholdSide from './FeilSider/Vedlikehold/VedlikeholdSide';
import {
    getEkstradata,
    SykefraværAppData,
    useSykefraværAppData,
} from './hooks/useSykefraværAppData';
import { AnalyticsClient } from './amplitude/client';
import { useAnalytics } from './hooks/useAnalytics';
import { EnvironmentContext } from './Context/EnvironmentContext';

interface Props {
    analyticsClient: AnalyticsClient;
}

const App: FunctionComponent<Props> = ({ analyticsClient }) => {
    return (
        <main id="maincontent" role="main">
            <AppContent {...useSykefraværAppData()} analyticsClient={analyticsClient} />
        </main>
    );
};

function forsideDataLastesInn(appData: SykefraværAppData) {
    return [
        appData.aggregertStatistikk.restStatus,
        appData.altinnOrganisasjoner.status,
        appData.altinnOrganisasjonerMedStatistikktilgang.status,
    ].some((status) => [RestStatus.LasterInn, RestStatus.IkkeLastet].includes(status));
}

export const AppContent = (appData: SykefraværAppData & { analyticsClient: AnalyticsClient }) => {
    const { MILJØ: miljø } = useContext(EnvironmentContext);
    useAnalytics(appData.analyticsClient);

    const datakilder = useMemo(() => {
        return [
            appData.sykefraværshistorikk,
            appData.aggregertStatistikk,
            appData.enhetsregisterdata,
        ];
    }, [appData.sykefraværshistorikk, appData.aggregertStatistikk, appData.enhetsregisterdata]);

    useEffect(() => {
        if (
            appData.sykefraværshistorikk.status === RestStatus.Suksess &&
            appData.aggregertStatistikk.restStatus === RestStatus.Suksess &&
            appData.enhetsregisterdata.restUnderenhet.status === RestStatus.Suksess &&
            appData.enhetsregisterdata.restOverordnetEnhet.status === RestStatus.Suksess
        ) {
            const ekstradata = getEkstradata(
                appData.aggregertStatistikk,
                appData.enhetsregisterdata
            );
            appData.analyticsClient?.setUserProperties({
                ...ekstradata,
            });
        }
    }, [
        appData.sykefraværshistorikk,
        appData.enhetsregisterdata,
        datakilder,
        appData.analyticsClient,
        appData.aggregertStatistikk,
    ]);

    let innhold;
    if (ER_VEDLIKEHOLD_AKTIVERT) {
        return <VedlikeholdSide />;
    }

    if (forsideDataLastesInn(appData)) {
        innhold = <Lasteside />;
    }

    if (appData.altinnOrganisasjoner.status === RestStatus.IkkeInnlogget) {
        return <Innloggingsside redirectUrl={window.location.href} />;
    }

    if (appData.altinnOrganisasjoner.status !== RestStatus.Suksess) {
        innhold = <FeilFraAltinnSide />;
    }

    const brukerHarIkkeTilgangTilNoenOrganisasjoner =
        appData.altinnOrganisasjoner.status === RestStatus.Suksess &&
        appData.altinnOrganisasjoner.data.length === 0;

    if (brukerHarIkkeTilgangTilNoenOrganisasjoner) {
        return <ManglerRettighetRedirect />;
    }

    innhold = (
        <Routes>
            <Route
                path={PATH_FORSIDE}
                element={
                    <>
                        <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                        <Forside {...appData} />
                    </>
                }
            />
        </Routes>
    );
    return (
        <NotifikasjonWidgetProvider
            miljo={miljø === MILJØ.PROD ? 'prod' : 'dev'}
            apiUrl="/sykefravarsstatistikk/notifikasjon-bruker-api"
        >
            {
                <Banner
                    tittel="Sykefraværsstatistikk"
                    restOrganisasjoner={appData.altinnOrganisasjoner}
                />
            }
            {innhold}
        </NotifikasjonWidgetProvider>
    );
};

export default App;
