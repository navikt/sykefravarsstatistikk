const { createProxyMiddleware } = require('http-proxy-middleware');
const { exchangeIdportenToken } = require('./idporten');
const { appRunningOnDevGcpEkstern } = require('./environment');

const FRONTEND_API_PATH = '/sykefravarsstatistikk/api';
const BACKEND_API_PATH = '/sykefravarsstatistikk-api';

const listeAvTillatteUrler = [
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk/kvartalsvis'),
    new RegExp('^' + FRONTEND_API_PATH + '/organisasjoner/statistikk'),
    new RegExp('^' + FRONTEND_API_PATH + '/organisasjoner'),
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/v1/sykefravarshistorikk/aggregert'),
    new RegExp('^' + FRONTEND_API_PATH + '/publiseringsdato'),
    new RegExp(
        '^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk/legemeldtsykefravarsprosent'
    ),
];

function getProxyConfig() {
    const { BACKEND_API_BASE_URL = 'http://localhost:8080', SYKEFRAVARSSTATISTIKK_API_AUDIENCE } =
        process.env;

    return {
        target: BACKEND_API_BASE_URL,
        changeOrigin: true,
        pathRewrite: (path) => {
            const urlErTillatt =
                listeAvTillatteUrler.filter((regexp) => regexp.test(path)).length > 0;

            if (urlErTillatt) {
                return path.replace(FRONTEND_API_PATH, BACKEND_API_PATH);
            }
            return BACKEND_API_PATH + '/not-found';
        },
        router: async (req) => {
            if (appRunningOnDevGcpEkstern()) {
                // I dev-gcp-ekstern så returnerer vi mock uansett
                return undefined;
            }
            const tokenSet = await exchangeIdportenToken(req, SYKEFRAVARSSTATISTIKK_API_AUDIENCE);
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

const sykefraværsstatistikkApiProxy = createProxyMiddleware(FRONTEND_API_PATH, getProxyConfig());

module.exports = sykefraværsstatistikkApiProxy;
