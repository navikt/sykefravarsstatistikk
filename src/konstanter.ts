export const BASE_PATH = '/sykefravarsstatistikk';


export const PATH_FORSIDE = '/';
export const PATH_KALKULATOR_REDIRECT = '/kalkulator';
export const PATH_HISTORIKK = '/historikk';

export const MILJØ = {
    PROD : 'prod-gcp',
    DEV : 'dev-gcp',
    DEV_EKSTERN: 'dev-gcp-ekstern',
    LOCAL : 'local'
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type MILJØ = typeof MILJØ[keyof typeof MILJØ]

export const ER_VEDLIKEHOLD_AKTIVERT = false;
