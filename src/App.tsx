import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { NotifikasjonWidgetProvider } from '@navikt/arbeidsgiver-notifikasjon-widget';
import Banner from './Banner/Banner';
import { Route, Routes } from 'react-router-dom';
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
    MILJØ,
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
    KalkulatorRedirect,
    LegacyBarnehageSammenligningRedirect,
    LegacySammenligningRedirect,
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
import { RestVirksomhetsdata } from './api/virksomhetsdata-api';
import Samtalestøttepanel from './Forside/Samtalestøttepanel/Samtalestøttepanel';
import { getMiljø } from './utils/miljøUtils';


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
    restvirksomhetsdata: RestVirksomhetsdata
) {
    return (
        restOrganisasjoner.status === RestStatus.LasterInn ||
        restvirksomhetsdata.status === RestStatus.LasterInn
    );
}

export const AppContent = ({
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikk,
    summertSykefravær,
    sykefraværshistorikk,
    virksomhetsdata,
    analyticsClient,
    enhetsregisterdata,
    aggregertStatistikk,
    publiseringsdatoer,
}: SykefraværAppData & {
    analyticsClient: AnalyticsClient;
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
    }

    if (dataLastesInn(restOrganisasjoner, restvirksomhetsdata)) {
        innhold = <Lasteside />;
    }

    if (restOrganisasjoner.status === RestStatus.IkkeInnlogget) {
        return <Innloggingsside redirectUrl={window.location.href} />;
    }

    if (restOrganisasjoner.status !== RestStatus.Suksess) {
        innhold = <FeilFraAltinnSide />;
    }

    if (brukerHarIkkeTilgangTilNoenOrganisasjoner) {
        return <ManglerRettighetRedirect />;
    }

    innhold = (
        <Routes>
            <Route
                path={PATH_FORSIDE_BARNEHAGE}
                element={<LegacyBarnehageSammenligningRedirect />}
            />
            <Route path={PATH_FORSIDE_GENERELL} element={<LegacySammenligningRedirect />} />
            <Route path={PATH_KALKULATOR_REDIRECT} element={<KalkulatorRedirect />} />
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
                                    <Samtalestøttepanel />
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

    return (
        <NotifikasjonWidgetProvider
            miljo={getMiljø() === MILJØ.PROD ? 'prod' : 'dev'}
            apiUrl="/sykefravarsstatistikk/notifikasjon-bruker-api"
        >
            {<Banner tittel="Sykefraværsstatistikk" restOrganisasjoner={restOrganisasjoner} />}
            {innhold}
        </NotifikasjonWidgetProvider>
    );
};

export default App;
