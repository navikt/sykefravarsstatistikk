import { useEffect, useState } from 'react';
import { hentRestSammenligning } from './api';

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
export const getRestSammenligningStatus = (responseStatus: number): RestSammenligningStatus => {
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

export const useRestSammenligning = (orgnr: string | undefined): RestSammenligning => {
    const [restSammenligning, setRestSammenligning] = useState<RestSammenligning>({
        status: RestSammenligningStatus.LasterInn,
        sammenligning: defaultSammenligning,
    });

    useEffect(() => {
        if (orgnr) {
            setRestSammenligning({
                status: RestSammenligningStatus.LasterInn,
                sammenligning: defaultSammenligning,
            });

            const getSammenligningOgSettState = async () => {
                let restSammenligningResponse = await hentRestSammenligning(orgnr);
                setRestSammenligning(restSammenligningResponse);
            };
            getSammenligningOgSettState();
        }
    }, [orgnr]);

    return restSammenligning;
};
