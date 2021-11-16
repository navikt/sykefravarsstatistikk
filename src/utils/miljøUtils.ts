export const getMiljø = (): string => {
    const href = window.location.href;
    if (href.startsWith('https://arbeidsgiver.nav.no')) {
        return 'prod-sbs';
    }
    if (href.startsWith('https://arbeidsgiver-q.nav.no')) {
        return 'dev-sbs';
    }
    if (href.startsWith('https://arbeidsgiver.labs.nais.io')) {
        return 'labs-gcp';
    }
    return 'local';
};
