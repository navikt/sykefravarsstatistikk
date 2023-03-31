const getDecorator = require('./decorator');

function getCurrentEnvironment() {
    const { MILJO = 'local' } = process.env;
    return MILJO;
}

function getDekoratørUrl() {
    const { DEKORATOR_URL = 'https://dekoratoren.ekstern.dev.nav.no' } = process.env;
    return DEKORATOR_URL;
}

function getFrontendEnvs() {
    const {
        MILJO = 'local',
        MIN_SIDE_ARBEIDSGIVER_URL = 'https://arbeidsgiver.ekstern.dev.nav.no/min-side-arbeidsgiver',
        FOREBYGGE_FRAVAR_URL = 'https://arbeidsgiver.ekstern.dev.nav.no/forebygge-fravar',
    } = process.env;

    return { MILJO, MIN_SIDE_ARBEIDSGIVER_URL, FOREBYGGE_FRAVAR_URL };
}
function appRunningLocally() {
    return getCurrentEnvironment() === 'local';
}

function appRunningOnDevGcpEkstern() {
    return getCurrentEnvironment() === 'dev-gcp-ekstern';
}

function appRunningOnDevGcp() {
    return getCurrentEnvironment() === 'dev-gcp';
}

function appRunningOnProdGcp() {
    return getCurrentEnvironment() === 'prod-gcp';
}

async function getTemplateValues() {
    const frontendEnvs = getFrontendEnvs();
    const decoratorParts = await getDecorator(getDekoratørUrl());
    return { ...frontendEnvs, ...decoratorParts };
}

module.exports = {
    appRunningLocally,
    appRunningOnDevGcpEkstern,
    appRunningOnDevGcp,
    appRunningOnProdGcp,
    getTemplateValues,
};
