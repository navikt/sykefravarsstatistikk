import { amplitudeClient } from './client';
import { useEkstraDataRef } from './ekstradata';
import { useEffect, useRef } from 'react';

interface NavigereEventProperties {
    url: string;
    destinasjon?: string;
    lenketekst?: string;
}

type SendNavigereEvent = (navigereEventProperties: NavigereEventProperties & Object) => void;
type SendEvent = (område: string, hendelse: string, data?: Object) => void;

export type EventData = { [key: string]: any };

export const sendEventDirekte = (område: string, hendelse: string, data?: EventData): void => {
    amplitudeClient.logEvent(['#sykefravarsstatistikk', område, hendelse].join('-'), data);
};

export const useSendNavigereEvent = (): SendNavigereEvent => {
    const ekstradata = useEkstraDataRef();

    return (navigereEventProperties: NavigereEventProperties & EventData) => {
        const metadata = {
            app: 'sykefravarsstatistikk',
        };
        navigereEventProperties.url = navigereEventProperties.url.split('?')[0];
        amplitudeClient.logEvent('navigere', {
            ...metadata,
            ...ekstradata.current,
            ...navigereEventProperties,
        });
    };
};

export const useSendEvent = (): SendEvent => {
    const ekstradata = useEkstraDataRef();

    return (område: string, hendelse: string, data?: EventData) =>
        sendEventDirekte(område, hendelse, { ...ekstradata.current, ...data });
};

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