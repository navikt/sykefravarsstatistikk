import deTokGrepBilde from './bilder/de-tok-grep.png';
import fåNedKorttidsfraværBilde from './bilder/få-ned-korttidsfravær.png';
import seKursForebyggeSykefraværBilde from './bilder/se-kurs-forebygge_sykefravær.png';
import seKursFølgeOppSykefraværBilde from './bilder/se-kurs-følge-opp-sykefravær.png';
import seKursFølgeOppSykefraværBarnehagerBilde from './bilder/se-kurs-følge-opp-sykefravær-barnehager.png';
import seKursFølgeOppSykehjemBarnehagerBilde from './bilder/se-kurs-følge-opp-sykefravær-sykehjem.png';
import barnehagerKoblerErgonomiOgPedagogikkBilde from './bilder/bhg-kobler-ergonomi-og-pedagogikk.jpeg';
import { Normaltekst } from 'nav-frontend-typografi';
import stabiltToProsentBilde from './bilder/stabilt-to-prosent.png';
import tipsOgRådArbeidsmiljøSykefraværBilde from './bilder/tips-og-råd-arbeidsmiljø-sykefravær.png';
import aldriKjedeligBilde from './bilder/aldri-kjedelig.png';
import React from 'react';
import { Tips } from './tips';

// TODO Vi må sette på alt-tekster
export const deTokGrep: Tips = {
    id: 'de-tok-grep',
    tittel: 'Det høye sykefraværet var frustrerende både for ledere og ansatte. Så tok de grep.',
    ingress:
        'Les mer om hvordan barnehagen reduserte sykefraværet og fikk mer tid til faglig utvikling.',
    tidsbruk: 'Artikkel: 3 min',
    href:
        'https://www.idebanken.org/inspirasjon/artikler/det-hoye-sykefravaeret-var-frustrerende-for-bade-ledere-og-ansatte.sa-tok-de-grep',
    img: { src: deTokGrepBilde, alt: '' },
};

export const fåNedKorttidsfravær: Tips = {
    id: 'få-ned-korttidsfravær',
    tittel: 'Hvordan få ned korttidsfraværet?',
    ingress:
        'Her får du praktisk hjelp til hvordan du kan finne gode løsninger sammen med dine ansatte.',
    href: 'https://www.idebanken.org/kloke-grep/artikler/hvordan-fa-ned-korttidsfravaeret',
    img: { src: fåNedKorttidsfraværBilde, alt: '' },
};
export const seKursForebyggeSykefravær: Tips = {
    id: 'se-kurs-forebygge',
    tittel: 'Se kurs om hvordan forebygge sykefravær',
    ingress:
        'Her får du korte nettkurs som tar for seg lovkrav og hvordan du gjennomfører sykefraværsoppfølging i praksis.',
    tidsbruk: 'Kurs fra: 12 min – 22 min',
    href: 'https://vimeo.com/showcase/6728594',
    img: { src: seKursForebyggeSykefraværBilde, alt: '' },
};
export const seKursFølgeOppSykefravær: Tips = {
    id: 'se-kurs-følge-opp',
    tittel: 'Se kurs om å følge opp sykefravær',
    ingress:
        'Her får du korte nettkurs som tar for seg lovkrav og hvordan du gjennomfører sykefraværsoppfølging i praksis.',
    tidsbruk: 'Kurs fra: 12 min – 22 min',
    href: 'https://vimeo.com/showcase/6728595',
    img: { src: seKursFølgeOppSykefraværBilde, alt: '' },
};
export const seKursFølgeOppSykefraværBarnehager: Tips = {
    // TODO Sjekke tekster med Monica
    id: 'se-kurs-følge-opp-barnehager',
    tittel: 'Se kurs om å følge opp sykefravær',
    ingress:
        'Her får du korte nettkurs som tar for seg lovkrav og hvordan du gjennomfører sykefraværsoppfølging i praksis.',
    tidsbruk: 'Kurs fra: 12 min – 22 min',
    href: 'https://vimeo.com/showcase/7671659',
    img: { src: seKursFølgeOppSykefraværBarnehagerBilde, alt: '' },
};
export const seKursFølgeOppSykefraværSykehjem: Tips = {
    // TODO Sjekke tekster med Monica
    id: 'se-kurs-følge-opp-barnehager-sykehjem',
    tittel: 'Se kurs om å følge opp sykefravær',
    ingress:
        'Her får du korte nettkurs som tar for seg lovkrav og hvordan du gjennomfører sykefraværsoppfølging i praksis.',
    tidsbruk: 'Kurs fra: 12 min – 22 min',
    href: 'https://vimeo.com/showcase/7733192',
    img: { src: seKursFølgeOppSykehjemBarnehagerBilde, alt: '' },
};
export const stabiltToProsent: Tips = {
    id: 'stabilt-to-prosent',
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
export const aldriKjedelig: Tips = {
    id: 'aldri-kjedelig',
    tittel: 'Her er det aldri en kjedelig dag på jobb',
    ingress:
        'Les mer om hvordan barnehagen har jobbet med HMS og arbeidsmiljø til det beste for barna.',
    tidsbruk: 'Artikkel: 4 min',
    href: 'https://mag.idebanken.org/norrona/',
    img: { src: aldriKjedeligBilde, alt: '' },
};
export const barnehagerKoblerErgonomiOgPedagogikk: Tips = {
    id: 'koble-ergonomi-pedagogikk',
    tittel: 'Barnehage kobler ergonomi og pedagogikk',
    ingress:
        'Se mer om hvordan pedagogisk utvikling har redusert muskel- og skjelettplager hos ansatte.',
    tidsbruk: (
        <>
            <Normaltekst>Video: 4:13 min</Normaltekst>
        </>
    ),
    href:
        'https://www.idebanken.org/inspirasjon/artikler/filmer/video-barnehage-med-nyskapende-kobling-mellom-ergonomi-og-pedagogikk',
    img: { src: barnehagerKoblerErgonomiOgPedagogikkBilde, alt: '' },
};
export const tipsOgRådArbeidsmiljøSykefravær: Tips = {
    // todo må fylles ut ordentlig
    id: 'tips-og-råd-arbeidsmiljø-sykefravær',
    tittel: 'Tips og råd om arbeidsmiljø og sykefravær',
    ingress:
        'Les mer om hvordan barnehagen reduserte sykefraværet og fikk mer tid til faglig utvikling.',
    href: '/',
    img: {
        src: tipsOgRådArbeidsmiljøSykefraværBilde,
        alt: '',
    },
};
