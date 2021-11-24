import { sendAnalytics } from './useAnalytics';
import { SammenligningsType } from '../Forside/vurderingstekster';

export const appnavn = 'sykefravarsstatistikk';
export type EventData = { app: string; url: string; [key: string]: any };

export const sendNavigereEvent = (destinasjon: string, lenketekst: string) => {
    console.log('WINDOW ER: sendNavigereEvent', window.location.pathname);
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
    console.log('WINDOW ER: sendSidevisningEvent ', window.location.pathname);
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

export function logPanelEkspanderEvent(sammenligningsType: SammenligningsType) {
    console.log('WINDOW ER: logPanelEkspanderEvent', window.location.pathname);
    sendAnalytics({
        eventname: 'panel-ekspander',
        data: {
            panelnavn: sammenligningsType,
            url: window.location.pathname,
            app: appnavn,
        },
    });
}
