import path from 'path';
import express from 'express';
import mustacheExpress from 'mustache-express';
import Prometheus from 'prom-client';
import { fileURLToPath } from 'node:url';
import { applySykefraværsstatistikkApiProxyMiddlewares } from './proxy.js';
import { applyIaTjenesterMetrikkerProxyMiddlewares } from './iaTjenesterMetrikkerProxy.js';
import { applyNotifikasjonProxyMiddlewares } from './brukerapi-proxy-middleware.js';
import { contentHeaders } from './contentHeaders.js';
import { loggingHandler, logger } from './backend-logger.js';
import { requestLoggingMiddleware } from './requestLogging.js';
import { getKalkulatorRedirectUrl, getTemplateValues } from './environment.js';
import { BASE_PATH } from './common.js';
import { applyWonderwallLoginRedirect } from './wonderwall.js';
import { setupIsAlive, setupIsReady } from './healthcheck.js';
import { setupMetricsEndpoint } from './prometheus.js';

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
    logger.info('Starting server: server.ts');

    Prometheus.collectDefaultMetrics();

    applyWonderwallLoginRedirect(app);

    applySykefraværsstatistikkApiProxyMiddlewares(app);
    applyIaTjenesterMetrikkerProxyMiddlewares(app);
    applyNotifikasjonProxyMiddlewares(app);

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

    await setupIsAlive(app);
    await setupIsReady(app);
    await setupMetricsEndpoint(app);

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
