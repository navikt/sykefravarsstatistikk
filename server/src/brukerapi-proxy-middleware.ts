import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';
import { exchangeToken } from './authentication/tokenx.js';

function getProxyConfig() {
    const { NOTIFIKASJON_API_AUDIENCE } = process.env;
    return {
        target: 'http://notifikasjon-bruker-api.fager.svc.cluster.local',
        changeOrigin: true,
        pathRewrite: { '/sykefravarsstatistikk/notifikasjon-bruker-api': '/api/graphql' },
        router: async (req) => {
            const tokenSet = await exchangeToken(req, NOTIFIKASJON_API_AUDIENCE);
            if (!tokenSet?.expired() && tokenSet?.access_token) {
                req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
            }
            return undefined;
        },
        secure: true,
        xfwd: true,
        logLevel: 'info' as const,
    };
}

export function applyNotifikasjonMiddleware(app: Express) {
    const notifikasjonBrukerApiProxy = createProxyMiddleware(
        '/sykefravarsstatistikk/notifikasjon-bruker-api',
        getProxyConfig()
    );
    app.use(notifikasjonBrukerApiProxy);
}
