import path from 'path';
import express from 'express';
import mustacheExpress from 'mustache-express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Prometheus from 'prom-client';
import { fileURLToPath } from 'node:url';
import { sykefraværsstatistikkApiProxy } from './proxy.js';
import { iaTjenesterMetrikkerProxy } from './iaTjenesterMetrikkerProxy.js';
import {  applyNotifikasjonMiddleware } from "./brukerapi-proxy-middleware.js";
import { contentHeaders } from './contentHeaders.js';
import { loggingHandler, logger } from './backend-logger.js';
import { requestLoggingMiddleware } from './requestLogging.js';
import {
    getKalkulatorRedirectUrl,
    getTemplateValues,
} from './environment.js';
import { applyWonderwallLoginRedirect } from "./authentication/wonderwall";
import { initIdporten } from "./authentication/idporten";
import { initTokenXClient } from "./authentication/tokenx";

const buildPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../build');

const app = express();
dotenv.config();

const { PORT = 3000 } = process.env;
const BASE_PATH = '/sykefravarsstatistikk';

Prometheus.collectDefaultMetrics();

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
    logger.info('Starting server: server.ts');
    app.use(cookieParser());

    await initIdporten();
    await initTokenXClient();

    app.use(sykefraværsstatistikkApiProxy);
    app.use(iaTjenesterMetrikkerProxy);

    applyWonderwallLoginRedirect(app);
    applyNotifikasjonMiddleware(app);

    app.disable('x-powered-by');
    app.use(contentHeaders);
    app.use(requestLoggingMiddleware);

    app.use(BASE_PATH + '/', express.static(buildPath, { index: false }));

    app.get(BASE_PATH + '/historikk', (req, res) => {
        res.redirect(BASE_PATH + '/');
    });
    app.get(BASE_PATH + '/kalkulator', (req, res) => {
        res.redirect(getKalkulatorRedirectUrl());
    });

    // consumes the payload! Must be placed below the proxy middlewares
    app.use(express.json());
    

    app.post(BASE_PATH + '/logger', (req, res) => {
        loggingHandler(req, res);
    });

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/metrics`, async (req, res) => {
        const metrics = await Prometheus.register.metrics();
        res.set('Content-Type', Prometheus.register.contentType);
        res.send(metrics);
    });

    app.get(BASE_PATH, (req, res) => {
        res.send(html);
    });

    app.get(BASE_PATH + '/*', (req, res) => {
        res.send(html);
    });

    app.listen(PORT, () => {
        logger.info({ PORT }, `Server listening on port ${PORT}`);
    });
};

getTemplateValues()
    .then(renderAppMedTemplateValues, (error) => {
        logger.error({ error }, 'Kunne ikke hente Template verdier');
        process.exit(1);
    })
    .then(startServer, (error) => {
        logger.error({ error }, 'Kunne ikke rendre app ');
        process.exit(1);
    });
