export const BASE_PATH = '/sykefravarsstatistikk';

export const PATH_FORSIDE = '/';

export const MILJØ = {
    PROD: 'prod-gcp',
    DEV: 'dev-gcp',
    DEV_EKSTERN: 'dev-gcp-ekstern',
    LOCAL: 'local',
} as const;

export type MILJØ = (typeof MILJØ)[keyof typeof MILJØ];
