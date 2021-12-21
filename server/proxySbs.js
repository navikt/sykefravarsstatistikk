const { FRONTEND_API_PATH } = require('./konstanter');
const { createProxyMiddleware } = require('http-proxy-middleware');

const envProperties = {
    BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
};

const BACKEND_API_PATH = '/sykefravarsstatistikk-api';
const BACKEND_API_BASE_URL = `${envProperties.BACKEND_API_BASE_URL}`;

const listeAvTillatteUrler = [
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk/summert'),
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk/kvartalsvis'),
    new RegExp(
        '^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk/legemeldtsykefravarsprosent'
    ),
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/bedriftsmetrikker'),
    new RegExp('^' + FRONTEND_API_PATH + '/organisasjoner/statistikk'),
    new RegExp('^' + FRONTEND_API_PATH + '/organisasjoner'),
    new RegExp('^' + FRONTEND_API_PATH + '/feature'),
];

const proxyConfig = {
    target: BACKEND_API_BASE_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
        const urlErTillatt = listeAvTillatteUrler.filter((regexp) => regexp.test(path)).length > 0;

        if (urlErTillatt) {
            return path.replace(FRONTEND_API_PATH, BACKEND_API_PATH);
        }
        return BACKEND_API_PATH + '/not-found';
    },
    secure: true,
    xfwd: true,
    logLevel: 'info',
};

if (envProperties.APIGW_HEADER) {
    proxyConfig.headers = {
        'x-nav-apiKey': envProperties.APIGW_HEADER,
    };
}

const proxy = createProxyMiddleware(FRONTEND_API_PATH, proxyConfig);

module.exports = proxy;
