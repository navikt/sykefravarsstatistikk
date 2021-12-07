import { DecoratorContent } from './decorator';

import { Request, Response } from 'express';

import path from 'path';

import express from 'express';

import getDecorator from './decorator';

import mustacheExpress from 'mustache-express';

import proxy from './proxy';
// import { initTokenX } from './openid/tokenx';
// import { initIdporten } from './openid/idporten';

const app = express();
const { BASE_PATH } = require('./konstanter');
const buildPath = path.join(__dirname, '../build');

const PORT = process.env.PORT || 3000;

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);

const renderAppMedDecorator = (decoratorFragments: DecoratorContent): Promise<string> => {
    return new Promise((resolve, reject) => {
        app.render('../../build/index.html', decoratorFragments, (err: Error, html: string) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });
};

const startServer = async (html: string) => {
    // await Promise.all([initTokenX, initIdporten]);
    app.use(BASE_PATH + '/', express.static(buildPath, { index: false }));

    app.get(`${BASE_PATH}/redirect-til-login`, (req: Request, res: Response) => {
        res.setHeader('Referrer', req.query.redirect as string);
        res.redirect('/oauth2/login');
    });

    app.get(`${BASE_PATH}/internal/isAlive`, (_: Request, res: Response) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (_: Request, res: Response) => res.sendStatus(200));

    app.use(proxy);

    app.get(BASE_PATH, (_: Request, res: Response) => {
        res.send(html);
    });

    app.get(BASE_PATH + '/*', (_: Request, res: Response) => {
        res.send(html);
    });

    app.listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
};

getDecorator()
    .then(renderAppMedDecorator, (error: Error) => {
        console.error('Kunne ikke hente dekoratør ', error);
        process.exit(1);
    })
    .then(startServer, (error: Error) => {
        console.error('Kunne ikke rendre app ', error);
        process.exit(1);
    });
