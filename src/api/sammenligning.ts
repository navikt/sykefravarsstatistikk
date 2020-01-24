export enum RestSammenligningStatus {
    'Suksess',
    'LasterInn',
    'HarIkkeRettigheterIAltinn',
    'IkkeInnlogget',
    'Error',
}

export type Sammenligning = {
    kvartal: number;
    årstall: number;
    land: Sykefraværprosent;
    sektor: Sykefraværprosent;
    næring?: Sykefraværprosent;
    bransje?: Sykefraværprosent;
    virksomhet: Sykefraværprosent;
};

export type Sykefraværprosent = {
    label: string;
    prosent: number | null;
    erMaskert?: boolean;
};

export type RestSammenligning = {
    status: RestSammenligningStatus;
    sammenligning: Sammenligning;
};

const defaultSykefraværprosent: Sykefraværprosent = {
    label: '',
    prosent: 0.0,
};

export const defaultSammenligning: Sammenligning = {
    kvartal: 1,
    årstall: 2019,
    land: {
        label: 'Norge',
        prosent: 0.0,
    },
    sektor: defaultSykefraværprosent,
    næring: defaultSykefraværprosent,
    virksomhet: defaultSykefraværprosent,
};
