export const getMiljø = () => {
    const hostname = window.location.hostname;

    if (hostname === 'arbeidsgiver.nav.no') {
        return 'prod-gcp';
    }

    if (hostname === 'arbeidsgiver.labs.nais.io') {
        return 'labs-gcp';
    }

    if (hostname === 'arbeidsgiver-gcp.dev.nav.no') {
        return 'dev-gcp';
    }

    return 'local';
};
