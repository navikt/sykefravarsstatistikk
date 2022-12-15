import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/browser';
import './index.less';
import { getMiljø } from './utils/miljøUtils';
import { BASE_PATH, MILJØ } from './konstanter';
import { BrowserRouter } from 'react-router-dom';
import { amplitudeClient } from './amplitude/client';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import SamtalestøttePodletpanel from './Forside/Samtalestøttepanel/SamtalestøttePodletpanel';

if (process.env.REACT_APP_MOCK || getMiljø() === 'labs-gcp') {
    console.log('========================================');
    console.log('=============== MED MOCK ===============');
    console.log('===DETTE SKAL DU IKKE SE I PRODUKSJON===');
    console.log('========================================');
    require('./mocking/mock');
}

Sentry.init({
    dsn: 'https://c4ef091d1fb54f01a7f808e621b28948@sentry.gc.nav.no/13',
    environment: getMiljø(),
    enabled: getMiljø() !== 'local',
});

injectDecoratorClientSide({
    env: getMiljø() === MILJØ.PROD ? 'prod' : 'dev',
    context: 'arbeidsgiver',
    redirectToApp: true,
    level: 'Level4',
}).catch(Sentry.captureException);

ReactDOM.render(
    <BrowserRouter basename={BASE_PATH}>
        <App analyticsClient={amplitudeClient} samtalestøttePodlet={<SamtalestøttePodletpanel />} />
    </BrowserRouter>,
    document.getElementById('root')
);
