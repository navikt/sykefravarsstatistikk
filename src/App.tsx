import React from 'react';

import './app.less';
import Lenke from 'nav-frontend-lenker';
import { Element } from 'nav-frontend-typografi';
import { SykefraværprosentProvider } from './SykefraværprosentProvider';
import { Statistikk } from './Statistikk';

const App: React.FC = () => {
    return (
        <div className="app">
            <SykefraværprosentProvider>
                <div className="stuff">
                    <Lenke href={'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/'}>
                        Min side arbeidsgiver
                    </Lenke>{' '}
                    > <Element> Sykefraværsstatistikk </Element>
                </div>
                <h1 className="tittel">Dette er sykefraværsstatistikk</h1>
                <Statistikk />
            </SykefraværprosentProvider>
        </div>
    );
};

export default App;
