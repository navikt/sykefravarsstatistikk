import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/browser';
import './index.less';
import { getMiljø } from './utils/miljøUtils';

if (process.env.REACT_APP_MOCK || process.env.REACT_APP_HEROKU || getMiljø() === 'labs-gcp') {
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

ReactDOM.render(<App />, document.getElementById('root'));
