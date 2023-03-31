const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const sykefraværsstatistikkApiProxy = require('./proxy');
const iaTjenesterMetrikkerProxy = require('./iaTjenesterMetrikkerProxy');
const buildPath = path.join(__dirname, '../../build');
const dotenv = require('dotenv');
const {initTokenXClient} = require('./tokenx');
const {initIdporten} = require('./idporten');
const cookieParser = require('cookie-parser');
const {applyNotifikasjonMiddleware} = require('./brukerapi-proxy-middleware');
const log = require('./logging');
const contentHeaders = require('./contentHeaders');
const loggingHandler = require("./backend-logger");
const requestLoggingMiddleware = require('./requestLogging')
const { getTemplateValues } = require('./environment')

const app = express();
dotenv.config();

const {APP_INGRESS, LOGIN_URL, PORT = 3000} = process.env;
const BASE_PATH = '/sykefravarsstatistikk';

const renderAppMedTemplateValues = (templateValues) => {
    return new Promise((resolve, reject) => {
        app.engine('html', mustacheExpress());
        app.set('view engine', 'mustache');
        app.set('views', buildPath);
        app.render('index.html', templateValues, (err, html) => {
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
    app.use(cookieParser());

    await Promise.all([initIdporten(), initTokenXClient()]);

    app.disable('x-powered-by');
    app.use(contentHeaders);
    app.use(requestLoggingMiddleware)
    app.use(sykefraværsstatistikkApiProxy);
    app.use(iaTjenesterMetrikkerProxy);
    applyNotifikasjonMiddleware(app);

    app.use(BASE_PATH + '/', express.static(buildPath, {index: false}));

    // consumes the payload! Must be placed below the proxy middlewares
    app.use(express.json())

    app.post(BASE_PATH + '/api/logger', loggingHandler)

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

getTemplateValues()
    .then(renderAppMedTemplateValues, (error) => {
        log.error('Kunne ikke hente dekoratør ', error);
        process.exit(1);
    })
    .then(startServer, (error) => {
        log.error('Kunne ikke rendre app ', error);
        process.exit(1);
    });
