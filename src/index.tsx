import 'core-js';
import 'core-js/es/array/to-reversed';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BASE_PATH, MILJØ } from './konstanter';
import { BrowserRouter, Routes as ReactRouterDomRoutes } from 'react-router-dom';
import { amplitudeClient } from './amplitude/client';
import '@navikt/ds-css';
import { startMockServiceWorker } from './api/localMocking/config';
import { getEnvironmentContext } from './Context/EnvironmentContext';
import { doInitializeFaro } from './utils/faroUtils';
import { FaroRoutes } from '@grafana/faro-react';

async function main(): Promise<void> {
    const { MILJØ: miljø, GRAFANA_AGENT_COLLECTOR_URL } = getEnvironmentContext();
    const shouldUseFaro = GRAFANA_AGENT_COLLECTOR_URL?.length > 0;
    if (shouldUseFaro) {
        doInitializeFaro(GRAFANA_AGENT_COLLECTOR_URL, miljø);
    }
    if (process.env.REACT_APP_MOCK || miljø === MILJØ.DEV_EKSTERN) {
        await startMockServiceWorker();
    }

    const container = document.getElementById('root');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const root = createRoot(container!);

    root.render(
        <BrowserRouter basename={BASE_PATH}>
            <App
                analyticsClient={amplitudeClient}
                RoutesComponent={shouldUseFaro ? FaroRoutes : ReactRouterDomRoutes}
            />
        </BrowserRouter>
    );
}

main().then(/*main returnerer ingenting*/);
