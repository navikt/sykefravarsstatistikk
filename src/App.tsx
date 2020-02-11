import React, { FunctionComponent } from 'react';
import Banner from './Banner/Banner';
import { BrowserRouter, Route } from 'react-router-dom';
import { BASE_PATH } from './server/konstanter';
import { useRestTapteDagsverk } from './api/tapteDagsverk';
import { useOrgnr } from './utils/orgnr-hook';
import Kalkulator from './Kalkulator/Kalkulator';
import { useRestSammenligning } from './api/sammenligning';
import Forside from './Forside/Forside';
import Infopanel from './Forside/Infopanel/Infopanel';
import LegemeldtSykefraværPanel from './Forside/Legemeldtsykefraværpanel/LegemeldtSykefraværPanel';
import IAwebpanel from './Forside/IAwebpanel/IAwebpanel';
import { useRestOrganisasjonstre } from './api/organisasjonstre/organisasjonstre-api';
import { RestStatus } from './api/api-utils';
import Lasteside from './Lasteside/Lasteside';
import IkkeInnloggetSide from './FeilSider/IkkeInnloggetSide/IkkeInnloggetSide';
import Brødsmulesti from './Brødsmulesti/Brødsmulesti';
import KalkulatorPanel from './Forside/Kalkulatorpanel/KalkulatorPanel';
import VideoerPanel from './Forside/VideoerPanel/VideoerPanel';
import { useRestFeatureToggles } from './api/featureToggles';

export const PATH_FORSIDE = '/';
export const PATH_KALKULATOR = '/kalkulator';

const App: FunctionComponent = () => {
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
    const restSammenligning = useRestSammenligning(orgnr);

    const featureToggles = useRestFeatureToggles();
    console.log('toggles', featureToggles);

    if (restOrganisasjonstre.status === RestStatus.LasterInn) {
        return <Lasteside />;
    } else if (restOrganisasjonstre.status === RestStatus.IkkeInnlogget) {
        return <IkkeInnloggetSide />;
    }

    return (
        <>
            <Banner tittel="Sykefraværsstatistikk" restOrganisasjonstre={restOrganisasjonstre} />
            <Route path={PATH_FORSIDE} exact={true}>
                <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                <Forside restSammenligning={restSammenligning}>
                    <Infopanel />
                    <LegemeldtSykefraværPanel restSammenligning={restSammenligning} />
                    <KalkulatorPanel />
                    <VideoerPanel />
                    <IAwebpanel />
                </Forside>
            </Route>
            <Route path={PATH_KALKULATOR} exact={true}>
                <Brødsmulesti gjeldendeSide="kalkulator" />
                <Kalkulator defaultTapteDagsverk={restTapteDagsverk} />
            </Route>
        </>
    );
};

export default App;
