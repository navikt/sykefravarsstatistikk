import amplitude from 'amplitude-js';
import { EventProperties } from './events';

function initializeAmplitudeClient(): AnalyticsClient {
    const bucketId =
        window.location.hostname === 'arbeidsgiver.nav.no'
            ? 'a8243d37808422b4c768d31c88a22ef4'
            : '6ed1f00aabc6ced4fd6fcb7fcdc01b30';

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
    logEvent(name: string, properties?: EventProperties): void;

    setUserProperties(properties: any): void;
}
