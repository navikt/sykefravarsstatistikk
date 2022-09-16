const CracoLessPlugin = require('craco-less');
const {createProxyMiddleware} = require('http-proxy-middleware');
const apiProxyPath = '/sykefravarsstatistikk/api';

module.exports = {
  plugins: [{plugin: CracoLessPlugin}],
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
  jest: {
    configure: {
      setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    },
  },
};
