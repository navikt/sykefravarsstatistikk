import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { Express } from 'express';
import { tokenExchangeMiddleware } from './authentication/tokenx.js';

export function applyNotifikasjonProxyMiddlewares(app: Express) {
    const { NOTIFIKASJON_API_AUDIENCE } = process.env;
    const notifikasjonBrukerApiProxy = createProxyMiddleware(proxyConfig);

    app.use(
        '/sykefravarsstatistikk/notifikasjon-bruker-api',
        tokenExchangeMiddleware(NOTIFIKASJON_API_AUDIENCE),
        notifikasjonBrukerApiProxy
    );
}

const proxyConfig: Options = {
    target: 'http://notifikasjon-bruker-api.fager.svc.cluster.local',
    changeOrigin: true,
    pathRewrite: { '/sykefravarsstatistikk/notifikasjon-bruker-api': '/api/graphql' },
    secure: true,
    xfwd: true,
    logLevel: 'info' as const,
};
