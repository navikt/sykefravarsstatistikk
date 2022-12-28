import {
    DEV_HOST,
    FOREBYGGE_FRAVÆR_DEV,
    FOREBYGGE_FRAVÆR_LABS,
    FOREBYGGE_FRAVÆR_PROD,
    LABS_HOST,
    MILJØ,
    MIN_SIDE_ARBEIDSGIVER_DEV,
    MIN_SIDE_ARBEIDSGIVER_LABS,
    MIN_SIDE_ARBEIDSGIVER_PROD,
    PROD_HOST,
    SAMTALESTØTTE_DEV,
    SAMTALESTØTTE_LABS,
    SAMTALESTØTTE_PROD,
} from '../konstanter';

export const getMiljø = (): string => {
    switch (window.location.hostname) {
        case PROD_HOST:
            return MILJØ.PROD;
        case LABS_HOST:
            return MILJØ.LABS;
        case DEV_HOST:
            return MILJØ.DEV;
        default:
            return MILJØ.LOCAL;
    }
};

export const getMinSideArbeidsgiverUrl = () => {
    switch (getMiljø()) {
        case MILJØ.PROD:
            return MIN_SIDE_ARBEIDSGIVER_PROD;
        case MILJØ.LABS:
            return MIN_SIDE_ARBEIDSGIVER_LABS;
        case MILJØ.DEV:
            return MIN_SIDE_ARBEIDSGIVER_DEV;
        default:
            return MIN_SIDE_ARBEIDSGIVER_LABS;
    }
};

export const getSamtalestøtteUrl = () => {
    switch (getMiljø()) {
        case MILJØ.PROD:
            return SAMTALESTØTTE_PROD;
        case MILJØ.LABS:
            return SAMTALESTØTTE_LABS;
        case MILJØ.DEV:
            return SAMTALESTØTTE_DEV;
        default:
            return MIN_SIDE_ARBEIDSGIVER_LABS;
    }
};

export const getForebyggeFraværUrl = () => {
    switch (getMiljø()) {
        case MILJØ.PROD:
            return FOREBYGGE_FRAVÆR_PROD;
        case MILJØ.LABS:
            return FOREBYGGE_FRAVÆR_LABS;
        case MILJØ.DEV:
            return FOREBYGGE_FRAVÆR_DEV;
        default:
            return FOREBYGGE_FRAVÆR_LABS;
    }
};
