export const getMiljø = (): string => {
    const href = window.location.href;
    if (href.includes('https://arbeidsgiver.nav.no')) {
        return 'prod-sbs';
    }
    if (href.includes('https://arbeidsgiver-q.nav.no')) {
        return 'dev-sbs';
    }
    if (href.includes('https://arbeidsgiver.labs.nais.io')) {
        return 'labs-gcp';
    }
    return 'local';
};
