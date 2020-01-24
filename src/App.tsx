import React from 'react';
import { SammenligningProvider } from './SammenligningProvider';
import Banner from './Banner/Banner';
import { BrowserRouter, Route } from 'react-router-dom';
import { OrganisasjonstreProvider } from './OrganisasjonstreProvider/OrganisasjonstreProvider';
import { BASE_PATH } from './server/konstanter';
import ForsideEllerFeilside from './ForsideEllerFeil/ForsideEllerFeilside';
import KalkulatorWrapper from './Kalkulator/KalkulatorWrapper';

export const PATH_FORSIDE = '/';
export const PATH_KALKULATOR = '/kalkulator';

const App: React.FC = () => {
    return (
        <OrganisasjonstreProvider>
            <BrowserRouter basename={BASE_PATH}>
                <SammenligningProvider>
                    <Banner tekst="Sykefraværsstatistikk" />
                    <Route path={PATH_FORSIDE} exact={true} component={ForsideEllerFeilside} />
                    <Route path={PATH_KALKULATOR} exact={true} component={KalkulatorWrapper} />
                </SammenligningProvider>
            </BrowserRouter>
        </OrganisasjonstreProvider>
    );
};

export default App;
