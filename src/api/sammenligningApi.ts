import { BASE_PATH } from '../server/konstanter';

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

const sammenligningPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/sammenligning`;

const getRestSammenligningStatus = (responseStatus: number): RestSammenligningStatus => {
    switch (responseStatus) {
        case 200: {
            return RestSammenligningStatus.Suksess;
        }
        case 401: {
            return RestSammenligningStatus.IkkeInnlogget;
        }
        case 403: {
            return RestSammenligningStatus.HarIkkeRettigheterIAltinn;
        }
        default: {
            return RestSammenligningStatus.Error;
        }
    }
};

export const hentRestSammenligning = async (orgnr: string): Promise<RestSammenligning> => {
    const response = await fetch(sammenligningPath(orgnr), {
        method: 'GET',
        credentials: 'include',
    });

    const restSammenligningStatus = getRestSammenligningStatus(response.status);

    if (restSammenligningStatus === RestSammenligningStatus.Suksess) {
        let json = await response.json();
        return {
            status: restSammenligningStatus,
            sammenligning: json,
        };
    } else {
        return {
            status: restSammenligningStatus,
            sammenligning: defaultSammenligning,
        };
    }
};
