import React from 'react';

import './app.less';
import {SykefraværprosentProvider} from './SykefraværprosentProvider';
import Banner from "./Banner/Banner";
import Forside from "./Forside/Forside";

const App: React.FC = () => {
    return (
        <div className="app">
            <SykefraværprosentProvider>
                <Banner tekst="Sykefraværsstatistikk" />
                <Forside/>
            </SykefraværprosentProvider>
        </div>
    );
};

export default App;
