const { SAMTALESTØTTE_MIKROFRONTEND_PATH } = require('./konstanter');
const { createProxyMiddleware } = require('http-proxy-middleware');

/*const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
};*/

const DOMENE = 'http://localhost:3001/'
const SAMTALESTØTTE_PODLET_PATH = '/samtalestotte-podlet';

const listeAvTillatteUrler = [
    new RegExp('^' + SAMTALESTØTTE_MIKROFRONTEND_PATH + '/*'),
];

const proxyConfig = {
    target: DOMENE,
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const urlErTillatt = listeAvTillatteUrler.filter((regexp) => regexp.test(path)).length > 0;

        if (urlErTillatt) {
            return path.replace(SAMTALESTØTTE_MIKROFRONTEND_PATH, SAMTALESTØTTE_PODLET_PATH);
        }
        return SAMTALESTØTTE_PODLET_PATH + '/not-found';
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

const mikrofrontend_proxy = createProxyMiddleware(SAMTALESTØTTE_MIKROFRONTEND_PATH, proxyConfig);

module.exports = mikrofrontend_proxy;
