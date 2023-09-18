import { BASE_PATH, PATH_FORSIDE } from '../konstanter';

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

export const getdefaultBrødsmulestiConfig = (minSideUrl?: string): BrødsmulestiConfig => {
    return [
        {
            side: 'minSideArbeidsgiver',
            lenketekst: 'Min side – arbeidsgiver',
            overordnetSide: undefined,
            href: minSideUrl ? minSideUrl : '/min-side-arbeidsgiver/',
            handleMedReactRouter: false,
        },
        {
            side: 'forebyggeFravar',
            lenketekst: 'Forebygge fravær',
            overordnetSide: 'minSideArbeidsgiver',
            href: '/forebygge-fravar/',
            handleMedReactRouter: false,
        },
        {
            side: 'sykefraværsstatistikk',
            overordnetSide: 'forebyggeFravar',
            lenketekst: 'Sykefraværsstatistikk',
            href: BASE_PATH + PATH_FORSIDE,
            handleMedReactRouter: true,
        },
    ];
};

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
