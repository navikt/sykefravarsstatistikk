export const getMiljø = (): string => {
    const hostname = window.location.hostname;
    if (hostname.includes('arbeidsgiver.nav.no')) {
        return 'prod-sbs';
    }
    if (hostname.includes('arbeidsgiver-q.nav.no')) {
        return 'dev-sbs';
    }
    if (hostname.includes('arbeidsgive.labs.nais.io')) {
        return 'labs-gcp';
    }
    return 'local';
};
