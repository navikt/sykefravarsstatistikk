const { SAMTALESTØTTE_MIKROFRONTEND_PROXY_PATH } = require('./konstanter');
const { createProxyMiddleware } = require('http-proxy-middleware');

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
    ARBEIDSGIVER_SAMTALESTØTTE_MIKROFRONTEND_DOMENE:
        process.env.ARBEIDSGIVER_SAMTALESTØTTE_MIKROFRONTEND_DOMENE || 'http://localhost:3001',
};

const ARBEIDSGIVER_SAMTALESTØTTE_MIKROFRONTEND_PATH = '/samtalestotte-podlet';

const listeAvTillatteUrler = [new RegExp('^' + SAMTALESTØTTE_MIKROFRONTEND_PROXY_PATH + '/*')];

const proxyConfig = {
    target: envProperties.ARBEIDSGIVER_SAMTALESTØTTE_MIKROFRONTEND_DOMENE,
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const urlErTillatt = listeAvTillatteUrler.filter((regexp) => regexp.test(path)).length > 0;

        if (urlErTillatt) {
            return path.replace(
                SAMTALESTØTTE_MIKROFRONTEND_PROXY_PATH,
                ARBEIDSGIVER_SAMTALESTØTTE_MIKROFRONTEND_PATH
            );
        }
        return ARBEIDSGIVER_SAMTALESTØTTE_MIKROFRONTEND_PATH + '/not-found';
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

const mikrofrontend_proxy = createProxyMiddleware(
    SAMTALESTØTTE_MIKROFRONTEND_PROXY_PATH,
    proxyConfig
);
module.exports = mikrofrontend_proxy;
