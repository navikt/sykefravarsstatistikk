const { FRONTEND_IA_TJENESTER_METRIKKER_PROXY_PATH } = require('./konstanter');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { exchangeIdportenToken } = require('./idporten');
const { appRunningOnLabsGcp } = require('./environment');

const { IA_TJENESTER_METRIKKER_BASE_URL = 'http://localhost:9090/ia-tjenester-metrikker' } =
    process.env;

const proxyConfig = {
    target: IA_TJENESTER_METRIKKER_BASE_URL,
    changeOrigin: true,
    pathRewrite: {FRONTEND_IA_TJENESTER_METRIKKER_PROXY_PATH: '/'},
    router: async (req) => {
        if (appRunningOnLabsGcp()) {
            // I labs så returnerer vi mock uansett
            return undefined;
        }
        const tokenSet = await exchangeIdportenToken(req);
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
    FRONTEND_IA_TJENESTER_METRIKKER_PROXY_PATH,
    proxyConfig
);
module.exports = iaTjenesterMetrikkerProxy;
