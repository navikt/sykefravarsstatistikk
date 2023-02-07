export const BASE_PATH = '/sykefravarsstatistikk';


export const PATH_FORSIDE = '/';
export const PATH_KALKULATOR_REDIRECT = '/kalkulator';
export const PATH_HISTORIKK = '/historikk';
export const DEV_HOST = 'arbeidsgiver-gcp.dev.nav.no';
export const LABS_HOST = 'arbeidsgiver.labs.nais.io';
export const PROD_HOST = 'arbeidsgiver.nav.no';

export const enum MILJØ {
    PROD = 'prod-gcp',
    LABS = 'labs-gcp',
    DEV = 'dev-gcp',
    LOCAL = 'local',
}

export const MIN_SIDE_ARBEIDSGIVER_DEV =
    'https://min-side-arbeidsgiver.dev.nav.no/min-side-arbeidsgiver';
export const MIN_SIDE_ARBEIDSGIVER_LABS = 'https://arbeidsgiver.labs.nais.io/min-side-arbeidsgiver';
export const MIN_SIDE_ARBEIDSGIVER_PROD = 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver';

export const SAMTALESTØTTE_DEV =
    'https://arbeidsgiver-gcp.dev.nav.no/samtalestotte';
export const SAMTALESTØTTE_LABS = 'https://arbeidsgiver.labs.nais.io/samtalestotte';
export const SAMTALESTØTTE_PROD = 'https://arbeidsgiver.nav.no/samtalestotte';

export const FOREBYGGE_FRAVÆR_DEV = 'https://min-ia.dev.nav.no/min-ia/';
export const FOREBYGGE_FRAVÆR_LABS = 'https://arbeidsgiver.labs.nais.io/min-ia/';
export const FOREBYGGE_FRAVÆR_PROD = 'https://arbeidsgiver.nav.no/min-ia';

export const ER_VEDLIKEHOLD_AKTIVERT = false;
