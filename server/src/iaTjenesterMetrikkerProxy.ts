import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { exchangeIdportenToken } from './idporten';
import { appRunningOnDevGcpEkstern } from './environment';
import * as log from './logging';

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
            if (appRunningOnDevGcpEkstern()) {
                // I dev-gcp-ekstern så returnerer vi mock uansett
                return undefined;
            }
            const tokenSet = await exchangeIdportenToken(req, IA_TJENESTER_METRIKKER_AUDIENCE);
            if (!tokenSet?.expired() && tokenSet?.access_token) {
                req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
            }
            return undefined;
        },
        secure: true,
        xfwd: true,
        logLevel: 'info',
        logProvider: () => log,
        onError: (err) => {
            log.error('Error in ia-tjenester-metrikker proxy: ' + err);
        },
    };
}

const iaTjenesterMetrikkerProxy = createProxyMiddleware(
    '/sykefravarsstatistikk/proxy/ia-tjenester-metrikker',
    getProxyConfig()
);
module.exports = iaTjenesterMetrikkerProxy;
