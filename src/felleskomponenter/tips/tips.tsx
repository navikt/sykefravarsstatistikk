import React, { ReactElement } from 'react';

import deTokGrepBilde from './bilder/de-tok-grep.png';
import seKursBilde from './bilder/se-kurs.png';
import stabiltToProsentBilde from './bilder/stabilt-to-prosent.png';

import { Normaltekst } from 'nav-frontend-typografi';
import {
    aldriKjedelig,
    deTokGrep,
    fåNedKorttidsfravær,
    seKurs,
    stabiltToProsent,
} from './tips-innhold';
import { SykefraværResultat } from '../../Forside/barnehage/Speedometer/Speedometer';
import { SammenligningsType } from '../../Forside/barnehage/vurderingstekster';

export interface Tips {
    tittel: string;
    ingress: string;
    tidsbruk?: ReactElement | string;
    href: string;
    img: { src: string; alt: string };
}

export const tipsliste: Tips[] = [
    deTokGrep,
    fåNedKorttidsfravær,
    seKurs,
    stabiltToProsent,
    aldriKjedelig,
];

export const getTips = (type: SammenligningsType, resultat: SykefraværResultat): Tips | null => {
    switch (type) {
        case SammenligningsType.KORTTID:
            return getTipsKorttidsfravær(resultat);
        case SammenligningsType.LANGTID:
            return getTipsLangtidsfravær(resultat);
        case SammenligningsType.TOTALT:
            return getTipsTotaltFravær(resultat);
    }
};

export const getTipsKorttidsfravær = (resultat: SykefraværResultat): Tips | null => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
        case SykefraværResultat.FEIL:
            return null;
        default:
            return fåNedKorttidsfravær;
    }
};

export const getTipsLangtidsfravær = (resultat: SykefraværResultat): Tips | null => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
        case SykefraværResultat.FEIL:
            return null;
        default:
            return seKurs;
    }
};

export const getTipsTotaltFravær = (resultat: SykefraværResultat): Tips | null => {
    switch (resultat) {
        case SykefraværResultat.OVER:
            return deTokGrep;
        case SykefraværResultat.MIDDELS:
            return stabiltToProsent;
        case SykefraværResultat.UNDER:
            return aldriKjedelig;
        default:
            return null;
    }
};

export const tipsvariasjoner: Tips[] = [
    {
        tittel:
            'Det høye sykefraværet var frustrerende både for ledere og ansatte. Så tok de grep.',
        ingress:
            'Les mer om hvordan barnehagen reduserte sykefraværet og fikk mer tid til faglig utvikling.',
        tidsbruk: 'Artikkel: 3 min',
        href:
            'https://www.idebanken.org/inspirasjon/artikler/det-hoye-sykefravaeret-var-frustrerende-for-bade-ledere-og-ansatte.sa-tok-de-grep',
        img: { src: deTokGrepBilde, alt: '' },
    },
    {
        tittel: 'Sånn reduserte de sykefraværet',
        ingress:
            '«I fjor gikk mye av min arbeidstid til å finne vikarer og stille opp der det trengtes. Nå kan jeg bruke tiden min på det jeg skal gjøre – utvikle medarbeidere og barnehagen. Det er fantastisk!»',
        tidsbruk: 'Artikkel: 3 min',
        href:
            'https://www.idebanken.org/inspirasjon/artikler/det-hoye-sykefravaeret-var-frustrerende-for-bade-ledere-og-ansatte.sa-tok-de-grep',
        img: { src: deTokGrepBilde, alt: '' },
    },
    {
        tittel: 'Se kurs om å følge opp sykefravær',
        ingress:
            'Her får du korte nettkurs som tar for seg lovkrav og hvordan du gjennomfører sykefraværsoppfølging i praksis.',
        tidsbruk: 'Kurs fra: 12 min – 22 min',
        href: '#',
        img: { src: seKursBilde, alt: '' },
    },
    {
        tittel: 'Hvordan følge opp sykefravær?',
        ingress: 'Se korte nettkurs om lovkrav og hvordan du følger opp sykefraværet i praksis.',
        tidsbruk: 'Kurs fra: 12 min – 22 min',
        href: '#',
        img: { src: seKursBilde, alt: '' },
    },
    {
        tittel: 'Barnehagen har et stabilt sykefravær på to prosent. Hva er forklaringen?',
        ingress:
            'Les mer om hvordan barnehagen har jobbet med utvikling av barnehagen, samarbeid og kultur for å få et stabilt lavt sykefravær.',
        tidsbruk: (
            <>
                <Normaltekst>Video: 4:20 min</Normaltekst>
                <Normaltekst>Artikkel: 3 min</Normaltekst>
            </>
        ),
        href: 'https://www.idebanken.org/inspirasjon/artikler/her-har-de-nesten-ikke-sykefravaer',
        img: { src: stabiltToProsentBilde, alt: '' },
    },
    {
        tittel: 'Her har de nesten ikke sykefravær',
        ingress:
            'Mange barnehager sliter med høyt sykefravær. Hos Maritippen barnehage ligger sykefraværet stabilt på to prosent. Hva er forklaringen?',
        tidsbruk: (
            <>
                <Normaltekst>Video: 4:20 min</Normaltekst>
                <Normaltekst>Artikkel: 3 min</Normaltekst>
            </>
        ),
        href: 'https://www.idebanken.org/inspirasjon/artikler/her-har-de-nesten-ikke-sykefravaer',
        img: { src: stabiltToProsentBilde, alt: '' },
    },
];
