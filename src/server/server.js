const path = require('path');
const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');

const BASE_PATH = require('./paths');
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

const buildPath = path.join(__dirname, '../../build');

const envProperties = {
    API_GATEWAY: process.env.API_GATEWAY || 'http://localhost:8080',
    APIGW_HEADER: process.env.APIGW_HEADER,
};

const API_PATH = `${BASE_PATH}/api`;
const TARGET_PATH = '/sykefravarsstatistikk-api';
const TARGET = `${envProperties.API_GATEWAY}`;


const proxyConfig = {
    target: TARGET,
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const urlErWhitelistet = new RegExp('^' + API_PATH + '/[0-9]{9}/sammenligning$').test(path);

        if (urlErWhitelistet) {
            return path.replace(API_PATH, TARGET_PATH)
        }
        return path;
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

const startServer = () => {
    app.use(BASE_PATH, express.static(buildPath));

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.use(
        proxy(
            API_PATH,
            proxyConfig
        )
    );

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
