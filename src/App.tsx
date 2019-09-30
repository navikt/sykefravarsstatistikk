import React from 'react';

import './app.less';
import { SammenligningProvider } from './SammenligningProvider';
import Banner from './Banner/Banner';
import Forside from './Forside/Forside';
import { BrowserRouter, Route } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <div className="app">
            <SammenligningProvider>
                <BrowserRouter basename={'/sykefravarsstatistikk'}>
                    <Banner tekst="Sykefraværsstatistikk" />
                    <Route path="/" exact={true} component={Forside}/>
                </BrowserRouter>
            </SammenligningProvider>
        </div>
    );
};

export default App;
