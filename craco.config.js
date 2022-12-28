const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [{ plugin: CracoLessPlugin }],
    devServer: {
        proxy: {
            '/sykefravarsstatistikk/api': {
                pathRewrite: {'^/sykefravarsstatistikk/api': ''},
                    target: 'http://localhost:8080/sykefravarsstatistikk-api',
                    changeOrigin: true,
            },
        },
    },
    jest: {
        configure: {
            setupFilesAfterEnv: ['<rootDir>/jest/setupTests.ts'],
        },
    },
};
