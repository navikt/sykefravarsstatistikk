import express, { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'node:url';
import mustacheExpress from 'mustache-express';
import getDecorator from './decorator.js';
import { getFrontendEnvs } from './environment.js';

const buildPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../build');

function getDekoratørUrl() {
    const { DEKORATOR_URL = 'https://www.nav.no/dekoratoren' } = process.env;
    return DEKORATOR_URL;
}

async function getTemplateValues() {
    const frontendEnvs = getFrontendEnvs();
    const decoratorParts = await getDecorator(getDekoratørUrl());
    return { ...frontendEnvs, ...decoratorParts };
}


const renderAppMedTemplateValues = (templateValues) => {
    const app = express();

    return new Promise((resolve, reject) => {
        app.engine('html', mustacheExpress());
        app.set('view engine', 'mustache');
        app.set('views', buildPath);
        app.render('index.html', templateValues, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });
};

export default function setup() {
    const router = express.Router();

    router.use(express.static(buildPath, { index: false }));

    const templateValues = getTemplateValues();

    const html = renderAppMedTemplateValues(templateValues);

    router.get('(/.*)?', (req, res) => {
        res.send(html);
    });

    return router
}
