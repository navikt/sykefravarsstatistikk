export enum ABTestVersjon {
  VersjonA = 'VersjonA',
  VersjonB = 'VersjonB',
  Fallback = 'Fallback',
}

export const getABTestVersjon = (erFeatureAktivert: boolean | undefined): ABTestVersjon => {
  if (erFeatureAktivert === undefined) return ABTestVersjon.Fallback;

  if (erFeatureAktivert) {
    return ABTestVersjon.VersjonB;
  } else {
    return ABTestVersjon.VersjonA;
  }
};
