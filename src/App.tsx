import React, { FunctionComponent, useContext, useEffect, useMemo } from 'react';
import { NotifikasjonWidgetProvider } from '@navikt/arbeidsgiver-notifikasjon-widget';
import Banner from './Banner/Banner';
import { Route } from 'react-router-dom';
import { RestStatus } from './api/api-utils';
import Innloggingsside from './Innloggingsside/Innloggingsside';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import FeilFraAltinnSide from './FeilSider/FeilFraAltinnSide/FeilFraAltinnSide';
import { MILJØ, PATH_FORSIDE } from './konstanter';
import { Forside } from './Forside/Forside';
import { ManglerRettighetRedirect } from './utils/redirects';
import {
    getEkstradata,
    SykefraværAppData,
    useSykefraværAppData,
} from './hooks/useSykefraværAppData';
import { AnalyticsClient } from './amplitude/client';
import { useAnalytics } from './hooks/useAnalytics';
import { EnvironmentContext } from './Context/EnvironmentContext';
import { FaroRoutes, ReactRouterV6RoutesProps, withFaroErrorBoundary } from '@grafana/faro-react';

interface Props {
    analyticsClient: AnalyticsClient;
    RoutesComponent?: React.FunctionComponent;
}

const App: FunctionComponent<Props> = ({ analyticsClient, RoutesComponent = FaroRoutes }) => {
    return (
        <AppContent
            {...useSykefraværAppData()}
            analyticsClient={analyticsClient}
            RoutesComponent={RoutesComponent}
        />
    );
};

export const AppContent = ({
    RoutesComponent,
    ...appData
}: SykefraværAppData & {
    analyticsClient: AnalyticsClient;
    RoutesComponent: React.FunctionComponent | ((props: ReactRouterV6RoutesProps) => JSX.Element);
}) => {
    const envCont = useContext(EnvironmentContext);
    const { MILJØ: miljø } = envCont;
    console.log('envCont :>> ', envCont);
    console.log('process.env', process.env);
    console.log('appData :>> ', appData);
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
        <RoutesComponent>
            <Route
                path={PATH_FORSIDE}
                element={
                    <>
                        <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                        <Forside {...appData} />
                    </>
                }
            />
        </RoutesComponent>
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

export default withFaroErrorBoundary(App, {});
