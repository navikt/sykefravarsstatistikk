const path = require('path');
const express = require('express');
const getDecorator = require('./decorator');
const mustacheExpress = require('mustache-express');
const proxy = require('./proxy');
const {BASE_PATH} = require('./konstanter');
const buildPath = path.join(__dirname, '../build');
const dotenv = require('dotenv');
const {initIdporten} = require('./idporten');
const {initTokenX} = require('./tokenx');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cookieParser());
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


const cspString =
    `default-src 'self' https://oidc-ver2.difi.no/idporten-oidc-provider/authorize https://idporten-ver2.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp4 https://www.nav.no https://amplitude.nav.no https://arbeidsgiver.nav.no https://data.brreg.no;` +
    `upgrade-insecure-requests;` +
    `block-all-mixed-content;` +
    `base-uri;` +
    `object-src 'none';` +
    `script-src 'self';` +
    `img-src 'self' data: https://www.nav.no;` +
    `font-src 'self' data: https://www.nav.no;` +
    `style-src 'self' 'unsafe-inline' https://www.nav.no;` +
    `style-src-elem 'self' 'unsafe-inline' https://www.nav.no;` +
    `script-src-elem 'self' 'unsafe-inline' https://www.nav.no;`

const startServer = async (html) => {
    console.log('Starting server: server.js');

    await Promise.all([initIdporten(), initTokenX()]);

    app.disable("x-powered-by");
    app.use((req, res, next) => {
        res.header("X-Frame-Options", "SAMEORIGIN");
        res.header("X-Xss-Protection", "1; mode=block");
        res.header("X-Content-Type-Options", "nosniff");
        res.header("Referrer-Policy", "no-referrer");
        res.header(
            "Permissions-Policy",
            "geolocation=(), microphone=(), camera=()"
        );
        res.header("Content-Security-Policy", cspString);
        res.header("X-WebKit-CSP", cspString);
        res.header("X-Content-Security-Policy", cspString);

        if (process.env.NODE_ENV === "development") {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            res.header("Access-Control-Allow-Methods", "GET, POST");
        }
        res.header("X-TEST-RESPONSE-HEADER", "HELLO");
        next();
    });

    app.use(BASE_PATH + '/', express.static(buildPath, {index: false}));

    app.get(`${BASE_PATH}/redirect-til-login`, (req, res) => {
        const referrerUrl = `${process.env.APP_INGRESS}/success?redirect=${req.query.redirect}`;
        res.redirect(BASE_PATH + `/oauth2/login?redirect=${referrerUrl}`);
    });

    app.get(`${BASE_PATH}/success`, (req, res) => {
        const loginserviceToken = req.cookies['selvbetjening-idtoken'];
        if (loginserviceToken && req.query.redirect.startsWith(process.env.APP_INGRESS)) {
            res.redirect(req.query.redirect);
        } else if (req.query.redirect.startsWith(process.env.APP_INGRESS)) {
            res.redirect(`${process.env.LOGIN_URL}${req.query.redirect}`);
        } else {
            res.redirect(`${process.env.LOGIN_URL}${process.env.APP_INGRESS}`);
        }
    });

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

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
