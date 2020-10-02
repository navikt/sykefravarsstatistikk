import React, { ReactElement } from 'react';

import deTokGrep from './bilder/de-tok-grep.png';
import fåNedKorttidsfravær from './bilder/få-ned-korttidsfravær.png';
import seKurs from './bilder/se-kurs.png';
import stabiltToProsent from './bilder/stabilt-to-prosent.png';
import aldriKjedelig from './bilder/aldri-kjedelig.png';

import { Normaltekst } from 'nav-frontend-typografi';

export interface Tips {
    tittel: string;
    ingress: string;
    tidsbruk: ReactElement | string;
    href: string;
    img: { src: string; alt: string };
}

export const tipsliste: Tips[] = [
    {
        tittel:
            'Det høye sykefraværet var frustrerende både for ledere og ansatte. Så tok de grep.',
        ingress:
            'Les mer om hvordan barnehagen reduserte sykefraværet og fikk mer tid til faglig utvikling.',
        tidsbruk: 'Artikkel: 3 min',
        href:
            'https://www.idebanken.org/inspirasjon/artikler/det-hoye-sykefravaeret-var-frustrerende-for-bade-ledere-og-ansatte.sa-tok-de-grep',
        img: { src: deTokGrep, alt: '' },
    },
    {
        tittel: 'Hvordan få ned korttidsfraværet?',
        ingress:
            'Her får du praktisk hjelp til hvordan du kan finne gode løsninger sammen med dine ansatte.',
        tidsbruk: 'Artikkel: 3 min',
        href: 'https://www.idebanken.org/kloke-grep/artikler/hvordan-fa-ned-korttidsfravaeret',
        img: { src: fåNedKorttidsfravær, alt: '' },
    },
    {
        tittel: 'Se kurs om å følge opp sykefravær',
        ingress:
            'Her får du korte nettkurs som tar for seg lovkrav og hvordan du gjennomfører sykefraværsoppfølging i praksis.',
        tidsbruk: 'Kurs fra: 12 min – 22 min',
        href: '#',
        img: { src: seKurs, alt: '' },
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
        href: '#',
        img: { src: stabiltToProsent, alt: '' },
    },
    {
        tittel: 'Her er det aldri en kjedelig dag på jobb',
        ingress:
            'Les mer om hvordan barnehagen har jobbet med HMS og arbeidsmiljø til det beste for barna.',
        tidsbruk: 'Artikkel: 4 min',
        href: '#',
        img: { src: aldriKjedelig, alt: '' },
    },
];
