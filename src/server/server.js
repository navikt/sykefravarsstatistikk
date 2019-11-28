const path = require('path');
const express = require('express');
const app = express();
const getDecorator = require('./decorator');
const mustacheExpress = require('mustache-express');
const proxy = require('./proxy');
const { BASE_PATH } = require('./konstanter');

const buildPath = path.join(__dirname, '../../build');

const PORT = process.env.PORT || 3000;

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);

const renderAppMedDecorator = decoratorFragments => {
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

const startServer = html => {
    app.use(BASE_PATH, express.static(buildPath, { index: false }));

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.use(proxy);

    app.get(BASE_PATH, (req, res) => {
        res.send(html);
    });

    app.use('/', (_, res) => {
        res.redirect(BASE_PATH);
    });

    app.listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
};

getDecorator()
    .then(renderAppMedDecorator, error => {
        console.error('Kunne ikke hente dekoratør ', error);
        process.exit(1);
    })
    .then(startServer, error => {
        console.error('Kunne ikke rendre app ', error);
        process.exit(1);
    });
