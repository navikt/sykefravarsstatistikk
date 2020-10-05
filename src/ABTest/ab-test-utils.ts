import { amplitudeInstance } from '../amplitude/amplitude';

export enum ABTestVersjon {
    VersjonA = 'VersjonA',
    VersjonB = 'VersjonB',
    Fallback = 'Fallback',
}

export const getABTestVersjon = (feature: boolean | undefined): ABTestVersjon => {
    if (feature === undefined) return ABTestVersjon.Fallback;

    if (feature) {
        return ABTestVersjon.VersjonA;
    } else {
        return ABTestVersjon.VersjonB;
    }
};

export const sendABTestEvent = (feature: string, versjon: ABTestVersjon): void => {
    amplitudeInstance.logEvent('ab-test', { feature, versjon });
};
