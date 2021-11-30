import { AnalyticsClient } from '../amplitude/client';
import { EventProperties } from '../amplitude/events';

export const amplitudeMock: AnalyticsClient = {
    setUserProperties(properties: any) {
        console.log('properties', properties);
    },
    logEvent(event: string, data?: EventProperties) {
        console.log('Logging event:', event, data);
    },
};
