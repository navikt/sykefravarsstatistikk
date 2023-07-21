import amplitude from 'amplitude-js';

function initializeAmplitudeClient(): AnalyticsClient {
    const amplitudeInstance = amplitude.getInstance();
    amplitudeInstance.init('default', '', {
        apiEndpoint: 'amplitude.nav.no/collect-auto',
        saveEvents: false,
        includeUtm: true,
        includeReferrer: true,
        platform: window.location.toString(),
    });

    return amplitudeInstance;
}

export const amplitudeClient = initializeAmplitudeClient();

export interface AnalyticsClient {
    logEvent(eventname: string, eventProperties?: unknown): void;

    setUserProperties(properties: unknown): void;
}
