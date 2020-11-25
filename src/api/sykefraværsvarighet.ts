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
    summertKorttidsOgLangtidsfravær: SummertKorttidsOgLangtidsfravær;
}

export interface SummertSykefravær {
    prosent: number | null;
    tapteDagsverk: number | null;
    muligeDagsverk: number | null;
    kvartaler: ÅrstallOgKvartal[];
    erMaskert: boolean;
}

export interface SummertKorttidsOgLangtidsfravær {
    summertKorttidsfravær: SummertSykefravær;
    summertLangtidsfravær: SummertSykefravær;
}

export const erMaskert = (sykefraværsvarighet: SummertKorttidsOgLangtidsfravær) => {
    return sykefraværsvarighet.summertLangtidsfravær.erMaskert;
};

export type RestSummertSykefraværshistorikk = RestRessurs<SummertSykefraværshistorikk[]>;
