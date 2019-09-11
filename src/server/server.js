const path = require('path');
const express = require('express');
const app = express();

const proxy = require('http-proxy-middleware');

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const BASE_PATH = '/sykefravarsstatistikk';

const buildPath = path.join(__dirname, '../../build');

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
};

const proxyConfig = {
    changeOrigin: true,
    pathRewrite: { '/api': '/sykefravarsstatistikk-api' },
    target: envProperties.API_GATEWAY,
    secure: true,
    xfwd: true,
};

if (envProperties.APIGW_HEADER) {
    proxyConfig.headers = {
        'x-nav-apiKey': envProperties.APIGW_HEADER,
    };
}

const startServer = () => {
    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.use('/api/sykefravarprosent', proxy(proxyConfig));

    app.use(BASE_PATH, express.static(buildPath));

    app.use(BASE_PATH, (_, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });

    app.use('/', (_, res) => {
        res.redirect(BASE_PATH);
    });

    app.listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
};

startServer();
