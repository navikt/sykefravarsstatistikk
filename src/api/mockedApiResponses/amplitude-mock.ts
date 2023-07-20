import { AnalyticsClient } from '../../amplitude/client';

export const amplitudeMock: AnalyticsClient = {
    setUserProperties(properties: unknown) {
        console.log('properties', properties);
    },
    logEvent(event: string, data?: unknown) {
        console.log('Logging event:', event, data);
    },
};
