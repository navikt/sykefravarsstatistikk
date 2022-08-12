// OPS Dette er foreløpig duplisert i konstanter.js
export const BASE_PATH = '/sykefravarsstatistikk';


export const PATH_FORSIDE = '/';
export const PATH_FORSIDE_GENERELL = '/sammenligning';
export const PATH_FORSIDE_BARNEHAGE = PATH_FORSIDE_GENERELL + '/barnehage';
export const PATH_KALKULATOR = '/kalkulator';
export const PATH_HISTORIKK = '/historikk';

export const SAMTALESTØTTE_MIKROFONTEND = 'samtalestotte-podlet';
export const SAMTALESTØTTE_MIKROFRONTEND_PATH = '/' + SAMTALESTØTTE_MIKROFONTEND;

export const DEV_HOST = 'arbeidsgiver-gcp.dev.nav.no';
export const LABS_HOST = 'arbeidsgiver.labs.nais.io';
export const PROD_HOST = 'arbeidsgiver.nav.no';

export const enum MILJØ {
    PROD = 'prod-gcp',
    LABS = 'labs-gcp',
    DEV = 'dev-gcp',
    LOCAL = 'local',
}

export const MIN_SIDE_ARBEIDSGIVER_DEV = 'https://min-side-arbeidsgiver.dev.nav.no/min-side-arbeidsgiver';
export const MIN_SIDE_ARBEIDSGIVER_LABS = 'https://arbeidsgiver.labs.nais.io/min-side-arbeidsgiver';
export const MIN_SIDE_ARBEIDSGIVER_PROD = 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver';

export const ER_VEDLIKEHOLD_AKTIVERT = false;
