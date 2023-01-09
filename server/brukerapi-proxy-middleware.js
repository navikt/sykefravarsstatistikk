const {exchangeIdportenToken} = require('idporten')
const {createProxyMiddleware} = require('http-proxy-middleware');

const {
    NOTIFIKASJON_BRUKER_API_AUDIENCE,
} = process.env;

const proxyConfig = {
    target: 'http://notifikasjon-bruker-api.fager.svc.cluster.local',
    changeOrigin: true,
    pathRewrite: {"/sykefravarsstatistikk/notifikasjon-bruker-api": "/api/graphql"},
    router: async (req) => {
        const tokenSet = await exchangeIdportenToken(req, NOTIFIKASJON_BRUKER_API_AUDIENCE);
        if (!tokenSet?.expired() && tokenSet?.access_token) {
            req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
        }
        return undefined;
    },
    secure: true,
    xfwd: true,
    logLevel: 'info',
};

const notifikasjonBrukerApiProxy = createProxyMiddleware('/sykefravarsstatistikk/notifikasjon-bruker-api', proxyConfig);


module.exports = { notifikasjonBrukerApiProxy};
