const { FRONTEND_API_PATH } = require('./konstanter');
const proxyMiddleware = require('http-proxy-middleware');

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
};

const BACKEND_API_PATH = '/sykefravarsstatistikk-api';
const API_GATEWAY_BASEURL = `${envProperties.API_GATEWAY}`;

const listeAvTillatteUrler = [
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/sammenligning$'),
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/summerTapteDagsverk'),
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk'),
    new RegExp('^/sykefravarsstatistikk/api/metrikker/[a-zA-Z0-9._-]+$'),
    new RegExp('^' + FRONTEND_API_PATH + '/feature'),
];

const proxyConfig = {
    target: API_GATEWAY_BASEURL,
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const urlErWhitelistet =
            listeAvTillatteUrler.filter(regexp => regexp.test(path)).length > 0;

        if (urlErWhitelistet) {
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

const proxy = proxyMiddleware(FRONTEND_API_PATH, proxyConfig);

module.exports = proxy;
