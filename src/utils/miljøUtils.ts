import {
  DEV_HOST,
  LABS_HOST,
  MILJØ,
  MIN_SIDE_ARBEIDSGIVER_DEV,
  MIN_SIDE_ARBEIDSGIVER_LABS,
  MIN_SIDE_ARBEIDSGIVER_PROD,
  PROD_HOST,
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
