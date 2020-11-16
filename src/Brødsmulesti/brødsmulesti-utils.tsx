import React from 'react';
import { PATH_FORSIDE, PATH_HISTORIKK, PATH_KALKULATOR } from '../App';
import { BASE_PATH } from '../konstanter';

export interface Brødsmule {
    side: string;
    overordnetSide: string | undefined;
    lenketekst: string;
    href: string;
    handleMedReactRouter?: boolean;
}

export type BrødsmulestiConfig = Brødsmule[];

export const medOrgnrQuery = (href: string, orgnr: string | undefined): string =>
    orgnr ? href + '?bedrift=' + orgnr : href;

export const defaultBrødsmulestiConfig: BrødsmulestiConfig = [
    {
        side: 'minSideArbeidsgiver',
        lenketekst: 'Min side – arbeidsgiver',
        overordnetSide: undefined,
        href: '/min-side-arbeidsgiver/',
        handleMedReactRouter: false,
    },
    {
        side: 'sykefraværsstatistikk',
        overordnetSide: 'minSideArbeidsgiver',
        lenketekst: 'Sykefraværsstatistikk',
        href: BASE_PATH + PATH_FORSIDE,
        handleMedReactRouter: true,
    },
    {
        side: 'kalkulator',
        overordnetSide: 'sykefraværsstatistikk',
        lenketekst: 'Kostnadskalkulator',
        href: BASE_PATH + PATH_KALKULATOR,
        handleMedReactRouter: true,
    },
    {
        side: 'historikk',
        overordnetSide: 'sykefraværsstatistikk',
        lenketekst: 'Sykefraværshistorikk',
        href: BASE_PATH + PATH_HISTORIKK,
        handleMedReactRouter: true,
    },
];

export const finnBrødsmule = (side: string, config: BrødsmulestiConfig): Brødsmule => {
    return config.filter((smule) => smule.side === side)[0];
};

export const getBrødsmulesti = (
    gjeldendeBrødsmule: Brødsmule,
    config: BrødsmulestiConfig
): Brødsmule[] => {
    const sti = [gjeldendeBrødsmule];

    let overordnetSide = gjeldendeBrødsmule.overordnetSide;
    while (overordnetSide) {
        const brødsmule = finnBrødsmule(overordnetSide, config);
        sti.push(brødsmule);
        overordnetSide = brødsmule.overordnetSide;
    }
    sti.reverse();
    return sti;
};
