const { NAIS_CLUSTER_NAME = 'local' } = process.env;

function getCurrentEnvironment() {
    return NAIS_CLUSTER_NAME;
}

function appRunningLocally() {
    return getCurrentEnvironment() === "local"
}

function appRunningOnLabsGcp() {
    return getCurrentEnvironment() === "labs-gcp"
}

function appRunningOnDevGcp() {
    return getCurrentEnvironment() === "dev-gcp"
}

function appRunningOnProdGcp() {
    return getCurrentEnvironment() === "dev-gcp"
}



module.exports = { appRunningLocally, appRunningOnLabsGcp, appRunningOnDevGcp, appRunningOnProdGcp };
