import React from 'react';

import './app.less';
import { SammenligningProvider } from './SammenligningProvider';
import Banner from './Banner/Banner';
import Forside from './Forside/Forside';
import { BrowserRouter, Route } from 'react-router-dom';
import { OrganisasjonstreProvider } from './OrganisasjonstreProvider';

const App: React.FC = () => {
    return (
        <div className="app">
            <OrganisasjonstreProvider>
                <SammenligningProvider>
                    <BrowserRouter basename={'/sykefravarsstatistikk'}>
                        <Banner tekst="Sykefraværsstatistikk" />
                        <Route path="/" exact={true} component={Forside} />
                    </BrowserRouter>
                </SammenligningProvider>
            </OrganisasjonstreProvider>
        </div>
    );
};

export default App;
