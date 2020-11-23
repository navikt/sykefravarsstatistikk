import { RestRessurs } from './api-utils';
import { ÅrstallOgKvartal } from '../utils/sykefraværshistorikk-utils';

export enum Statistikkategori {
    LAND = 'LAND',
    SEKTOR = 'SEKTOR',
    NÆRING = 'NÆRING',
    BRANSJE = 'BRANSJE',
    VIRKSOMHET = 'VIRKSOMHET',
    OVERORDNET_ENHET = 'OVERORDNET_ENHET'
}

export interface SummertSykefraværshistorikk {
    type: Statistikkategori;
    label: string;
    summertKorttidsOgLangtidsfravær: Sykefraværsvarighet;
}

export interface SummertSykefravær {
    prosent: number | null;
    tapteDagsverk: number | null;
    muligeDagsverk: number | null;
    kvartaler: ÅrstallOgKvartal[];
    erMaskert: boolean;
}

export interface Sykefraværsvarighet {
    summertKorttidsfravær: SummertSykefravær;
    summertLangtidsfravær: SummertSykefravær;
}

export const erMaskert = (sykefraværsvarighet: Sykefraværsvarighet) => {
    return sykefraværsvarighet.summertLangtidsfravær.erMaskert;
};

export const harSykefraværEllerErMaskert = (sykefraværsvarighet: Sykefraværsvarighet) => {
    return (
        sykefraværsvarighet.summertLangtidsfravær.erMaskert ||
        sykefraværsvarighet.summertLangtidsfravær.kvartaler.length !== 0
    );
};

export type RestSykefraværsvarighet = RestRessurs<Sykefraværsvarighet>;
export type RestSummertSykefraværshistorikk = RestRessurs<SummertSykefraværshistorikk[]>;
