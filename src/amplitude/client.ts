import amplitude from 'amplitude-js';

const AmplitudeBucket = {
    ARBEIDSGIVER_PROD: 'a8243d37808422b4c768d31c88a22ef4',
    ARBEIDSGIVER_DEV: '6ed1f00aabc6ced4fd6fcb7fcdc01b30',
};

function initializeAmplitudeClient(): AnalyticsClient {
    const bucketId =
        window.location.hostname === 'arbeidsgiver.nav.no'
            ? AmplitudeBucket.ARBEIDSGIVER_PROD
            : AmplitudeBucket.ARBEIDSGIVER_DEV;

    const amplitudeInstance = amplitude.getInstance();
    amplitudeInstance.init(bucketId, '', {
        apiEndpoint: 'amplitude.nav.no/collect',
        saveEvents: false,
        includeUtm: true,
        batchEvents: false,
        includeReferrer: true,
    });

    return amplitudeInstance;
}

export const amplitudeClient = initializeAmplitudeClient();

export interface AnalyticsClient {
    logEvent(eventname: string, eventProperties?: any): void;

    setUserProperties(properties: any): void;
}
