import React, { FunctionComponent, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import Lenke from 'nav-frontend-lenker';
import InternLenke from '../felleskomponenter/InternLenke/InternLenke';
import { PATH_FORSIDE, PATH_HISTORIKK, PATH_KALKULATOR } from '../App';

export interface Brødsmule {
    side: string;
    overordnetSide: string | undefined;
    lenketekst: string;
    lenke: (innhold: string | ReactElement, ariaCurrentLocation?: boolean) => ReactElement;
    href: (orgnr: string | undefined) => string;
    handleMedReactRouter?: boolean;
}

const LenkeSomBeholderQuery: FunctionComponent<{ href: string }> = (props) => {
    const location = useLocation();
    return <Lenke href={props.href + location.search}>{props.children}</Lenke>;
};

export type BrødsmulestiConfig = Brødsmule[];

const medOrgnrQuery = (href: string, orgnr: string | undefined): string => orgnr ? href + '?bedrift=' + orgnr : href;

export const defaultBrødsmulestiConfig: BrødsmulestiConfig = [
    {
        side: 'minSideArbeidsgiver',
        lenketekst: 'Min side – arbeidsgiver',
        overordnetSide: undefined,
        href: (orgnr) => medOrgnrQuery('/min-side-arbeidsgiver/', orgnr),
        lenke: (innhold: string | ReactElement) => (
            <LenkeSomBeholderQuery href={'/min-side-arbeidsgiver/'}>
                {innhold}
            </LenkeSomBeholderQuery>
        ),
    },
    {
        side: 'sykefraværsstatistikk',
        overordnetSide: 'minSideArbeidsgiver',
        lenketekst: 'Sykefraværsstatistikk',
        href: (orgnr) => medOrgnrQuery(PATH_FORSIDE, orgnr),
        handleMedReactRouter: true,
        lenke: (innhold: string | ReactElement, ariaCurrentLocation?: boolean) => (
            <InternLenke pathname={PATH_FORSIDE} ariaCurrentLocation={ariaCurrentLocation}>
                {innhold}
            </InternLenke>
        ),
    },
    {
        side: 'kalkulator',
        overordnetSide: 'sykefraværsstatistikk',
        lenketekst: 'Kostnadskalkulator',
        href: (orgnr) => medOrgnrQuery(PATH_KALKULATOR, orgnr),
        handleMedReactRouter: true,
        lenke: (innhold: string | ReactElement, ariaCurrentLocation?: boolean) => (
            <InternLenke pathname={PATH_KALKULATOR} ariaCurrentLocation={ariaCurrentLocation}>
                {innhold}
            </InternLenke>
        ),
    },
    {
        side: 'historikk',
        overordnetSide: 'sykefraværsstatistikk',
        lenketekst: 'Sykefraværshistorikk',
        href: (orgnr) => medOrgnrQuery(PATH_HISTORIKK, orgnr),
        handleMedReactRouter: true,
        lenke: (innhold: string | ReactElement, ariaCurrentLocation?: boolean) => (
            <InternLenke pathname={PATH_HISTORIKK} ariaCurrentLocation={ariaCurrentLocation}>
                {innhold}
            </InternLenke>
        ),
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
