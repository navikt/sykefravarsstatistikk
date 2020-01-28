import React, { FunctionComponent } from 'react';
import Banner from './Banner/Banner';
import { BrowserRouter, Route } from 'react-router-dom';
import { OrganisasjonstreProvider } from './OrganisasjonstreProvider/OrganisasjonstreProvider';
import { BASE_PATH } from './server/konstanter';
import ForsideEllerFeilside from './ForsideEllerFeil/ForsideEllerFeilside';
import { useRestTapteDagsverk } from './api/tapteDagsverk';
import { useOrgnr } from './utils/orgnr-hook';
import Kalkulator from './Kalkulator/Kalkulator';
import { useRestSammenligning } from './api/sammenligning';
import Forside from "./Forside/Forside";
import Infopanel from "./Forside/Infopanel/Infopanel";
import LegemeldtSykefraværPanel from "./Forside/Legemeldtsykefraværpanel/LegemeldtSykefraværPanel";
import IAwebpanel from "./Forside/IAwebpanel/IAwebpanel";

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

    const restTapteDagsverk = useRestTapteDagsverk(orgnr);
    const restSammenligning = useRestSammenligning(orgnr);

    return (
        <OrganisasjonstreProvider>
            <Banner tekst="Sykefraværsstatistikk" />
            <Route path={PATH_FORSIDE} exact={true}>
                <ForsideEllerFeilside restSammenligning={restSammenligning}>
                    <Forside>
                        <Infopanel />
                        <LegemeldtSykefraværPanel restSammenligning={restSammenligning}/>
                        <IAwebpanel />
                    </Forside>
                </ForsideEllerFeilside>
            </Route>
            <Route path={PATH_KALKULATOR} exact={true}>
                <Kalkulator defaultTapteDagsverk={restTapteDagsverk} />
            </Route>
        </OrganisasjonstreProvider>
    );
};

export default App;
