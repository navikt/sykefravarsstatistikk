import React, { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import Banner from './Banner/Banner';
import { Route } from 'react-router-dom';
import InnloggingssideWrapper from './Forside/InnloggingssideWrapper';
import { RestStatus } from './api/api-utils';
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
import { amplitudeClient } from './amplitude/client';
import { Sykefravarsstatistikk, useSykefravarsstatistikk } from './hooks/useSykefravarsstatistikk';
import { useOrgnr } from './hooks/useOrgnr';

const App: FunctionComponent = () => {
    sendEventDirekte('forside', 'sidelastet');
    return (
        <OrgNrProvider>
            <IaTjenesterMetrikkerContextProvider>
                <main id="maincontent">
                    <AppContent {...useSykefravarsstatistikk()} />
                </main>
            </IaTjenesterMetrikkerContextProvider>
        </OrgNrProvider>
    );
};

export const orgnrContext = createContext<string>('');
export function OrgNrProvider({ children }: { children: React.ReactNode }) {
    const orgnr = useOrgnr();
    return <orgnrContext.Provider value={orgnr ?? ''}>{children}</orgnrContext.Provider>;
}

const AppContent = ({
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikk,
    summertSykefravær,
    fraværshistorikk,
    virksomhetsdata,
}: Sykefravarsstatistikk) => {
    const orgnr = useContext(orgnrContext);
    if (orgnr) {
        amplitudeClient.setUserProperties({ 'orgnr: ': orgnr });
    }

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
