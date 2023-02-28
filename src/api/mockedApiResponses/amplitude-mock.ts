import { AnalyticsClient } from '../../amplitude/client';

export const amplitudeMock: AnalyticsClient = {
    setUserProperties(properties: any) {
        console.log('properties', properties);
    },
    logEvent(event: string, data?: any) {
        console.log('Logging event:', event, data);
    },
};
