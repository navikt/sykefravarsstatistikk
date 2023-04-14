import { createProxyMiddleware } from 'http-proxy-middleware';
import { exchangeIdportenToken } from './idporten.js';
import { appRunningOnDevGcpEkstern } from './environment.js';
import { applyNotifikasjonMockMiddleware } from '@navikt/arbeidsgiver-notifikasjoner-brukerapi-mock';

export const NOTIFIKASJON_API_PATH = '/sykefravarsstatistikk/notifikasjon-bruker-api';

function getProxyConfig() {
    const { NOTIFIKASJON_API_AUDIENCE } = process.env;
    return {
        target: 'http://notifikasjon-bruker-api.fager.svc.cluster.local',
        changeOrigin: true,
        pathRewrite: { '/sykefravarsstatistikk/notifikasjon-bruker-api': '/api/graphql' },
        router: async (req) => {
            const tokenSet = await exchangeIdportenToken(req, NOTIFIKASJON_API_AUDIENCE);
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

export function applyNotifikasjonMiddleware(app) {
    if (appRunningOnDevGcpEkstern()) {
        applyNotifikasjonMockMiddleware({
            app,
            path: '/sykefravarsstatistikk/notifikasjon-bruker-api',
        });
    } else {
        const notifikasjonBrukerApiProxy = createProxyMiddleware(
            '/sykefravarsstatistikk/notifikasjon-bruker-api',
            getProxyConfig()
        );
        app.use(notifikasjonBrukerApiProxy);
    }
}
