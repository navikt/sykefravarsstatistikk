const CracoLessPlugin = require('craco-less');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiProxyPath = '/sykefravarsstatistikk/api';

module.exports = {
    plugins: [{ plugin: CracoLessPlugin }],
    devServer: {
        before: (app) => {
            app.use(
                createProxyMiddleware(apiProxyPath, {
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
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
            },
            plugins: ['@typescript-eslint'],
            extends: ['plugin:jsx-a11y/recommended'],
            rules: {
                'no-use-before-define': 'off',
                // Kan slås på når react-scripts oppgraderer sin avhengighet til eslint https://github.com/typescript-eslint/typescript-eslint/issues/2540
                '@typescript-eslint/no-use-before-define': ['off'],
            },
        },
    },
    jest: {
        configure: {
            setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
        },
    },
};
