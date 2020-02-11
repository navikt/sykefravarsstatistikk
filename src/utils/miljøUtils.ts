export const getMiljø = (): string => {
    const pathname = window.location.pathname;
    if (pathname.includes('arbeidsgiver.nav.no')) {
        return 'prod-sbs';
    }
    if (pathname.includes('arbeidsgiver-q.nav.no')) {
        return 'dev-sbs';
    }
    return 'local';
};
