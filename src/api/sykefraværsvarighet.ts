import { RestRessurs } from './api-utils';
import { ÅrstallOgKvartal } from '../utils/sykefraværshistorikk-utils';

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
