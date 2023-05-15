import express from 'express';
import prometheus from 'prom-client';

import { contentHeaders } from './contentHeaders.js';
import { requestLoggingMiddleware } from './requestLogging.js';
import internalController from './controllers/internal-controller.js';
import redirectTilLoginController from './controllers/redirect-til-login-controller.js';
import notifikasjonBrukerApiController from './controllers/notifikasjon-bruker-api-controller.js';
import apiController from './controllers/api-controller.js';
import iaTjenesterMetrikkerController from './controllers/ia-tjenester-metrikker-controller.js';
import legacyRedirectController from './controllers/legacy-redirect-controller.js';
import decoratorRenderer from './decorator-renderer.js';
import { logger } from './backend-logger.js';
import { appRunningOnProdGcp, appRunningOnDevGcp } from './environment.js';
import { BASE_PATH } from './common.js';
import { logError } from "source-map-explorer/bin/cli";

prometheus.collectDefaultMetrics();

const useProductionVersion = appRunningOnProdGcp() || appRunningOnDevGcp();
const { PORT = 3000 } = process.env;

logger.info('Starting server');
const app = express();
app.disable('x-powered-by');

const baseRouter = express.Router({ caseSensitive: false });

app.use(BASE_PATH, baseRouter);

if (useProductionVersion) {
    baseRouter.use('/redirect-til-login', redirectTilLoginController());
    baseRouter.use('/notifikasjon-bruker-api', notifikasjonBrukerApiController());
    baseRouter.use('/api', apiController());
    baseRouter.use('/ia-tjenester-metrikker', iaTjenesterMetrikkerController());
}

baseRouter.use(
    contentHeaders,
    requestLoggingMiddleware,
    legacyRedirectController(),
    express.json() // OBS: consumes the payload, and must this be placed below the proxy middlewares
);

baseRouter.use('/internal', internalController(prometheus.register));

const html = decoratorRenderer(app)

logger.info("rendered HTML", html)
baseRouter.get('(/.*)?', (req, res) => {
    console.log("er inne i baseRouter.get('(/.*)?'")
    res.send(html);
});


baseRouter.get('/', (req, res) => {
    console.log("er inne i baseRouter.get('/'")
    res.send(html);
});

app.get(BASE_PATH + '/', (req, res) => {
    console.log("er inne i app.get(BASE_PATH + '/'")
    res.send(html);
});

app.listen(PORT, () => {
    logger.info({ PORT }, `Server listening on port ${PORT}`);
});
