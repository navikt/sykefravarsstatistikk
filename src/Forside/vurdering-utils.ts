import { SykefraværVurdering } from "./Speedometer/Speedometer";
import { Statistikk } from "../hooks/useAggregertStatistikk";
import { parseVerdi } from "./SammenligningMedBransje/EkspanderbartSammenligningspanel";

export const getVurdering = (statistikk?: Statistikk, bransjeEllerNæring?: Statistikk) => {
  if (statistikk === undefined && bransjeEllerNæring === undefined)
    return SykefraværVurdering.INGEN_DATA;
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
