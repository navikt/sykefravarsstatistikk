const CracoLessPlugin = require('craco-less');
const proxy = require('http-proxy-middleware');

const apiProxyPath = '/sykefravarsstatistikk/api';

module.exports = {
    plugins: [{ plugin: CracoLessPlugin }],
    devServer: {
        before: app => {
            app.use(
                proxy(apiProxyPath, {
                    target: 'http://localhost:8080/sykefravarsstatistikk-api',
                    changeOrigin: true,
                    pathRewrite: (path, req) => path.replace(apiProxyPath, ''),
                })
            );
        },
    },
    eslint: {
        enable: true,
        mode: 'extends',
        configure: {
            extends: 'react-app',
            rules: {
                // Det er en bug i denne sjekken som automatisk feiler på ÆØÅ: https://github.com/yannickcr/eslint-plugin-react/issues/1654
                'react/jsx-pascal-case': 'off',
            },
        },
    },
    jest: {
        configure: {
            setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
        },
    },
};
