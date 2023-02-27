import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import { getMiljø } from './utils/miljøUtils';
import { BASE_PATH } from './konstanter';
import { BrowserRouter } from 'react-router-dom';
import { amplitudeClient } from './amplitude/client';
import '@navikt/ds-css';
import {  startMockServiceWorker } from "./api/localMocking/config";

async function main() {
    if (process.env.REACT_APP_MOCK || getMiljø() === 'labs-gcp') {
        await startMockServiceWorker()
    }

    ReactDOM.render(
        <BrowserRouter basename={BASE_PATH}>
            <App analyticsClient={amplitudeClient} />
        </BrowserRouter>,
        document.getElementById('root')
    );
}

main();
