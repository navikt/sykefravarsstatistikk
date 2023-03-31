const { exchangeIdportenToken } = require('./idporten');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { appRunningOnDevGcpEkstern } = require('./environment');

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
        logLevel: 'info',
    };
}

function applyNotifikasjonMiddleware(app) {
    if (appRunningOnDevGcpEkstern()) {
        const {
            applyNotifikasjonMockMiddleware,
        } = require('@navikt/arbeidsgiver-notifikasjoner-brukerapi-mock');
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

module.exports = {
    applyNotifikasjonMiddleware,
    NOTIFIKASJON_API_PATH: '/sykefravarsstatistikk/notifikasjon-bruker-api',
};
