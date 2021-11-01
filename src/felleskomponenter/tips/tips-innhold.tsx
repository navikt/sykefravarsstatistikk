import fåNedKorttidsfraværBilde from './bilder/få-ned-korttidsfravær.png';
import seKursForebyggeSykefraværBilde from './bilder/se-kurs-forebygge_sykefravær.png';
import seKursFølgeOppSykefraværBilde from './bilder/se-kurs-følge-opp-sykefravær.png';
import seKursFølgeOppSykefraværBarnehagerBilde from './bilder/se-kurs-følge-opp-sykefravær-barnehager.png';
import seKursFølgeOppSykefraværSykehjemBilde from './bilder/se-kurs-følge-opp-sykefravær-sykehjem.png';
import tipsOgRådArbeidsmiljøSykefraværBilde from './bilder/tips-og-råd-arbeidsmiljø-sykefravær.png';
import React from 'react';
import { Tips } from './tips';

// TODO Vi må sette på alt-tekster
export const fåNedKorttidsfravær: Tips = {
    id: 'få-ned-korttidsfravær',
    tittel: 'Hvordan få ned korttidsfraværet?',
    ingress:
        'Her får du praktisk hjelp til hvordan du kan finne gode løsninger sammen med dine ansatte.',
    href: 'https://www.idebanken.org/kloke-grep/artikler/hvordan-fa-ned-korttidsfravaeret',
    img: { src: fåNedKorttidsfraværBilde, alt: 'Illustrasjonsbilde fra artikkel' },
};
export const seKursForebyggeSykefravær: Tips = {
    id: 'se-kurs-forebygge',
    tittel: 'Se kurs om hvordan forebygge sykefravær',
    ingress: (
        <>
            Du kan redusere og forebygge sykefravær når du ser arbeidsmiljø og faglig utvikling i
            sammenheng.
            <br />
            Her får du korte nettkurs som blandt annet tar for seg hvordan du samarbeider med
            tillitsvalgte og verneombud og hvordan dere utvikler arbeidsmiljøet.
        </>
    ),
    tidsbruk: 'Kurs fra: 12 min – 16 min',
    href: 'https://vimeo.com/showcase/8652399',
    img: { src: seKursForebyggeSykefraværBilde, alt: 'Forhåndsvisning av nettkurs' },
};
export const seKursFølgeOppSykefravær: Tips = {
    id: 'se-kurs-følge-opp',
    tittel: 'Se kurs om å følge opp sykefravær',
    ingress:
        'Her får du korte nettkurs som tar for seg lovkrav og hvordan du gjennomfører sykefraværsoppfølging i praksis.',
    tidsbruk: 'Kurs fra: 12 min – 22 min',
    href: 'https://vimeo.com/showcase/8652435',
    img: { src: seKursFølgeOppSykefraværBilde, alt: 'Forhåndsvisning av nettkurs' },
};
export const seKursFølgeOppSykefraværBarnehager: Tips = {
    id: 'se-kurs-følge-opp-barnehager',
    tittel: 'Se kurs for barnehager',
    ingress:
        'Her får du korte nettkurs om oppfølging og forebygging av sykefravær. Kursene tar for seg lovkrav og praktiske grep, og er tilpasset din bransje.',
    tidsbruk: 'Kurs fra: 10 min – 18 min',
    href: 'https://vimeo.com/showcase/8652155',
    img: { src: seKursFølgeOppSykefraværBarnehagerBilde, alt: 'Forhåndsvisning av nettkurs' },
};
export const seKursFølgeOppSykefraværSykehjem: Tips = {
    id: 'se-kurs-følge-opp-sykehjem',
    tittel: 'Se kurs for sykehjem',
    ingress:
        'Her får du korte nettkurs om oppfølging og forebygging av sykefravær. Kursene tar for seg lovkrav og praktiske grep, og er tilpasset din bransje.',
    tidsbruk: 'Kurs fra: 10 min – 18 min',
    href: 'https://vimeo.com/showcase/8652020',
    img: { src: seKursFølgeOppSykefraværSykehjemBilde, alt: 'Forhåndsvisning av nettkurs' },
};
export const tipsOgRådArbeidsmiljøSykefravær: Tips = {
    id: 'tips-og-råd-arbeidsmiljø-sykefravær',
    tittel: 'Tips og råd om arbeidsmiljø og sykefravær',
    ingress: (
        <>
            Les mer om hvordan du kan:
            <ul style={{ marginBottom: 0, marginTop: '0.5rem' }}>
                <li>bli bedre til å følge opp sykmeldte</li>
                <li>få ned et høyt sykefravær</li>
                <li>utvikle arbeidsmiljøet</li>
            </ul>
        </>
    ),
    href: 'https://www.idebanken.org/',
    img: {
        src: tipsOgRådArbeidsmiljøSykefraværBilde,
        alt: 'Illustrasjonsbilde',
    },
};
