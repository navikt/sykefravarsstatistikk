import path from 'path';
import express from 'express';
import mustacheExpress from 'mustache-express';
import Prometheus from 'prom-client';
import { fileURLToPath } from 'node:url';
import { applyNotifikasjonMiddleware } from './brukerapi-proxy-middleware.js';
import { contentHeaders } from './contentHeaders.js';
import { loggingHandler, logger } from './backend-logger.js';
import { requestLoggingMiddleware } from './requestLogging.js';
import { getKalkulatorRedirectUrl, getTemplateValues } from './environment.js';

import { BASE_PATH } from './common.js';
import { applyWonderwallLoginRedirect } from "./authentication/wonderwall.js";

const buildPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../build');

const app = express();

const { PORT = 3000, NAIS_APP_NAME = 'local' } = process.env;

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
    logger.info('Starting server');

    Prometheus.collectDefaultMetrics();
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

async function main() {
    const templateValues = await getTemplateValues();
    const html = await renderAppMedTemplateValues(templateValues);

    if (NAIS_APP_NAME === 'sykefravarsstatistikk-mock') {
        logger.info('App running on "ekstern dev". Will not start the server.');
    } else {
        await startServer(html);
    }
}

main().catch((error) => {
    logger.error({ error }, 'Kunne ikke hente eller rendre app');
    process.exit(1);
});
