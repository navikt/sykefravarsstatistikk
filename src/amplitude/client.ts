import amplitude from 'amplitude-js';
import { EventProperties } from './events';

function initializeAmplitudeClient(): AnalyticsClient {
    const amplitudeInstance = amplitude.getInstance();

    amplitudeInstance.init('default', undefined, {
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
    logEvent(name: string, properties?: EventProperties): void;

    setUserProperties(properties: any): void;
}
