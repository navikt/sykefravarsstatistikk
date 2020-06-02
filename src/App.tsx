import React, { FunctionComponent } from 'react';
import Banner from './Banner/Banner';
import { BrowserRouter, Route } from 'react-router-dom';
import { BASE_PATH } from './server/konstanter';
import { useOrgnr } from './utils/orgnr-hook';
import Kalkulator from './Kalkulator/Kalkulator';
import Forside from './Forside/Forside';
import Sammenligningspanel from './Forside/Sammenligningspanel/Sammenligningspanel';
import IAwebpanel from './Forside/IAwebpanel/IAwebpanel';
import { useRestOrganisasjoner } from './api/altinnorganisasjon/altinnorganisasjon-api';
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
import { useRestSykefraværshistorikk } from './api/sykefraværshistorikk';
import amplitude from './utils/amplitude';
import { trackBedriftsmetrikker, useRestBedriftsmetrikker } from './api/bedriftsmetrikker';
import IAWebRedirectPanel from './IAWebRedirectSide/IAWebRedirectPanel';
import IAWebRedirectSide from './IAWebRedirectSide/IAWebRedirectSide';

export const PATH_FORSIDE = '/';
export const PATH_KALKULATOR = '/kalkulator';
export const PATH_HISTORIKK = '/historikk';
export const PATH_IAWEB_REDIRECTSIDE = '/iawebredirectside';

const App: FunctionComponent = () => {
    amplitude.logEvent('#sykefravarsstatistikk-forside-sidelastet');
    return (
        <BrowserRouter basename={BASE_PATH}>
            <AppContent />
        </BrowserRouter>
    );
};

const AppContent: FunctionComponent = () => {
    const orgnr = useOrgnr();

    const restOrganisasjoner = useRestOrganisasjoner();
    const restSykefraværshistorikk = useRestSykefraværshistorikk(orgnr);
    const restFeatureToggles = useRestFeatureToggles();
    const restBedriftsmetrikker = useRestBedriftsmetrikker(orgnr);

    let innhold;

    if (
        restOrganisasjoner.status === RestStatus.LasterInn ||
        restFeatureToggles.status === RestStatus.LasterInn ||
        restBedriftsmetrikker.status === RestStatus.LasterInn
    ) {
        innhold = <Lasteside />;
    } else if (restOrganisasjoner.status === RestStatus.IkkeInnlogget) {
        return <Innloggingsside />;
    } else if (restOrganisasjoner.status !== RestStatus.Suksess) {
        innhold = <FeilFraAltinnSide />;
    } else {
        if (
            restBedriftsmetrikker.status === RestStatus.Suksess &&
            restSykefraværshistorikk.status === RestStatus.Suksess
        ) {
            trackBedriftsmetrikker(restBedriftsmetrikker.data, restSykefraværshistorikk.data);
        }
        const skalViseGraf = restFeatureToggles.data['arbeidsgiver.lanser-graf'];
        innhold = (
            <>
                <Route path={PATH_FORSIDE} exact={true}>
                    <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                    <Forside restSykefraværshistorikk={restSykefraværshistorikk}>
                        <Sammenligningspanel restSykefraværshistorikk={restSykefraværshistorikk} />
                        <KalkulatorPanel />
                        {skalViseGraf && <Historikkpanel />}
                        <VideoerPanel visNyttDesign={skalViseGraf} />
                        <IAwebpanel />
                    </Forside>
                </Route>
                <Route path={PATH_KALKULATOR} exact={true}>
                    <Brødsmulesti gjeldendeSide="kalkulator" />
                    <Kalkulator restSykefraværshistorikk={restSykefraværshistorikk} />
                </Route>
                {skalViseGraf && (
                    <Route path={PATH_HISTORIKK} exact={true}>
                        <Brødsmulesti gjeldendeSide="historikk" />
                        <GrafOgTabell restSykefraværsstatistikk={restSykefraværshistorikk} />
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
            <Banner tittel="Sykefraværsstatistikk" restOrganisasjoner={restOrganisasjoner} />
            {innhold}
        </>
    );
};

export default App;
