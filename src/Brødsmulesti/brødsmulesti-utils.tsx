import React, { FunctionComponent, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import Lenke from 'nav-frontend-lenker';
import InternLenke from '../felleskomponenter/InternLenke/InternLenke';
import { PATH_FORSIDE, PATH_KALKULATOR } from '../App';

export interface Brødsmule {
    side: string;
    lenketekst: string;
    lenke: (innhold: string | ReactElement) => ReactElement;
}

const LenkeTilSomBeholderQuery: FunctionComponent<{ href: string }> = props => {
    const location = useLocation();
    return <Lenke href={props.href + location.search}>{props.children}</Lenke>;
};

export type BrødsmulestiConfig = Brødsmule[];

export const defaultBrødsmulestiConfig: BrødsmulestiConfig = [
    {
        side: 'minSideArbeidsgiver',
        lenketekst: 'Min side – arbeidsgiver',
        lenke: (innhold: string | ReactElement) => (
            <LenkeTilSomBeholderQuery href={'/min-side-arbeidsgiver/'}>
                {innhold}
            </LenkeTilSomBeholderQuery>
        ),
    },
    {
        side: 'sykefraværsstatistikk',
        lenketekst: 'Sykefraværsstatistikk',
        lenke: (innhold: string | ReactElement) => (
            <InternLenke pathname={PATH_FORSIDE}>{innhold}</InternLenke>
        ),
    },
    {
        side: 'kalkulator',
        lenketekst: 'Kostnadskalkulator',
        lenke: (innhold: string | ReactElement) => (
            <InternLenke pathname={PATH_KALKULATOR}>{innhold}</InternLenke>
        ),
    },
];
