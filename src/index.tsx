import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/browser';
import './index.less';
import { getMiljø } from './utils/miljøUtils';
import { BASE_PATH } from './konstanter';
import { BrowserRouter } from 'react-router-dom';
import { amplitudeClient } from './amplitude/client';
import '@navikt/ds-css';

async function main() {
    if (process.env.REACT_APP_MOCK || getMiljø() === 'labs-gcp') {
        if (window.location.pathname === '/sykefravarsstatistikk') {
            window.location.pathname = '/sykefravarsstatistikk/'
            return
        }
        const { worker } = require('./mocking/browser');
        await worker.start({
            serviceWorker: {
                url: '/sykefravarsstatistikk/mockServiceWorker.js',
            },
        })
    }

    Sentry.init({
        dsn: 'https://c4ef091d1fb54f01a7f808e621b28948@sentry.gc.nav.no/13',
        environment: getMiljø(),
        enabled: getMiljø() !== 'local',
    });

    ReactDOM.render(
        <BrowserRouter basename={BASE_PATH}>
            <App analyticsClient={amplitudeClient} />
        </BrowserRouter>,
        document.getElementById('root')
    );
}

main()
