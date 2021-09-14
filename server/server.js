const path = require('path');
const express = require('express');
const app = express();
const getDecorator = require('./decorator');
const mustacheExpress = require('mustache-express');
const proxy = require('./proxy');
const { getIATjenesterMetrikkerProxy } = require('./ia-tjenester-metrikker-proxy');
const { BASE_PATH } = require('./konstanter');
const buildPath = path.join(__dirname, '../build');

const PORT = process.env.PORT || 3000;

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);

const renderAppMedDecorator = (decoratorFragments) => {
    return new Promise((resolve, reject) => {
        app.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });
};

const startServer = (html) => {
    app.use(BASE_PATH + '/', express.static(buildPath, { index: false }));

    app.get(`${BASE_PATH}/redirect-til-login`, (req, res) => {
        const loginUrl =
            process.env.LOGIN_URL ||
            'http://localhost:8080/sykefravarsstatistikk-api/local/cookie?subject=01065500791&cookiename=selvbetjening-idtoken&redirect=';
        res.redirect(loginUrl + req.query.redirect);
    });

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.use(getIATjenesterMetrikkerProxy());

    app.use(proxy);

    app.get(BASE_PATH, (req, res) => {
        res.send(html);
    });

    app.get(BASE_PATH + '/*', (req, res) => {
        res.send(html);
    });

    app.listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
};

getDecorator()
    .then(renderAppMedDecorator, (error) => {
        console.error('Kunne ikke hente dekoratør ', error);
        process.exit(1);
    })
    .then(startServer, (error) => {
        console.error('Kunne ikke rendre app ', error);
        process.exit(1);
    });
