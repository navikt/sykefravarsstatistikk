const { FRONTEND_API_PATH } = require('./konstanter');
const { createProxyMiddleware } = require('http-proxy-middleware');

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
};

const BACKEND_API_PATH = '/sykefravarsstatistikk-api';
const API_GATEWAY_BASEURL = `${envProperties.API_GATEWAY}`;

const listeAvTillatteUrler = [
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk/summert'),
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk/kvartalsvis'),
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/bedriftsmetrikker'),
    new RegExp('^' + FRONTEND_API_PATH + '/organisasjoner/statistikk'),
    new RegExp('^' + FRONTEND_API_PATH + '/feature'),
    new RegExp('^' + FRONTEND_API_PATH + '/mottat-iatjeneste'),
    new RegExp('https://ia-tjenester-metrikker.dev.intern.nav.no/metrikker/'),
];

const proxyConfig = {
    target: API_GATEWAY_BASEURL,
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const urlErTillatt = listeAvTillatteUrler.filter((regexp) => regexp.test(path)).length > 0;

        console.log(
            `path er ${path} ${
                path.includes('/mottat-iatjeneste')
                    ? `det er inklude, ny path vil bli laget, ny path er : ${path.replace(
                          FRONTEND_API_PATH,
                          'https://ia-tjenester-metrikker.dev.intern.nav.no/metrikker/'
                      )}`
                    : 'ikke inkluderer'
            }`
        );
        if (path.includes('/mottat-iatjeneste')) {
            console.log('path for mottat-iatjeneste', path);
            return path.replace(
                FRONTEND_API_PATH,
                'https://ia-tjenester-metrikker.dev.intern.nav.no/metrikker/'
            );
        }

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
