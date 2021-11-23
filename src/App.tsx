import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import Banner from './Banner/Banner';
import { Route } from 'react-router-dom';
import InnloggingssideWrapper from './Forside/InnloggingssideWrapper';
import { RestRessurs, RestStatus } from './api/api-utils';
import Lasteside from './Lasteside/Lasteside';
import Innloggingsside from './Innloggingsside/Innloggingsside';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import KalkulatorPanel from './Forside/Kalkulatorpanel/KalkulatorPanel';
import Historikkpanel from './Forside/Historikkpanel/Historikkpanel';
import FeilFraAltinnSide from './FeilSider/FeilFraAltinnSide/FeilFraAltinnSide';
import GrafOgTabell from './GrafOgTabell/GrafOgTabell';
import {
    ER_VEDLIKEHOLD_AKTIVERT,
    PATH_FORSIDE,
    PATH_FORSIDE_BARNEHAGE,
    PATH_FORSIDE_GENERELL,
    PATH_HISTORIKK,
    PATH_KALKULATOR,
} from './konstanter';
import { sendEventDirekte } from './amplitude/events';
import Kalkulator from './Kalkulator/Kalkulator/Kalkulator';
import { Forside } from './Forside/Forside';
import { Sammenligningspanel } from './Forside/Sammenligningspanel/Sammenligningspanel';
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
import {
    getEkstradata,
    Sykefravarsstatistikk,
    useSykefravarsstatistikk,
} from './hooks/useSykefravarsstatistikk';
import { AnalyticsClient } from './amplitude/client';
import { useAnalytics } from './amplitude/useAnalytics';

interface Props {
    analyticsClient: AnalyticsClient;
}

const App: FunctionComponent<Props> = ({ analyticsClient }) => {
    useAnalytics(analyticsClient);
    return (
        <IaTjenesterMetrikkerContextProvider>
            <main id="maincontent">
                <AppContent {...useSykefravarsstatistikk()} analyticsClient={analyticsClient} />
            </main>
        </IaTjenesterMetrikkerContextProvider>
    );
};

export const AppContent = ({
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikk,
    summertSykefravær,
    fraværshistorikk,
    virksomhetsdata,
    analyticsClient,
    enhetsInformasjon,
}: Sykefravarsstatistikk & {
    analyticsClient?: AnalyticsClient;
}) => {
    const ekstraRessurser: RestRessurs<any>[] = useMemo(() => {
        return [
            fraværshistorikk,
            summertSykefravær,
            virksomhetsdata,
            enhetsInformasjon.restOverordnetEnhet,
            enhetsInformasjon.restUnderenhet,
        ];
    }, [
        fraværshistorikk,
        summertSykefravær,
        virksomhetsdata,
        enhetsInformasjon.restOverordnetEnhet,
        enhetsInformasjon.restUnderenhet,
    ]);

    useEffect(() => {
        if (ekstraRessurser.every((ressurs) => ressurs.status === RestStatus.Suksess)) {
            const ekstradata = getEkstradata({
                fraværshistorikk,
                summertSykefravær,
                virksomhetsdata,
                enhetsInformasjon,
            });
            analyticsClient?.setUserProperties({
                ekstradata,
            });
            console.log('reached here', ekstradata);
            sendEventDirekte('forside', 'sidelastet');
        }
    }, [
        fraværshistorikk,
        summertSykefravær,
        virksomhetsdata,
        enhetsInformasjon,
        ekstraRessurser,
        analyticsClient,
    ]);

    const restOrganisasjoner = altinnOrganisasjoner;
    const restOrganisasjonerMedStatistikk = altinnOrganisasjonerMedStatistikk;

    const restSummertSykefraværshistorikk = summertSykefravær;
    const restSykefraværshistorikk = fraværshistorikk;
    const restvirksomhetsdata = virksomhetsdata;

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
