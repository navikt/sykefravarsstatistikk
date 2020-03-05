import React, { FunctionComponent } from 'react';
import Banner from './Banner/Banner';
import { BrowserRouter, Route } from 'react-router-dom';
import { BASE_PATH } from './server/konstanter';
import { useRestTapteDagsverk } from './api/tapteDagsverk';
import { useOrgnr } from './utils/orgnr-hook';
import Kalkulator from './Kalkulator/Kalkulator';
import Forside from './Forside/Forside';
import Infopanel from './Forside/Infopanel/Infopanel';
import Sammenligningspanel from './Forside/Sammenligningspanel/Sammenligningspanel';
import IAwebpanel from './Forside/IAwebpanel/IAwebpanel';
import { useRestOrganisasjonstre } from './api/organisasjonstre/organisasjonstre-api';
import { RestStatus } from './api/api-utils';
import Lasteside from './Lasteside/Lasteside';
import IkkeInnloggetSide from './FeilSider/IkkeInnloggetSide/IkkeInnloggetSide';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import KalkulatorPanel from './Forside/Kalkulatorpanel/KalkulatorPanel';
import VideoerPanel from './Forside/VideoerPanel/VideoerPanel';
import { useRestFeatureToggles } from './api/featureToggles';
import Historikkpanel from './Forside/Historikkpanel/Historikkpanel';
import FeilFraAltinnSide from './FeilSider/FeilFraAltinnSide/FeilFraAltinnSide';
import GrafOgTabell from './GrafOgTabell/GrafOgTabell';
import { useRestSykefraværshistorikk } from './api/sykefraværshistorikk';
import amplitude from './utils/amplitude';

export const PATH_FORSIDE = '/';
export const PATH_KALKULATOR = '/kalkulator';
export const PATH_HISTORIKK = '/historikk';

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

    const restOrganisasjonstre = useRestOrganisasjonstre();
    const restTapteDagsverk = useRestTapteDagsverk(orgnr);
    const restSykefraværshistorikk = useRestSykefraværshistorikk(orgnr);
    const restFeatureToggles = useRestFeatureToggles();

    let innhold;

    if (
        restOrganisasjonstre.status === RestStatus.LasterInn ||
        restFeatureToggles.status === RestStatus.LasterInn
    ) {
        innhold = <Lasteside />;
    } else if (restOrganisasjonstre.status === RestStatus.IkkeInnlogget) {
        innhold = <IkkeInnloggetSide />;
    } else if (restOrganisasjonstre.status !== RestStatus.Suksess) {
        innhold = <FeilFraAltinnSide />;
    } else {
        const skalViseGraf = restFeatureToggles.data['arbeidsgiver.lanser-graf'];
        innhold = (
            <>
                <Route path={PATH_FORSIDE} exact={true}>
                    <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                    <Forside restSykefraværshistorikk={restSykefraværshistorikk}>
                        <Infopanel />
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
            </>
        );
    }

    return (
        <>
            <Banner tittel="Sykefraværsstatistikk" restOrganisasjonstre={restOrganisasjonstre} />
            {innhold}
        </>
    );
};

export default App;
