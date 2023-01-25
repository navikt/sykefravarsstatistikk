import { SykefraværVurdering } from "./Speedometer/Speedometer";
import { Statistikk } from "../hooks/useAggregertStatistikk";
import { parseVerdi } from "./SammenligningMedBransje/EkspanderbartSammenligningspanel";

export const sammenliknSykefravær = (statistikk?: Statistikk, bransjeEllerNæring?: Statistikk) => {
  if (statistikk === undefined && bransjeEllerNæring === undefined)
    return SykefraværVurdering.FEIL_ELLER_INGEN_DATA;
  if (statistikk === undefined && bransjeEllerNæring !== undefined)
    return SykefraværVurdering.MASKERT;

  const antallKvartaler = statistikk?.kvartalerIBeregningen.length || 0;

  if (antallKvartaler < 4) return SykefraværVurdering.UFULLSTENDIG_DATA;
  if (statistikk?.verdi === undefined || bransjeEllerNæring?.verdi === undefined)
    return SykefraværVurdering.UFULLSTENDIG_DATA;

  const virksomhetVerdi = parseVerdi(statistikk.verdi);
  const bransjeEllerNæringVerdi = parseVerdi(bransjeEllerNæring.verdi);

  if (virksomhetVerdi > bransjeEllerNæringVerdi * 1.1) return SykefraværVurdering.OVER;
  if (virksomhetVerdi < bransjeEllerNæringVerdi * 0.9) return SykefraværVurdering.UNDER;
  return SykefraværVurdering.MIDDELS;
};

export const getGrønnGrense = (bransjensProsent: number) => bransjensProsent * 0.9;
export const getRødGrense = (bransjensProsent: number) => bransjensProsent * 1.1;
