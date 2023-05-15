import express, { Express } from "express";
import path from 'path';
import { fileURLToPath } from 'node:url';
import mustacheExpress from 'mustache-express';
import getDecorator from "./decorator.js";
import { getFrontendEnvs } from "./environment.js";
import { BASE_PATH } from "./common.js";

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

    const html = await renderAppMedTemplateValues(templateValues, app);

    app.use(BASE_PATH + '/', express.static(buildPath, { index: false }));

    return html;
}