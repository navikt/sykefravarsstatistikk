import { Express } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { idportenTokenExchangeMiddleware } from '@navikt/tokenx-middleware';

const FRONTEND_API_PATH = '/sykefravarsstatistikk/api';
const BACKEND_API_PATH = '/sykefravarsstatistikk-api';
const { BACKEND_API_BASE_URL = 'http://localhost:8080', SYKEFRAVARSSTATISTIKK_API_AUDIENCE } =
    process.env;

export function applySykefraværsstatistikkApiProxyMiddlewares(app: Express) {
    const backendApiProxyMiddleware = createProxyMiddleware(proxyConfig);
    app.use(
        FRONTEND_API_PATH,
        idportenTokenExchangeMiddleware(SYKEFRAVARSSTATISTIKK_API_AUDIENCE),
        backendApiProxyMiddleware
    );
}

const proxyConfig: Options = {
    target: BACKEND_API_BASE_URL,
    changeOrigin: true,
    pathRewrite: (path: string) => {
        if (erWhitelistet(path)) {
            return path.replace(FRONTEND_API_PATH, BACKEND_API_PATH);
        }
        return BACKEND_API_PATH + '/not-found';
    },
    secure: true,
    xfwd: true,
    logLevel: 'info' as const,
};

const erWhitelistet = (path: string) => {
    const whitelist = [
        new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk/kvartalsvis'),
        new RegExp('^' + FRONTEND_API_PATH + '/organisasjoner/statistikk'),
        new RegExp('^' + FRONTEND_API_PATH + '/organisasjoner'),
        new RegExp('^' + FRONTEND_API_PATH + '/[0-9]{9}/v1/sykefravarshistorikk/aggregert'),
        new RegExp('^' + FRONTEND_API_PATH + '/publiseringsdato'),
        new RegExp(
            '^' + FRONTEND_API_PATH + '/[0-9]{9}/sykefravarshistorikk/legemeldtsykefravarsprosent'
        ),
    ];

    return whitelist.some((regexp) => regexp.test(path));
};
