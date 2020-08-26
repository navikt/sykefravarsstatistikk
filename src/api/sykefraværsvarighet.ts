import { RestRessurs } from './api-utils';
import { ÅrstallOgKvartal } from '../utils/sykefraværshistorikk-utils';

interface SykefraværSiste4Kvartaler {
    prosent: number;
    tapteDagsverk: number;
    muligeDagsverk: number;
    kvartaler: ÅrstallOgKvartal[];
} // TODO: Maskering osv

export interface Sykefraværsvarighet {
    korttidsfraværSiste4Kvartaler: SykefraværSiste4Kvartaler;
    langtidsfraværSiste4Kvartaler: SykefraværSiste4Kvartaler;
}

export type RestSykefraværsvarighet = RestRessurs<Sykefraværsvarighet>;
