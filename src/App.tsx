import React from 'react';
import { SammenligningProvider } from './SammenligningProvider';
import Banner from './Banner/Banner';
import Forside from './Forside/Forside';
import { BrowserRouter, Route } from 'react-router-dom';
import { OrganisasjonstreProvider } from './OrganisasjonstreProvider/OrganisasjonstreProvider';
import { BASE_PATH } from './server/konstanter';
import './app.less';

const App: React.FC = () => {
    return (
        <div className="app">
            <OrganisasjonstreProvider>
                <BrowserRouter basename={BASE_PATH}>
                    <SammenligningProvider>
                        <Banner tekst="Sykefraværsstatistikk" />
                        <Route path="/" exact={true} component={Forside} />
                    </SammenligningProvider>
                </BrowserRouter>
            </OrganisasjonstreProvider>
        </div>
    );
};

export default App;
