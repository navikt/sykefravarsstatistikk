import React, { FunctionComponent, useEffect, useMemo } from 'react';
import Banner from './Banner/Banner';
import { Navigate, Route, Routes } from 'react-router-dom';
import InnloggingssideWrapper from './Forside/InnloggingssideWrapper';
import { RestRessurs, RestStatus } from './api/api-utils';
import Lasteside from './Lasteside/Lasteside';
import Innloggingsside from './Innloggingsside/Innloggingsside';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import Historikkpanel from './Forside/Historikkpanel/Historikkpanel';
import FeilFraAltinnSide from './FeilSider/FeilFraAltinnSide/FeilFraAltinnSide';
import GrafOgTabell from './GrafOgTabell/GrafOgTabell';
import {
    ER_VEDLIKEHOLD_AKTIVERT,
    PATH_FORSIDE,
    PATH_FORSIDE_BARNEHAGE,
    PATH_FORSIDE_GENERELL,
    PATH_HISTORIKK,
    PATH_KALKULATOR_REDIRECT,
} from './konstanter';
import './App.less';
import { sendSidevisningEvent } from './amplitude/events';
import { Forside } from './Forside/Forside';
import { Sammenligningspanel } from './Forside/Sammenligningspanel/Sammenligningspanel';
import { EkspanderbarSammenligning } from './Forside/EkspanderbarSammenligning/EkspanderbarSammenligning';
import { ArbeidsmiljøportalPanel } from './Forside/ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import {
    LegacyBarnehageSammenligningRedirect,
    LegacySammenligningRedirect,
    ManglerRettighetRedirect,
} from './utils/redirects';
import { IaTjenesterMetrikkerContextProvider } from './metrikker/IaTjenesterMetrikkerContext';
import VedlikeholdSide from './FeilSider/Vedlikehold/VedlikeholdSide';
import {
    getEkstradata,
    SykefraværAppData,
    useSykefraværAppData,
} from './hooks/useSykefraværAppData';
import { AnalyticsClient } from './amplitude/client';
import { useAnalytics } from './hooks/useAnalytics';
import { getForebyggeFraværUrl } from './utils/miljøUtils';

interface Props {
    analyticsClient: AnalyticsClient;
    samtalestøttePodlet?: React.ReactNode;
}

const App: FunctionComponent<Props> = ({ analyticsClient, samtalestøttePodlet }) => {
    return (
        <IaTjenesterMetrikkerContextProvider>
            <main id="maincontent">
                <AppContent
                    {...useSykefraværAppData()}
                    analyticsClient={analyticsClient}
                    samtalestøttePodlet={samtalestøttePodlet}
                />
            </main>
        </IaTjenesterMetrikkerContextProvider>
    );
};

export const AppContent = ({
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikk,
    summertSykefravær,
    sykefraværshistorikk,
    virksomhetsdata,
    analyticsClient,
    enhetsregisterdata,
    samtalestøttePodlet,
    aggregertStatistikk,
    publiseringsdatoer,
}: SykefraværAppData & {
    analyticsClient: AnalyticsClient;
    samtalestøttePodlet?: React.ReactNode;
}) => {
    useAnalytics(analyticsClient);

    const datakilder: RestRessurs<any>[] = useMemo(() => {
        return [
            sykefraværshistorikk,
            summertSykefravær,
            virksomhetsdata,
            enhetsregisterdata.restOverordnetEnhet,
            enhetsregisterdata.restUnderenhet,
        ];
    }, [
        sykefraværshistorikk,
        summertSykefravær,
        virksomhetsdata,
        enhetsregisterdata.restOverordnetEnhet,
        enhetsregisterdata.restUnderenhet,
    ]);

    useEffect(() => {
        if (datakilder.every((ressurs) => ressurs.status === RestStatus.Suksess)) {
            const ekstradata = getEkstradata({
                sykefraværshistorikk,
                summertSykefravær,
                virksomhetsdata,
                enhetsregisterdata,
            });
            analyticsClient?.setUserProperties({
                ...ekstradata,
            });
            sendSidevisningEvent();
        }
    }, [
        sykefraværshistorikk,
        summertSykefravær,
        virksomhetsdata,
        enhetsregisterdata,
        datakilder,
        analyticsClient,
    ]);

    const restOrganisasjoner = altinnOrganisasjoner;
    const restOrganisasjonerMedStatistikk = altinnOrganisasjonerMedStatistikk;

    const restSykefraværshistorikk = sykefraværshistorikk;
    const restvirksomhetsdata = virksomhetsdata;

    const restPubliseringsdatoer = publiseringsdatoer;
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
        return <ManglerRettighetRedirect />;
    } else {
        innhold = (
            <Routes>
                <Route
                    path={PATH_FORSIDE_BARNEHAGE}
                    element={<LegacyBarnehageSammenligningRedirect />}
                />
                <Route path={PATH_FORSIDE_GENERELL} element={<LegacySammenligningRedirect />} />
                <Route
                    path={PATH_FORSIDE}
                    element={
                        <>
                            <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                            <InnloggingssideWrapper aggregertStatistikk={aggregertStatistikk}>
                                <Forside>
                                    <Sammenligningspanel
                                        restStatus={aggregertStatistikk.restStatus}
                                        restAltinnOrganisasjoner={restOrganisasjoner}
                                    >
                                        <EkspanderbarSammenligning
                                            aggregertStatistikk={aggregertStatistikk}
                                            restPubliseringsdatoer={restPubliseringsdatoer}
                                        />
                                    </Sammenligningspanel>
                                    <div className={'app__lenkepanelWrapper'}>
                                        <Historikkpanel />
                                        {samtalestøttePodlet}
                                    </div>
                                    <ArbeidsmiljøportalPanel
                                        restvirksomhetsdata={restvirksomhetsdata}
                                    />
                                </Forside>
                            </InnloggingssideWrapper>
                        </>
                    }
                />
                <Route
                    path={PATH_KALKULATOR_REDIRECT}
                    element={<Navigate replace to={getForebyggeFraværUrl() + '/kalkulator'} />}
                />
                <Route
                    path={PATH_HISTORIKK}
                    element={
                        <>
                            <Brødsmulesti gjeldendeSide="historikk" />
                            <GrafOgTabell
                                restSykefraværsstatistikk={restSykefraværshistorikk}
                                restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                            />
                        </>
                    }
                />
            </Routes>
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
