const {
    applyNotifikasjonMockMiddleware,
} = require('@navikt/arbeidsgiver-notifikasjoner-brukerapi-mock');
const SourcemapExplorer = require('source-map-explorer');

class sourcemapExplorerPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('Sourcemap Explorer Plugin', () => {
            SourcemapExplorer.explore(['build/static/js/*.js', 'build/static/css/*.css'], {
                output: { format: 'html', filename: `report/${new Date().toISOString()}.html` },
            });
        });
    }
}

module.exports = {
    webpack: {
        plugins: process.env.CI === 'true' ? [] : [new sourcemapExplorerPlugin()],
    },
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
                path: '/sykefravarsstatistikk/notifikasjon-bruker-api',
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
