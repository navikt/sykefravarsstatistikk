import { AnalyticsClient } from '../amplitude/client';
import { EventData } from '../amplitude/events';

export const amplitudeMock: AnalyticsClient = {
    setUserProperties(properties: any) {
        console.log('properties', properties);
    },
    logEvent(event: string, data?: EventData) {
        console.log('Logging event:', event, data);
    },
};
