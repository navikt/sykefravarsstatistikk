export const getMiljø = () => {
    const href = window.location.href;
    if (href.startsWith('https://arbeidsgiver.nav.no')) {
        return 'prod-gcp';
    }
    if (href.startsWith('https://arbeidsgiver-q.nav.no')) {
        return 'dev-sbs';
    }
    if (href.startsWith('https://arbeidsgiver.labs.nais.io')) {
        return 'labs-gcp';
    }
    if (href.startsWith('https://arbeidsgiver-gcp.dev.nav.no')) {
        return 'dev-gcp';
    }
    return 'local';
};
