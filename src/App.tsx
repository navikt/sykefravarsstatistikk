import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { NotifikasjonWidgetProvider } from '@navikt/arbeidsgiver-notifikasjon-widget';
import Banner from './Banner/Banner';
import { Route, Routes } from 'react-router-dom';
import InnloggingssideWrapper from './Forside/InnloggingssideWrapper';
import { RestStatus } from './api/api-utils';
import Lasteside from './Lasteside/Lasteside';
import Innloggingsside from './Innloggingsside/Innloggingsside';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import Historikkpanel from './Forside/Historikkpanel/Historikkpanel';
import FeilFraAltinnSide from './FeilSider/FeilFraAltinnSide/FeilFraAltinnSide';
import GrafOgTabell from './GrafOgTabell/GrafOgTabell';
import {
    ER_VEDLIKEHOLD_AKTIVERT,
    MILJØ,
    PATH_FORSIDE,
    PATH_HISTORIKK,
    PATH_KALKULATOR_REDIRECT,
} from './konstanter';
import './App.less';
import { Forside } from './Forside/Forside';
import { Sammenligningspaneler } from './Forside/Sammenligningspanel/Sammenligningspaneler';
import { EkspanderbarSammenligning } from './Forside/EkspanderbarSammenligning/EkspanderbarSammenligning';
import { ArbeidsmiljøportalPanel } from './Forside/ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import {
    KalkulatorRedirect,
    ManglerRettighetRedirect,
} from './utils/redirects';
import VedlikeholdSide from './FeilSider/Vedlikehold/VedlikeholdSide';
import {
    getEkstradata,
    SykefraværAppData,
    useSykefraværAppData,
} from './hooks/useSykefraværAppData';
import { AnalyticsClient } from './amplitude/client';
import { useAnalytics } from './hooks/useAnalytics';
import { RestAltinnOrganisasjoner } from './api/altinnorganisasjon-api';
import Samtalestøttepanel from './Forside/Samtalestøttepanel/Samtalestøttepanel';
import { getMiljø } from './utils/miljøUtils';
import { RestAggregertStatistikk } from './hooks/useAggregertStatistikk';

interface Props {
    analyticsClient: AnalyticsClient;
}

const App: FunctionComponent<Props> = ({ analyticsClient }) => {
    return (
        <main id="maincontent">
            <AppContent {...useSykefraværAppData()} analyticsClient={analyticsClient} />
        </main>
    );
};

function dataLastesInn(
    restOrganisasjoner: RestAltinnOrganisasjoner,
    restAggregertStatistikk: RestAggregertStatistikk
) {
    return (
        restOrganisasjoner.status === RestStatus.LasterInn ||
        restAggregertStatistikk.restStatus === RestStatus.LasterInn
    );
}

export const AppContent = ({
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikktilgang,
    enhetsregisterdata,
    sykefraværshistorikk,
    aggregertStatistikk,
    publiseringsdatoer,
    analyticsClient,
}: SykefraværAppData & {
    analyticsClient: AnalyticsClient;
}) => {
    useAnalytics(analyticsClient);

    const datakilder = useMemo(() => {
        return [sykefraværshistorikk, aggregertStatistikk, enhetsregisterdata];
    }, [sykefraværshistorikk, aggregertStatistikk, enhetsregisterdata]);

    useEffect(() => {
        if (
            sykefraværshistorikk.status === RestStatus.Suksess &&
            aggregertStatistikk.restStatus === RestStatus.Suksess &&
            enhetsregisterdata.restUnderenhet.status === RestStatus.Suksess &&
            enhetsregisterdata.restOverordnetEnhet.status === RestStatus.Suksess
        ) {
            const ekstradata = getEkstradata(aggregertStatistikk, enhetsregisterdata);
            analyticsClient?.setUserProperties({
                ...ekstradata,
            });
        }
    }, [
        sykefraværshistorikk,
        enhetsregisterdata,
        datakilder,
        analyticsClient,
        aggregertStatistikk,
    ]);

    let innhold;
    if (ER_VEDLIKEHOLD_AKTIVERT) {
        return <VedlikeholdSide />;
    }

    if (dataLastesInn(altinnOrganisasjoner, aggregertStatistikk)) {
        innhold = <Lasteside />;
    }

    if (altinnOrganisasjoner.status === RestStatus.IkkeInnlogget) {
        return <Innloggingsside redirectUrl={window.location.href} />;
    }

    if (altinnOrganisasjoner.status !== RestStatus.Suksess) {
        innhold = <FeilFraAltinnSide />;
    }

    const brukerHarIkkeTilgangTilNoenOrganisasjoner =
        altinnOrganisasjoner.status === RestStatus.Suksess &&
        altinnOrganisasjoner.data.length === 0;
    if (brukerHarIkkeTilgangTilNoenOrganisasjoner) {
        return <ManglerRettighetRedirect />;
    }

    innhold = (
        <Routes>
            <Route path={PATH_KALKULATOR_REDIRECT} element={<KalkulatorRedirect />} />
            <Route
                path={PATH_FORSIDE}
                element={
                    <>
                        <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                        <InnloggingssideWrapper aggregertStatistikk={aggregertStatistikk}>
                            <Forside>
                                <Sammenligningspaneler
                                    restStatus={aggregertStatistikk.restStatus}
                                    restAltinnOrganisasjoner={altinnOrganisasjoner}
                                    restAltinnOrganisasjonerMedStatistikktilgang={
                                        altinnOrganisasjonerMedStatistikktilgang
                                    }
                                >
                                    <EkspanderbarSammenligning
                                        aggregertStatistikk={aggregertStatistikk}
                                        restPubliseringsdatoer={publiseringsdatoer}
                                    />
                                </Sammenligningspaneler>
                                <div className={'app__lenkepanelWrapper'}>
                                    <Historikkpanel />
                                    <Samtalestøttepanel />
                                </div>
                                <ArbeidsmiljøportalPanel
                                    restUnderenhet={enhetsregisterdata.restUnderenhet}
                                />
                            </Forside>
                        </InnloggingssideWrapper>
                    </>
                }
            />
            <Route
                path={PATH_HISTORIKK}
                element={
                    <>
                        <Brødsmulesti gjeldendeSide="historikk" />
                        <GrafOgTabell
                            restSykefraværsstatistikk={sykefraværshistorikk}
                            restOrganisasjonerMedStatistikk={
                                altinnOrganisasjonerMedStatistikktilgang
                            }
                        />
                    </>
                }
            />
        </Routes>
    );
    return (
        <NotifikasjonWidgetProvider
            miljo={getMiljø() === MILJØ.PROD ? 'prod' : 'dev'}
            apiUrl="/sykefravarsstatistikk/notifikasjon-bruker-api"
        >
            {<Banner tittel="Sykefraværsstatistikk" restOrganisasjoner={altinnOrganisasjoner} />}
            {innhold}
        </NotifikasjonWidgetProvider>
    );
};

export default App;
