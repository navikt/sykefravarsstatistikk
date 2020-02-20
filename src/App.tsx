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
import Graf from './GrafOgTabell/Graf/Graf';
import { useRestFeatureToggles } from './api/featureToggles';
import Historikkpanel from './Forside/Historikkpanel/Historikkpanel';
import { useRestSykefraværshistorikk } from './api/sykefraværshistorikk';
import Tabell from './GrafOgTabell/Tabell/Tabell';

export const PATH_FORSIDE = '/';
export const PATH_KALKULATOR = '/kalkulator';
export const PATH_HISTORIKK = '/historikk';

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
    const restSykefraværshistorikk = useRestSykefraværshistorikk(orgnr);

    const restFeatureToggles = useRestFeatureToggles('arbeidsgiver.lanser-graf');
    if (
        restOrganisasjonstre.status === RestStatus.LasterInn ||
        restFeatureToggles.status === RestStatus.LasterInn
    ) {
        return <Lasteside />;
    } else if (restOrganisasjonstre.status === RestStatus.IkkeInnlogget) {
        return <IkkeInnloggetSide />;
    }

    const skalViseGraf = restFeatureToggles.data['arbeidsgiver.lanser-graf'];

    return (
        <>
            <Banner tittel="Sykefraværsstatistikk" restOrganisasjonstre={restOrganisasjonstre} />
            <Route path={PATH_FORSIDE} exact={true}>
                <Brødsmulesti gjeldendeSide="sykefraværsstatistikk" />
                <Forside restSammenligning={restSammenligning}>
                    <Infopanel />
                    <LegemeldtSykefraværPanel restSammenligning={restSammenligning} />
                    <KalkulatorPanel />
                    {skalViseGraf && <Historikkpanel />}
                    <VideoerPanel visNyttDesign={skalViseGraf} />
                    <IAwebpanel />
                </Forside>
            </Route>
            <Route path={PATH_KALKULATOR} exact={true}>
                <Brødsmulesti gjeldendeSide="kalkulator" />
                <Kalkulator defaultTapteDagsverk={restTapteDagsverk} />
            </Route>
            {skalViseGraf && (
                <Route path={PATH_HISTORIKK} exact={true}>
                    <Brødsmulesti gjeldendeSide="historikk" />
                    <Tabell restSykefraværsstatistikk={restSykefraværshistorikk}/>
                    <Graf />
                </Route>
            )}
        </>
    );
};

export default App;
