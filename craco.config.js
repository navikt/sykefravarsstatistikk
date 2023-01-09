const {
    applyNotifikasjonMockMiddleware,
} = require('@navikt/arbeidsgiver-notifikasjoner-brukerapi-mock');

const CracoLessPlugin = require('craco-less');
const { NOTIFIKASJON_API_PATH } = require('./server/brukerapi-proxy-middleware');

module.exports = {
    plugins: [{ plugin: CracoLessPlugin }],
    devServer: {
        proxy: {
            '/sykefravarsstatistikk/api': {
                pathRewrite: { '^/sykefravarsstatistikk/api': '' },
                target: 'http://localhost:8080/sykefravarsstatistikk-api',
                changeOrigin: true,
            },
        },
        setupMiddlewares: (middlewares, { app }) => {
            applyNotifikasjonMockMiddleware({
                app,
                path: NOTIFIKASJON_API_PATH,
            });
            return middlewares;
        },
    },
    jest: {
        configure: {
            setupFilesAfterEnv: ['<rootDir>/jest/setupTests.ts'],
        },
    },
};
