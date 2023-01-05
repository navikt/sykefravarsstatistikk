const path = require('path');
const express = require('express');
const getDecorator = require('./decorator');
const mustacheExpress = require('mustache-express');
const sykefraværsstatistikkApiProxy = require('./proxy');
const iaTjenesterMetrikkerProxy = require('./iaTjenesterMetrikkerProxy');
const { BASE_PATH } = require('./konstanter');
const buildPath = path.join(__dirname, '../build');
const dotenv = require('dotenv');
const { initIdporten } = require('./idporten');
const { initTokenX } = require('./tokenx');
const cookieParser = require('cookie-parser');
const { createNotifikasjonBrukerApiProxyMiddleware } = require('./brukerapi-proxy-middleware');
const log = require('./logging');
const contentHeaders= require('./contentHeaders')

const { NAIS_CLUSTER_NAME = 'local', APP_INGRESS, LOGIN_URL, PORT = 3000 } = process.env;

const app = express();

dotenv.config();

app.use(cookieParser());
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);

const renderAppMedDecorator = (decoratorFragments) => {
    return new Promise((resolve, reject) => {
        app.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });
};

const startServer = async (html) => {
    log.info('Starting server: server.js');

    await Promise.all([initIdporten(), initTokenX()]);

    app.disable('x-powered-by');
    app.use(contentHeaders);

    app.use(BASE_PATH + '/', express.static(buildPath, { index: false }));

    app.get(`${BASE_PATH}/redirect-til-login`, (req, res) => {
        const referrerUrl = `${APP_INGRESS}/success?redirect=${req.query.redirect}`;
        res.redirect(BASE_PATH + `/oauth2/login?redirect=${referrerUrl}`);
    });

    app.get(`${BASE_PATH}/success`, (req, res) => {
        const loginserviceToken = req.cookies['selvbetjening-idtoken'];
        if (loginserviceToken && req.query.redirect.startsWith(APP_INGRESS)) {
            res.redirect(req.query.redirect);
        } else if (req.query.redirect.startsWith(APP_INGRESS)) {
            res.redirect(`${LOGIN_URL}${req.query.redirect}`);
        } else {
            res.redirect(`${LOGIN_URL}${APP_INGRESS}`);
        }
    });

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.use(sykefraværsstatistikkApiProxy);
    app.use(iaTjenesterMetrikkerProxy);

    if (NAIS_CLUSTER_NAME === 'labs-gcp') {
        const {
            applyNotifikasjonMockMiddleware,
        } = require('@navikt/arbeidsgiver-notifikasjoner-brukerapi-mock');
        applyNotifikasjonMockMiddleware({
            app,
            path: '/sykefravarsstatistikk/notifikasjon-bruker-api',
        });
    } else {
        app.use(
            '/sykefravarsstatistikk/notifikasjon-bruker-api',
            createNotifikasjonBrukerApiProxyMiddleware({ log })
        );
    }

    app.get(BASE_PATH, (req, res) => {
        res.send(html);
    });

    app.get(BASE_PATH + '/*', (req, res) => {
        res.send(html);
    });

    app.listen(PORT, () => {
        log.info('Server listening on port', PORT);
    });
};

getDecorator()
    .then(renderAppMedDecorator, (error) => {
        log.error('Kunne ikke hente dekoratør ', error);
        process.exit(1);
    })
    .then(startServer, (error) => {
        log.error('Kunne ikke rendre app ', error);
        process.exit(1);
    });
