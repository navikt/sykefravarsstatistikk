import { sendAnalytics } from './useAnalytics';

export const app = 'sykefravarsstatistikk';
export type EventProperties = { app: string; url: string; [key: string]: any };

export const sendNavigereEvent = (destinasjon: string, lenketekst: string) => {
    sendAnalytics({
        eventname: 'navigere',
        eventProperties: {
            app,
            url: window.location.pathname,
            destinasjon: destinasjon,
            lenketekst: lenketekst,
        },
    });
};

export const sendKnappEvent = (label: string) => {
    sendAnalytics({
        eventname: 'knapp',
        eventProperties: {
            app,
            url: window.location.pathname,
            label: label,
        },
    });
};

export const sendSidevisningEvent = () => {
    sendAnalytics({
        eventname: 'sidevisning',
        eventProperties: {
            app,
            url: window.location.pathname,
        },
    });
};

export const sendInputfeltUtfyltEvent = (label: string, name: string) => {
    sendAnalytics({
        eventname: 'inputfelt-utfylt',
        eventProperties: {
            app,
            url: window.location.pathname,
            label: label,
            name: name,
        },
    });
};

export const sendBedriftValgtEvent = () => {
    sendAnalytics({
        eventname: 'bedrift-valgt',
        eventProperties: {
            app,
            url: window.location.pathname,
        },
    });
};

export function sendPanelEkspanderEvent(panelnavn: string) {
    sendAnalytics({
        eventname: 'panel-ekspander',
        eventProperties: {
            app,
            panelnavn,
            url: window.location.pathname,
        },
    });
}
