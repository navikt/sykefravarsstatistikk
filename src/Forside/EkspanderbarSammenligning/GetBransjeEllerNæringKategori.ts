import { RestAggregertStatistikk } from '../../hooks/useAggregertStatistikk';
import { Statistikkategori } from '../../domene/statistikkategori';

export const getBransjeEllerNæringKategori = (aggregertStatistikk: RestAggregertStatistikk) => {
    const bransjedata = aggregertStatistikk.aggregertData?.get(Statistikkategori.BRANSJE)
        ?.prosentSiste4KvartalerTotalt?.verdi;
    if (bransjedata !== undefined) return Statistikkategori.BRANSJE;
    return Statistikkategori.NÆRING;
};