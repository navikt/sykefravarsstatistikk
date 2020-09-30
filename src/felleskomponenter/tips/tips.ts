import tipsbildePlaceholder from './tipsbildePlaceholder.svg';

export interface Tips {
    tittel: string;
    ingress: string;
    antallMinutter: number;
    lenke: { tekst: string; href: string };
    img: { src: string; alt: string };
}

export const KVALITET_TIPS: Tips = {
    tittel: 'Sjekk kvaliteten på sykefraværsarbeidet ditt',
    ingress: 'Hvorfor? Når kan det brukes?',
    antallMinutter: 20,
    lenke: { href: 'https://nav.no', tekst: 'Gå til verktøy (åpnes i ny fane)' },
    img: { src: tipsbildePlaceholder, alt: 'placeholder-bilde' },
};
