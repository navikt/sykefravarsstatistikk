import React, { FunctionComponent, useContext } from 'react';
import Banner from './Banner/Banner';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import Kalkulator from './Kalkulator/Kalkulator';
import Forside from './Forside/Forside';
import Sammenligningspanel from './Forside/Sammenligningspanel/Sammenligningspanel';
import {
    useRestOrganisasjoner,
    useRestOrganisasjonerMedTilgangTilStatistikk,
} from './api/altinnorganisasjon-api';
import { RestStatus } from './api/api-utils';
import Lasteside from './Lasteside/Lasteside';
import Innloggingsside from './Innloggingsside/Innloggingsside';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import KalkulatorPanel from './Forside/Kalkulatorpanel/KalkulatorPanel';
import VideoerPanel from './Forside/VideoerPanel/VideoerPanel';
import { useRestFeatureToggles } from './api/featureToggles';
import Historikkpanel from './Forside/Historikkpanel/Historikkpanel';
import FeilFraAltinnSide from './FeilSider/FeilFraAltinnSide/FeilFraAltinnSide';
import GrafOgTabell from './GrafOgTabell/GrafOgTabell';
import { RestSykefraværshistorikk } from './api/sykefraværshistorikk';
import { RestBedriftsmetrikker } from './api/bedriftsmetrikker';
import IAWebRedirectPanel from './IAWebRedirectSide/IAWebRedirectPanel';
import IAWebRedirectSide from './IAWebRedirectSide/IAWebRedirectSide';
import { BASE_PATH } from './konstanter';
import {
    bedriftsmetrikkerContext,
    BedriftsmetrikkerProvider,
} from './utils/bedriftsmetrikkerContext';
import { sendEventDirekte } from './amplitude/amplitude';
import {
    sykefraværshistorikkContext,
    SykefraværshistorikkProvider,
} from './utils/sykefraværshistorikkContext';

export const PATH_FORSIDE = '/';
export const PATH_KALKULATOR = '/kalkulator';
export const PATH_HISTORIKK = '/historikk';
export const PATH_IAWEB_REDIRECTSIDE = '/iawebredirectside';

const App: FunctionComponent = () => {
    sendEventDirekte('forside', 'sidelastet');
    return (
        <BrowserRouter basename={BASE_PATH}>
            <BedriftsmetrikkerProvider>
                <SykefraværshistorikkProvider>
                    <AppContent />
                </SykefraværshistorikkProvider>
            </BedriftsmetrikkerProvider>
        </BrowserRouter>
    );
};

const AppContent: FunctionComponent = () => {
    const restOrganisasjoner = useRestOrganisasjoner();
    const restOrganisasjonerForStatistikk = useRestOrganisasjonerMedTilgangTilStatistikk();
    const restSykefraværshistorikk = useContext<RestSykefraværshistorikk>(
        sykefraværshistorikkContext
    );
    const restFeatureToggles = useRestFeatureToggles();
    const restBedriftsmetrikker = useContext<RestBedriftsmetrikker>(bedriftsmetrikkerContext);
    const location = useLocation();
    let innhold;
    if (
        restOrganisasjoner.status === RestStatus.LasterInn ||
        restFeatureToggles.status === RestStatus.LasterInn ||
        restBedriftsmetrikker.status === RestStatus.LasterInn
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
    } else {
        const skalViseGraf = restFeatureToggles.data['arbeidsgiver.lanser-graf'];
        innhold = (
            <>
                <Route path={PATH_FORSIDE} exact={true}>
                    <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                    <Forside
                        restSykefraværshistorikk={restSykefraværshistorikk}
                        restOrganisasjonerForStatistikk={restOrganisasjonerForStatistikk}
                    >
                        <Sammenligningspanel restSykefraværshistorikk={restSykefraværshistorikk} />
                        <KalkulatorPanel />
                        {skalViseGraf && <Historikkpanel />}
                        <VideoerPanel visNyttDesign={skalViseGraf} />
                    </Forside>
                </Route>
                <Route path={PATH_KALKULATOR} exact={true}>
                    <Brødsmulesti gjeldendeSide="kalkulator" />
                    <Kalkulator restSykefraværshistorikk={restSykefraværshistorikk} />
                </Route>
                {skalViseGraf && (
                    <Route path={PATH_HISTORIKK} exact={true}>
                        <Brødsmulesti gjeldendeSide="historikk" />
                        <GrafOgTabell
                            restSykefraværsstatistikk={restSykefraværshistorikk}
                            restOrganisasjonerForStatistikk={restOrganisasjonerForStatistikk}
                        />
                    </Route>
                )}
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
