import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { logger } from './backend-logger.js';
import { Express } from 'express';
import { idportenTokenExchangeMiddleware } from "@navikt/tokenx-middleware";

export function applyIaTjenesterMetrikkerProxyMiddlewares(server: Express) {
    const iaTjenesterMetrikkerProxy = createProxyMiddleware(proxyConfig);
    server.use(
        '/sykefravarsstatistikk/proxy/ia-tjenester-metrikker',
        idportenTokenExchangeMiddleware(IA_TJENESTER_METRIKKER_AUDIENCE),
        iaTjenesterMetrikkerProxy
    );
}

const {
    IA_TJENESTER_METRIKKER_BASE_URL = 'http://localhost:9090/ia-tjenester-metrikker',
    IA_TJENESTER_METRIKKER_AUDIENCE,
} = process.env;

const proxyConfig: Options = {
    target: IA_TJENESTER_METRIKKER_BASE_URL,
    changeOrigin: true,
    pathRewrite: { '/sykefravarsstatistikk/proxy/ia-tjenester-metrikker': '' },
    secure: true,
    xfwd: true,
    logLevel: 'info',
    logProvider: () => logger,
    onError: (err) => {
        logger.error('Error in ia-tjenester-metrikker proxy: ' + err);
    },
};


