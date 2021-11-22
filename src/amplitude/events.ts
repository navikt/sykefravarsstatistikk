import { amplitudeClient } from './client';
import { useEkstraDataRef } from './ekstradata';
import { useEffect, useRef } from 'react';

interface NavigereEventProperties {
    url: string;
    destinasjon?: string;
    lenketekst?: string;
}

const appnavn = 'sykefravarsstatistikk';

type SendNavigereEvent = (navigereEventProperties: NavigereEventProperties & Object) => void;
type SendEvent = (område: string, hendelse: string, data?: Object) => void;

export type EventData = { [key: string]: any };

/**
 * @deprecated skal på sikt fjernes. Vi skal ikke lenger skrive appnavn i selve eventen, det puttes heller i event properties.
 */
export const sendEventDirekte = (område: string, hendelse: string, data?: EventData): void => {
    amplitudeClient.logEvent(['#sykefravarsstatistikk', område, hendelse].join('-'), data);
};

export const useSendNavigereEvent = (): SendNavigereEvent => {
    const ekstradata = useEkstraDataRef();

    return (navigereEventProperties: NavigereEventProperties & EventData) => {
        const eventdata = {
            app: appnavn,
        };
        navigereEventProperties.url = navigereEventProperties.url.split('?')[0];
        amplitudeClient.logEvent('navigere', {
            ...eventdata,
            ...ekstradata.current,
            ...navigereEventProperties,
        });
    };
};

export const sendKnappEvent = (pathname: string | undefined, label: string) => {
    const eventdata = {
        app: appnavn,
        url: pathname,
        label: label,
    };

    amplitudeClient.logEvent('knapp', eventdata);
};

export const sendSidevisningEvent = (pathname: string | undefined) => {
    const eventdata = {
        app: appnavn,
        url: pathname,
    };

    amplitudeClient.logEvent('sidevisning', eventdata);
};

export const sendInputfeltUtfyltEvent = (pathname: string, label: string) => {
    const eventdata = {
        app: appnavn,
        url: pathname,
        label: label,
    };

    amplitudeClient.logEvent('inputfelt-utfylt', eventdata);
};

/**
 * @deprecated skal på sikt ikke brukes; "ekstradata" settes i stedet som user properties.
 */
export const useSendEvent = (): SendEvent => {
    const ekstradata = useEkstraDataRef();

    return (område: string, hendelse: string, data?: EventData) =>
        sendEventDirekte(område, hendelse, { ...ekstradata.current, ...data });
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
