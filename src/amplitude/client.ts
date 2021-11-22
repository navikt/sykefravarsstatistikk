import amplitude from 'amplitude-js';
import { EventData } from './events';

function initializeAmplitudeClient(): AnalyticsClient {
    const apiKey =
        window.location.hostname === 'arbeidsgiver.nav.no'
            ? '3a6fe32c3457e77ce81c356bb14ca886'
            : '55477baea93c5227d8c0f6b813653615';

    const amplitudeInstance = amplitude.getInstance();
    amplitudeInstance.init(apiKey, '', {
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
    logEvent(event: string, data?: EventData): void;
    setUserProperties(properties: any): void;
}
