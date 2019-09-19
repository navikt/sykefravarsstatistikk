import React from 'react';

import './app.less';
import {SykefraværprosentProvider} from './SykefraværprosentProvider';
import Banner from "./Banner/Banner";

const App: React.FC = () => {
    return (
        <div className="app">
            <SykefraværprosentProvider>
                <Banner tekst="Sykefraværsstatistikk" />
            </SykefraværprosentProvider>
        </div>
    );
};

export default App;
