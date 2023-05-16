import { idportenTokenExchangeMiddleware } from '@navikt/tokenx-middleware';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import express from 'express';

const { NOTIFIKASJON_API_AUDIENCE } = process.env;

const proxyConfig: Options = {
    target: 'http://notifikasjon-bruker-api.fager.svc.cluster.local',
    changeOrigin: true,
    pathRewrite: { '/sykefravarsstatistikk/notifikasjon-bruker-api': '/api/graphql' },
    secure: true,
    xfwd: true,
    logLevel: 'info' as const,
};

export function notifikasjonBrukerApiController() {
    const router = express.Router({ caseSensitive: false });

    router.use(
        idportenTokenExchangeMiddleware(NOTIFIKASJON_API_AUDIENCE),
        createProxyMiddleware(proxyConfig)
    );

    return router;
}
