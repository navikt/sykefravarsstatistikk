import { useEffect, useRef } from 'react';
import { sendAnalytics } from './useAnalytics';
import { SammenligningsType } from '../Forside/vurderingstekster';

export const appnavn = 'sykefravarsstatistikk';
export type EventData = { app: string; url: string; [key: string]: any };

/**
 * @deprecated skal på sikt fjernes. Vi skal ikke lenger skrive appnavn i selve eventen, det puttes heller i event properties.
 */
export const sendEventDirekte = (område: string, hendelse: string, data: EventData): void => {
    const type = ['#sykefravarsstatistikk', område, hendelse].join('-');
    sendAnalytics({
        eventname: type,
        data: data,
    });
};

export const sendNavigereEvent = (destinasjon: string, lenketekst: string) => {
    sendAnalytics({
        eventname: 'navigere',
        data: {
            app: appnavn,
            url: window.location.hostname,
            destinasjon: destinasjon,
            lenketekst: lenketekst,
        },
    });
};

export const sendKnappEvent = (pathname: string | undefined, label: string) => {
    const data = {
        app: appnavn,
        url: pathname,
        label: label,
    };

    sendAnalytics({
        eventname: 'knapp',
        data,
    });
};

export const sendSidevisningEvent = (pathname: string = window.location.pathname) => {
    const data: Side = {
        app: appnavn,
        url: pathname,
    };

    sendAnalytics({
        eventname: 'sidevisning',
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
        eventname: 'inputfelt-utfylt',
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
        eventname: 'panel-ekspander',
        data: {
            panelnavn: sammenligningsType,
            app: appnavn,
        },
    });
}