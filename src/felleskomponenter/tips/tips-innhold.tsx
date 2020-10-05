import deTokGrepBilde from './bilder/de-tok-grep.png';
import fåNedKorttidsfraværBilde from './bilder/få-ned-korttidsfravær.png';
import seKursBilde from './bilder/se-kurs.png';
import { Normaltekst } from 'nav-frontend-typografi';
import stabiltToProsentBilde from './bilder/stabilt-to-prosent.png';
import aldriKjedeligBilde from './bilder/aldri-kjedelig.png';
import React from 'react';

export const deTokGrep = {
    tittel: 'Det høye sykefraværet var frustrerende både for ledere og ansatte. Så tok de grep.',
    ingress:
        'Les mer om hvordan barnehagen reduserte sykefraværet og fikk mer tid til faglig utvikling.',
    tidsbruk: 'Artikkel: 3 min',
    href:
        'https://www.idebanken.org/inspirasjon/artikler/det-hoye-sykefravaeret-var-frustrerende-for-bade-ledere-og-ansatte.sa-tok-de-grep',
    img: { src: deTokGrepBilde, alt: '' },
};

export const fåNedKorttidsfravær = {
    tittel: 'Hvordan få ned korttidsfraværet?',
    ingress:
        'Her får du praktisk hjelp til hvordan du kan finne gode løsninger sammen med dine ansatte.',
    href: 'https://www.idebanken.org/kloke-grep/artikler/hvordan-fa-ned-korttidsfravaeret',
    img: { src: fåNedKorttidsfraværBilde, alt: '' },
};
export const seKurs = {
    tittel: 'Se kurs om å følge opp sykefravær',
    ingress:
        'Her får du korte nettkurs som tar for seg lovkrav og hvordan du gjennomfører sykefraværsoppfølging i praksis.',
    tidsbruk: 'Kurs fra: 12 min – 22 min',
    href: '#',
    img: { src: seKursBilde, alt: '' },
};
export const stabiltToProsent = {
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
};
export const aldriKjedelig = {
    tittel: 'Her er det aldri en kjedelig dag på jobb',
    ingress:
        'Les mer om hvordan barnehagen har jobbet med HMS og arbeidsmiljø til det beste for barna.',
    tidsbruk: 'Artikkel: 4 min',
    href: '#',
    img: { src: aldriKjedeligBilde, alt: '' },
};

