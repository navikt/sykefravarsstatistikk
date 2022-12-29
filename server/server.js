const path = require('path');
const express = require('express');
const getDecorator = require('./decorator');
const mustacheExpress = require('mustache-express');
const proxy = require('./proxy');
const iaTjenesterMetrikkerProxy = require('./iaTjenesterMetrikkerProxy');
const { BASE_PATH } = require('./konstanter');
const buildPath = path.join(__dirname, '../build');
const dotenv = require('dotenv');
const { initIdporten } = require('./idporten');
const { initTokenX } = require('./tokenx');
const cookieParser = require('cookie-parser');
const getCspValue = require('./content-security-policy');
const { createNotifikasjonBrukerApiProxyMiddleware } = require('./brukerapi-proxy-middleware');

const { NAIS_CLUSTER_NAME = 'local', APP_INGRESS, LOGIN_URL, NODE_ENV, PORT = 3000 } = process.env;

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
    console.log('Starting server: server.js');

    await Promise.all([initIdporten(), initTokenX()]);

    app.disable('x-powered-by');
    app.use((req, res, next) => {
        res.header('X-Frame-Options', 'SAMEORIGIN');
        res.header('X-Xss-Protection', '1; mode=block');
        res.header('X-Content-Type-Options', 'nosniff');
        res.header('Referrer-Policy', 'no-referrer');
        res.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
        res.header('Content-Security-Policy', getCspValue());
        res.header('X-WebKit-CSP', getCspValue());
        res.header('X-Content-Security-Policy', getCspValue());

        if (NODE_ENV === 'development') {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            res.header('Access-Control-Allow-Methods', 'GET, POST');
        }
        next();
    });

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

    app.use(proxy);
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
        console.log("Vi er ikke i LABS, oppretter ProxyMiddleware")
        app.use(
            '/sykefravarsstatistikk/notifikasjon-bruker-api',
            createNotifikasjonBrukerApiProxyMiddleware()
        );
    }

    app.get(BASE_PATH, (req, res) => {
        res.send(html);
    });

    app.get(BASE_PATH + '/*', (req, res) => {
        res.send(html);
    });

    app.listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
};

getDecorator()
    .then(renderAppMedDecorator, (error) => {
        console.error('Kunne ikke hente dekoratør ', error);
        process.exit(1);
    })
    .then(startServer, (error) => {
        console.error('Kunne ikke rendre app ', error);
        process.exit(1);
    });
