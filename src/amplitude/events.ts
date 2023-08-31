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

export const sendBedriftValgtEvent = () => {
    sendAnalytics('bedrift valgt');
};

export function sendCheckboxHuketAv(label1?: string) {
    sendAnalytics('checkbox-huket-av', { label1 });
}

export function sendCheckboxHuketBort(label1?: string) {
    sendAnalytics('checkbox-huket-bort', { label1 });
}

export function sendPanelEkspanderEvent(panelnavn: string) {
    sendAnalytics('panel-ekspander', { panelnavn });
}

export function sendToogleEvent(tekst: 'graf' | 'tabell') {
    sendAnalytics('toogle', { tekst });
}

export function sendPanelKollapsEvent(panelnavn: string) {
    sendAnalytics('panel-kollaps', { panelnavn });
}

export function sendLastetInnloggingssideEvent() {
    const harVirksomhetsvelgerILocalStorage =
        localStorage.getItem('virksomhetsvelger_bedrift') !== null;
    sendAnalytics('lastet innloggingsside', { harVirksomhetsvelgerILocalStorage });
}
