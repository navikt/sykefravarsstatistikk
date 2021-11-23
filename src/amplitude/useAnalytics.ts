import { AnalyticsClient } from './client';
import { useEffect } from 'react';
import { EventData } from './events';

interface AnalyticsData {
    eventname: string;
    data?: EventData;
}

const ANALYTICS_EVENT = 'amplitude';

export const useAnalytics = <T extends AnalyticsData>(client: AnalyticsClient) => {
    useEffect(() => {
        const listener = (event: Event) => {
            let {
                detail: { data, eventname },
            } = event as CustomEvent<T>;
            client.logEvent(eventname, data);
        };
        document.addEventListener(ANALYTICS_EVENT, listener);

        return () => {
            document.removeEventListener(ANALYTICS_EVENT, listener);
        };
    }, [client]);
};

export const sendAnalytics = (data: AnalyticsData) => {
    const analyticsEvent = new CustomEvent<AnalyticsData>(ANALYTICS_EVENT, { detail: data });
    document.dispatchEvent(analyticsEvent);
};
