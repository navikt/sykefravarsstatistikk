import React from 'react';
import {SammenligningProvider} from './SammenligningProvider';
import Banner from './Banner/Banner';
import {BrowserRouter, Route} from 'react-router-dom';
import {OrganisasjonstreProvider} from './OrganisasjonstreProvider/OrganisasjonstreProvider';
import {BASE_PATH} from './server/konstanter';
import './app.less';
import LoginBoundary from "./LoginBoundary";
import ForsideEllerFeilside from "./ForsideEllerFeil/ForsideEllerFeilside";

const App: React.FC = () => {
    return (
        <div className="app">
            <LoginBoundary>
                <OrganisasjonstreProvider>
                    <BrowserRouter basename={BASE_PATH}>
                        <SammenligningProvider>
                            <Banner tekst="Sykefraværsstatistikk"/>
                            <Route path="/" exact={true} component={ForsideEllerFeilside}/>
                        </SammenligningProvider>
                    </BrowserRouter>
                </OrganisasjonstreProvider>
            </LoginBoundary>
        </div>
    );
};

export default App;
