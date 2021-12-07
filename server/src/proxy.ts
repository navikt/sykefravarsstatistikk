import { Options } from 'http-proxy-middleware/dist/types';
import { FRONTEND_API_PATH } from './konstanter';
import { exchangeToken } from './openid/tokenx';
// import { TokenSet } from 'openid-client';

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
    new RegExp(
        '^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk/legemeldtsykefravarsprosent'
    ),
    new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/bedriftsmetrikker'),
    new RegExp('^' + FRONTEND_API_PATH + '/organisasjoner/statistikk'),
    new RegExp('^' + FRONTEND_API_PATH + '/organisasjoner'),
    new RegExp('^' + FRONTEND_API_PATH + '/feature'),
];

const proxyConfig: Options = {
    target: API_GATEWAY_BASEURL,
    changeOrigin: true,
    pathRewrite: (path, _) => {
        const urlErTillatt = listeAvTillatteUrler.filter((regexp) => regexp.test(path)).length > 0;

        if (urlErTillatt) {
            return path.replace(FRONTEND_API_PATH, BACKEND_API_PATH);
        }
        return BACKEND_API_PATH + '/not-found';
    },
    onProxyReq: (_, __) => {
        // if (req.headers.authorization) {
        //     new TokenSet();
        //     proxyReq.setHeader('authorization', 'Bearer token'); // FIXME: Gjør token exchange til tokenX her
        // } else {
        //     throw new Error('User is not authorized to call backend!');
        // }
        console.log('hello');
        console.log(_.getHeaders());
    },
    router: async (req) => {
        const tokenSet = await exchangeToken(req);
        if (!tokenSet.expired() && tokenSet.access_token) {
            req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
        }
        return undefined;
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

export default proxy;
