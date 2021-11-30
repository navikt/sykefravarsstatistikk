import { AnalyticsClient } from './client';
import { useEffect } from 'react';
import { EventProperties } from './events';

interface AnalyticsData {
    eventname: string;
    eventProperties: EventProperties;
}

const ANALYTICS_EVENT = 'amplitude';

export const useAnalytics = <T extends AnalyticsData>(client: AnalyticsClient) => {
    useEffect(() => {
        const listener = (event: Event) => {
            event.stopImmediatePropagation();
            let {
                detail: { eventProperties, eventname },
            } = event as CustomEvent<T>;
            client.logEvent(eventname, eventProperties);
        };
        document.addEventListener(ANALYTICS_EVENT, listener);

        return () => {
            document.removeEventListener(ANALYTICS_EVENT, listener);
        };
    }, [client]);
};

export const sendAnalytics = (eventData: AnalyticsData) => {
    const analyticsEvent = new CustomEvent<AnalyticsData>(ANALYTICS_EVENT, { detail: eventData });
    document.dispatchEvent(analyticsEvent);
};
