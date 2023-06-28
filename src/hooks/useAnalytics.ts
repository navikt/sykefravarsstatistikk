import { AnalyticsClient } from '../amplitude/client';
import { useEffect } from 'react';

interface AnalyticsData {
    eventname: string;
    eventProperties: any;
}

const ANALYTICS_EVENT = 'amplitude';

export const useAnalytics = <T extends AnalyticsData>(client: AnalyticsClient) => {
    useEffect(() => {
        const listener = (event: Event) => {
            event.stopImmediatePropagation();
            const {
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

const defaultEventProperties = () => {
    return {
        app: 'sykefravarsstatistikk',
        team: 'teamia',
    };
};

export const sendAnalytics = (eventname: string, additionalEventProperties?: any) => {
    const analyticsEvent = new CustomEvent<AnalyticsData>(ANALYTICS_EVENT, {
        detail: {
            eventname,
            eventProperties: { ...defaultEventProperties(), ...additionalEventProperties },
        },
    });
    document.dispatchEvent(analyticsEvent);
};
