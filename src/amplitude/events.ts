import { sendAnalytics } from './useAnalytics';

export const appnavn = 'sykefravarsstatistikk';
export type EventData = { app: string; url: string; [key: string]: any };

export const sendNavigereEvent = (destinasjon: string, lenketekst: string) => {
    sendAnalytics({
        eventname: 'navigere',
        data: {
            app: appnavn,
            url: window.location.pathname,
            destinasjon: destinasjon,
            lenketekst: lenketekst,
        },
    });
};

export const sendKnappEvent = (label: string) => {
    sendAnalytics({
        eventname: 'knapp',
        data: {
            app: appnavn,
            url: window.location.pathname,
            label: label,
        },
    });
};

export const sendSidevisningEvent = () => {
    sendAnalytics({
        eventname: 'sidevisning',
        data: {
            app: appnavn,
            url: window.location.pathname,
        },
    });
};

export const sendInputfeltUtfyltEvent = (label: string) => {
    sendAnalytics({
        eventname: 'inputfelt-utfylt',
        data: {
            app: appnavn,
            url: window.location.pathname,
            label: label,
        },
    });
};

export function sendPanelEkspanderEvent(panelnavn: string) {
    sendAnalytics({
        eventname: 'panel-ekspander',
        data: {
            panelnavn,
            url: window.location.pathname,
            app: appnavn,
        },
    });
}
