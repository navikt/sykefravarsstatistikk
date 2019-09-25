import React from 'react';

import './app.less';
import {SammenligningProvider} from './SammenligningProvider';
import Banner from './Banner/Banner';
import Forside from './Forside/Forside';

const App: React.FC = () => {
    return (
        <div className="app">
            <SammenligningProvider>
                <Banner tekst="Sykefraværsstatistikk" />
                <Forside/>
            </SammenligningProvider>
        </div>
    );
};

export default App;
