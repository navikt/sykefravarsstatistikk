import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { logger } from '../backend-logger.js';
import express from 'express';
import { idportenTokenExchangeMiddleware } from '@navikt/tokenx-middleware';

const {
    IA_TJENESTER_METRIKKER_BASE_URL = 'http://localhost:9090/ia-tjenester-metrikker',
    IA_TJENESTER_METRIKKER_AUDIENCE,
} = process.env;

const proxyConfig: Options = {
    target: IA_TJENESTER_METRIKKER_BASE_URL,
    changeOrigin: true,
    pathRewrite: { '/sykefravarsstatistikk/ia-tjenester-metrikker': '' },
    secure: true,
    xfwd: true,
    logLevel: 'info',
    logProvider: () => logger,
    onError: (err) => {
        logger.error('Error in ia-tjenester-metrikker proxy: ' + err);
    },
};

export function iaTjenesterMetrikkerController() {
    const router = express.Router();

    router.use(
        idportenTokenExchangeMiddleware(IA_TJENESTER_METRIKKER_AUDIENCE),
        createProxyMiddleware(proxyConfig)
    );

    return router;
}
