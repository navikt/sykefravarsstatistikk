import { RestRessurs } from './api-utils';
import { ÅrstallOgKvartal } from '../utils/sykefraværshistorikk-utils';

export interface SykefraværSiste4Kvartaler {
    prosent: number | null;
    tapteDagsverk: number | null;
    muligeDagsverk: number | null;
    kvartaler: ÅrstallOgKvartal[];
    erMaskert: boolean;
}

export interface Sykefraværsvarighet {
    korttidsfraværSiste4Kvartaler: SykefraværSiste4Kvartaler;
    langtidsfraværSiste4Kvartaler: SykefraværSiste4Kvartaler;
}

export const erMaskert = (sykefraværsvarighet: Sykefraværsvarighet) => {
    return sykefraværsvarighet.langtidsfraværSiste4Kvartaler.erMaskert;
};

export const harSykefravær = (sykefraværsvarighet: Sykefraværsvarighet) => {
    return sykefraværsvarighet.langtidsfraværSiste4Kvartaler.kvartaler.length !== 0;
};

export type RestSykefraværsvarighet = RestRessurs<Sykefraværsvarighet>;
