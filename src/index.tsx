import 'core-js';
import 'core-js/es/array/to-reversed';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import { BASE_PATH, MILJØ } from './konstanter';
import { BrowserRouter } from 'react-router-dom';
import { amplitudeClient } from './amplitude/client';
import '@navikt/ds-css';
import { startMockServiceWorker } from './api/localMocking/config';
import { getEnvironmentContext } from './Context/EnvironmentContext';

async function main() {
    const { MILJØ: miljø } = getEnvironmentContext();
    if (process.env.REACT_APP_MOCK || miljø === MILJØ.DEV_EKSTERN) {
        await startMockServiceWorker();
    }

    ReactDOM.render(
        <BrowserRouter basename={BASE_PATH}>
            <App analyticsClient={amplitudeClient} />
        </BrowserRouter>,
        document.getElementById('root')
    );
}

main();
