import 'core-js';
import 'core-js/es/array/to-reversed';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BASE_PATH, MILJØ } from './konstanter';
import { BrowserRouter } from 'react-router-dom';
import { amplitudeClient } from './amplitude/client';
import '@navikt/ds-css';
import { startMockServiceWorker } from './api/localMocking/config';
import { getEnvironmentContext } from './Context/EnvironmentContext';
import { doInitializeFaro } from './utils/faroUtils';

async function main(): Promise<void> {
    const { MILJØ: miljø, GRAFANA_AGENT_COLLECTOR_URL } = getEnvironmentContext();
    doInitializeFaro(GRAFANA_AGENT_COLLECTOR_URL);
    if (process.env.REACT_APP_MOCK || miljø === MILJØ.DEV_EKSTERN) {
        await startMockServiceWorker();
    }

    const container = document.getElementById('root');
    const root = createRoot(container!);

    root.render(
        <BrowserRouter basename={BASE_PATH}>
            <App analyticsClient={amplitudeClient} />
        </BrowserRouter>
    );
}

main().then(/*main returnerer ingenting*/);
