import express, { Express } from "express";
import path from 'path';
import { fileURLToPath } from 'node:url';
import mustacheExpress from 'mustache-express';
import getDecorator from "./decorator.js";
import { getFrontendEnvs } from "./environment.js";
import { logger } from "./backend-logger";
import { BASE_PATH } from "./common";

const buildPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../build');
console.log(buildPath);

function getDekoratørUrl() {
    const { DEKORATOR_URL = 'https://www.nav.no/dekoratoren' } = process.env;
    return DEKORATOR_URL;
}

export async function getTemplateValues() {
    const frontendEnvs = getFrontendEnvs();
    const decoratorParts = await getDecorator(getDekoratørUrl());
    return { ...frontendEnvs, ...decoratorParts };
}


const renderAppMedTemplateValues = (templateValues, app: Express) => {
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

export default function setup(app: Express) {
    app.use(express.static(buildPath, { index: false }));

    const templateValues = getTemplateValues();

    return renderAppMedTemplateValues(templateValues, app);
}


export async function renderDecorator(app: Express) {
    const buildPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../build');
    logger.info('BuildPath:', buildPath);
    const renderAppMedTemplateValues = (templateValues) => {
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

    const templateValues = await getTemplateValues();

    const html = await renderAppMedTemplateValues(templateValues);

    app.use(BASE_PATH + '/', express.static(buildPath, { index: false }));
    return html;
}