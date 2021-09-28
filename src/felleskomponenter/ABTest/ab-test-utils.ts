import { amplitudeClient } from '../../amplitude/client';

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

export const sendABTestEvent = (feature: string, versjon: ABTestVersjon): void => {
    amplitudeClient.logEvent('ab-test', { feature, versjon });
};
