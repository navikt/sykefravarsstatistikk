import { Express } from 'express';
import mustacheExpress from 'mustache-express';
import getDecorator from './decorator.js';
import { getFrontendEnvs } from './environment.js';

function getDekoratørUrl() {
    const { DEKORATOR_URL = 'https://www.nav.no/dekoratoren' } = process.env;
    return DEKORATOR_URL;
}

async function getTemplateValues() {
    const frontendEnvs = getFrontendEnvs();
    const decoratorParts = await getDecorator(getDekoratørUrl());
    return { ...frontendEnvs, ...decoratorParts };
}

const renderAppMedTemplateValues = (templateValues, app) => {
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

export async function renderWithDecorator(app: Express) {
    const templateValues = await getTemplateValues();

    return await renderAppMedTemplateValues(templateValues, app);
}
