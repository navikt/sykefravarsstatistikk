import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { logger } from './backend-logger.js';
import { exchangeToken } from "./authentication/tokenx";

function getProxyConfig(): Options {
    const {
        IA_TJENESTER_METRIKKER_BASE_URL = 'http://localhost:9090/ia-tjenester-metrikker',
        IA_TJENESTER_METRIKKER_AUDIENCE,
    } = process.env;

    return {
        target: IA_TJENESTER_METRIKKER_BASE_URL,
        changeOrigin: true,
        pathRewrite: { '/sykefravarsstatistikk/proxy/ia-tjenester-metrikker': '' },
        router: async (req) => {
            const tokenSet = await exchangeToken(req, IA_TJENESTER_METRIKKER_AUDIENCE);
            if (!tokenSet?.expired() && tokenSet?.access_token) {
                req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
            }
            return undefined;
        },
        secure: true,
        xfwd: true,
        logLevel: 'info',
        logProvider: () => logger,
        onError: (err) => {
            logger.error('Error in ia-tjenester-metrikker proxy: ' + err);
        },
    };
}

export const iaTjenesterMetrikkerProxy = createProxyMiddleware(
    '/sykefravarsstatistikk/proxy/ia-tjenester-metrikker',
    getProxyConfig()
);
