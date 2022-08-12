import { sendAnalytics } from '../hooks/useAnalytics';

export const sendNavigereEvent = (destinasjon: string, lenketekst: string) => {
    sendAnalytics('navigere', {
        destinasjon,
        lenketekst,
    });
};

export const sendKnappEvent = (label: string) => {
    sendAnalytics('knapp', { label });
};

export const sendSidevisningEvent = () => {
    sendAnalytics('sidevisning');
};

export const sendInputfeltUtfyltEvent = (label: string, name: string) => {
    sendAnalytics('inputfelt-utfylt', {
        label,
        name,
    });
};

export const sendBedriftValgtEvent = () => {
    sendAnalytics('bedrift-valgt');
};

export function sendPanelEkspanderEvent(panelnavn: string) {
    sendAnalytics('panel-ekspander', { panelnavn });
}

export function sendPanelKollapsEvent(panelnavn: string) {
    sendAnalytics('panel-kollaps', { panelnavn });
}

export function sendTilbakemeldingFraBrukerEvent(id: string, type?: string, verdi?: any) {
    sendAnalytics('tilbakemelding-fra-bruker', {
        id,
        type,
        verdi,
    });
}
