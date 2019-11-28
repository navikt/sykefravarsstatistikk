const { BASE_PATH } = require('./konstanter');
const proxyMiddleware = require('http-proxy-middleware');

const API_PATH = `${BASE_PATH}/api`;

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
};

const TARGET_BACKEND_PATH = '/sykefravarsstatistikk-api';
const API_GATEWAY_BASEURL = `${envProperties.API_GATEWAY}`;

const proxyConfig = {
    target: API_GATEWAY_BASEURL,
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const urlErWhitelistet = new RegExp('^' + API_PATH + '/[0-9]{9}/sammenligning$').test(path);

        if (urlErWhitelistet) {
            return path.replace(API_PATH, TARGET_BACKEND_PATH);
        }
        return TARGET_BACKEND_PATH + '/not-found';
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

const proxy = proxyMiddleware(API_PATH, proxyConfig);

module.exports = proxy;
