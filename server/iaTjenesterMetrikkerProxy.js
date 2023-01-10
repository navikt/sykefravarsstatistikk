const { createProxyMiddleware } = require('http-proxy-middleware');
const { exchangeIdportenToken } = require('./idporten');
const { appRunningOnLabsGcp } = require('./environment');

const {
    IA_TJENESTER_METRIKKER_BASE_URL = 'http://localhost:9090/ia-tjenester-metrikker',
    IA_TJENESTER_METRIKKER_AUDIENCE,
} = process.env;

const proxyConfig = {
    target: IA_TJENESTER_METRIKKER_BASE_URL,
    changeOrigin: true,
    pathRewrite: { '/sykefravarsstatistikk/proxy/ia-tjenester-metrikker': '/' },
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
};

const iaTjenesterMetrikkerProxy = createProxyMiddleware(
    '/sykefravarsstatistikk/proxy/ia-tjenester-metrikker',
    proxyConfig
);
module.exports = iaTjenesterMetrikkerProxy;
