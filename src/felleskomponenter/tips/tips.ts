import tipsbildePlaceholder from './tipsbildePlaceholder.svg';
import bilde1 from './bilde1.png';
import bilde2 from './bilde2.png';
import bilde3 from './bilde3.png';

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

export const diverseTips: Tips[] = [
    KVALITET_TIPS,
    {
        tittel:
            'Kanskje du burde tenke på å gjøre ekstra mye for å redusere sykefraværet i Korona-perioden?',
        ingress: 'Hvorfor? Når kan det brukes?',
        antallMinutter: 20,
        lenke: { href: 'https://nav.no', tekst: 'Gå til verktøy (åpnes i ny fane)' },
        img: { src: tipsbildePlaceholder, alt: 'placeholder-bilde' },
    },
    {
        tittel: 'Klikk her for tips',
        ingress:
            'Sånn kan det gå når man skal unngå sykefraværet hos virksomheter med veldig lange ingresser som kanskje gjør at tipset ikke ser så bra ut. Kanskje gjøre ingressen ENDA lenger også, så det blir over maksimalt antall linjer? Dette ser nok rart ut ja',
        antallMinutter: 20,
        lenke: { href: 'https://nav.no', tekst: 'lenke' },
        img: { src: bilde3, alt: 'placeholder-bilde' },
    },
    {
        tittel: 'kort tittel',
        ingress: 'kort ingress',
        antallMinutter: 20,
        lenke: { href: 'https://nav.no', tekst: 'lenke' },
        img: { src: bilde1, alt: 'placeholder-bilde' },
    },
    {
        tittel: 'bare 1 minutt',
        ingress: 'kort ingress',
        antallMinutter: 1,
        lenke: { href: 'https://nav.no', tekst: 'lenke' },
        img: { src: bilde2, alt: 'placeholder-bilde' },
    },
];
