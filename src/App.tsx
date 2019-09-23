import React from 'react';

import './app.less';
import { Sykefraværprosent, SykefraværprosentProvider } from './SykefraværprosentProvider';
import Banner from './Banner/Banner';
import Forside from './Forside/Forside';

const sykefraværprosent: Sykefraværprosent = { kvartal: 1, land: 5.5 };

const App: React.FC = () => {
    return (
        <div className="app">
            <SykefraværprosentProvider>
                <Banner tekst="Sykefraværsstatistikk" />
                <Forside {...sykefraværprosent} />
            </SykefraværprosentProvider>
        </div>
    );
};

export default App;
