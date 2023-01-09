const { exchangeIdportenToken } = require('./idporten');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { appRunningOnLabsGcp } = require('./environment');
const {
    applyNotifikasjonMockMiddleware,
} = require('@navikt/arbeidsgiver-notifikasjoner-brukerapi-mock');

const { NOTIFIKASJON_API_AUDIENCE } = process.env;

const NOTIFIKASJON_API_PATH = '/sykefravarsstatistikk/notifikasjon-bruker-api';

const proxyConfig = {
    target: 'http://notifikasjon-bruker-api.fager.svc.cluster.local',
    changeOrigin: true,
    pathRewrite: { NOTIFIKASJONER_BRUKER_API_PATH: '/api/graphql' },
    router: async (req) => {
        const tokenSet = await exchangeIdportenToken(req, NOTIFIKASJON_API_AUDIENCE);
        if (!tokenSet?.expired() && tokenSet?.access_token) {
            req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
        }
        return undefined;
    },
    secure: true,
    xfwd: true,
    logLevel: 'info',
};

function applyNotifikasjonMiddleware(app) {
    if (appRunningOnLabsGcp()) {
        applyNotifikasjonMockMiddleware({
            app,
            path: NOTIFIKASJON_API_PATH,
        });
    } else {
        const notifikasjonBrukerApiProxy = createProxyMiddleware(
            NOTIFIKASJON_API_PATH,
            proxyConfig
        );
        app.use(notifikasjonBrukerApiProxy);
    }
}

module.exports = { applyNotifikasjonMiddleware, NOTIFIKASJON_API_PATH };
