import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { exchangeIdportenToken } from './idporten';
import { appRunningOnLabsGcp } from './environment';
import * as log from './logging';

const {
    IA_TJENESTER_METRIKKER_BASE_URL = 'http://localhost:9090/ia-tjenester-metrikker',
    IA_TJENESTER_METRIKKER_AUDIENCE,
} = process.env;

const proxyConfig: Options = {
    target: IA_TJENESTER_METRIKKER_BASE_URL,
    changeOrigin: true,
    pathRewrite: { '/sykefravarsstatistikk/proxy/ia-tjenester-metrikker': '' },
    router: async (req) => {
        if (appRunningOnLabsGcp()) {
            // I labs så returnerer vi mock uansett
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

const iaTjenesterMetrikkerProxy = createProxyMiddleware(
    '/sykefravarsstatistikk/proxy/ia-tjenester-metrikker',
    proxyConfig
);
module.exports = iaTjenesterMetrikkerProxy;
