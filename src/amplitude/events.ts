import { useEffect, useRef } from 'react';
import { sendAnalytics } from './useAnalytics';
import { SammenligningsType } from '../Forside/vurderingstekster';

interface NavigereEventProperties {
    url: string;
    destinasjon?: string;
    lenketekst?: string;
}

export const appnavn = 'sykefravarsstatistikk';

type SendNavigereEvent = (navigereEventProperties: NavigereEventProperties & Object) => void;
type SendEvent = (område: string, hendelse: string, data?: Object) => void;

export type EventData = { [key: string]: any };

/**
 * @deprecated skal på sikt fjernes. Vi skal ikke lenger skrive appnavn i selve eventen, det puttes heller i event properties.
 */
export const sendEventDirekte = (område: string, hendelse: string, data?: EventData): void => {
    const type = ['#sykefravarsstatistikk', område, hendelse].join('-');
    sendAnalytics({
        type,
        data,
    });
};

export const useSendNavigereEvent = (): SendNavigereEvent => {
    return (navigereEventProperties: NavigereEventProperties & EventData) => {
        const eventdata = {
            app: appnavn,
        };
        navigereEventProperties.url = navigereEventProperties.url.split('?')[0];
        sendAnalytics({
            type: 'navigere',
            data: {
                ...eventdata,
                ...navigereEventProperties,
            },
        });
    };
};

export const sendKnappEvent = (pathname: string | undefined, label: string) => {
    const data = {
        app: appnavn,
        url: pathname,
        label: label,
    };

    sendAnalytics({
        type: 'knapp',
        data,
    });
};

export const sendSidevisningEvent = (pathname: string = window.location.pathname) => {
    const data = {
        app: appnavn,
        url: pathname,
    };

    sendAnalytics({
        type: 'sidevisning',
        data,
    });
};

export const sendInputfeltUtfyltEvent = (pathname: string, label: string) => {
    const data = {
        app: appnavn,
        url: pathname,
        label: label,
    };

    sendAnalytics({
        type: 'inputfelt-utfylt',
        data,
    });
};

/**
 * @deprecated skal på sikt ikke brukes; "ekstradata" settes i stedet som user properties.
 */
export const useSendEvent = (): SendEvent => {
    return (område: string, hendelse: string, data?: EventData) =>
        sendEventDirekte(område, hendelse, { ...data });
};

/**
 * @deprecated erstattes på sikt av sendSidevisningEvent
 */
export const useSendSidevisningEvent = (område: string, orgnr: string | undefined) => {
    const sendEvent = useSendEvent();
    const skalSendeEvent = useRef(true);

    useEffect(() => {
        skalSendeEvent.current = true;
    }, [orgnr]);

    useEffect(() => {
        if (skalSendeEvent.current) {
            skalSendeEvent.current = false;

            sendEvent(område, 'vist');
        }
    }, [orgnr, område, sendEvent]);
};

export function logPanelEkspanderEvent(sammenligningsType: SammenligningsType) {
    sendAnalytics({
        type: 'panel-ekspander',
        data: {
            panelnavn: sammenligningsType,
            app: appnavn,
        },
    });
}