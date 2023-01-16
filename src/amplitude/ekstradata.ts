import {
  AntallAnsatteSegmentering,
  SegmenteringSammenligning,
  SegmenteringSykefraværsprosent, tilSegmenteringAntallAnsatte,
  tilSegmenteringSammenligning,
  tilSegmenteringSykefraværsprosent
} from "./segmentering";
import { SykefraværVurdering } from "../Forside/Speedometer/Speedometer";
import { RestStatus } from "../api/api-utils";
import { RestSykefraværshistorikk } from "../api/kvartalsvis-sykefraværshistorikk-api";
import { konverterTilKvartalsvisSammenligning } from "../utils/sykefraværshistorikk-utils";
import { mapTilPrivatEllerOffentligSektor, Sektor } from "../utils/sektorUtils";
import { RestSummertSykefraværshistorikk } from "../api/summert-sykefraværshistorikk-api";
import { getSammenligningResultatMedProsent } from "../Forside/vurdering-utils";
import { SammenligningsType } from "../Forside/vurderingstekster";
import { Enhetsregisterdata } from "../enhetsregisteret/hooks/useEnheter";
import { næringskodeTilNæring } from "./næringsbeskrivelser";
import { getArbeidsmiljøportalenBransje } from "../utils/bransje-utils";
import { Næring } from "../enhetsregisteret/domene/underenhet";

export interface Ekstradata {
  næring: Næring;
  bransje: string;
  antallAnsatte: AntallAnsatteSegmentering;
  prosent: SegmenteringSykefraværsprosent;
  sammenligning: SegmenteringSammenligning;
  sykefraværSiste4Kvartaler: SykefraværVurdering;
  korttidSiste4Kvartaler: SykefraværVurdering;
  langtidSiste4Kvartaler: SykefraværVurdering;
  sektor: Sektor;
}

export const getEkstraDataFraSykefraværshistorikk = (
    restSykefraværshistorikk: RestSykefraværshistorikk
): Partial<Ekstradata> => {
  if (restSykefraværshistorikk.status === RestStatus.Suksess) {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        restSykefraværshistorikk.data
    );

    const sammenligningForSisteKvartal = kvartalsvisSammenligning.pop();

    if (sammenligningForSisteKvartal) {
      const {virksomhet, næringEllerBransje} = sammenligningForSisteKvartal;

      if (virksomhet) {
        return {
          prosent: tilSegmenteringSykefraværsprosent(virksomhet),
          sammenligning: tilSegmenteringSammenligning(virksomhet, næringEllerBransje),
        };
      }
    }
  }
  return {};
};

export const getEkstraDataFraEnhetsregisteret = (
    virksomhet: Enhetsregisterdata
): Partial<Ekstradata> => {
    if (
        virksomhet.restOverordnetEnhet.status !== RestStatus.Suksess ||
        virksomhet.restUnderenhet.status !== RestStatus.Suksess
    ) {
        return {};
    }

    const enhetsdata = virksomhet.restOverordnetEnhet.data;
    const underenhetdata = virksomhet.restUnderenhet.data;

    return {
        næring: underenhetdata.næring,
        bransje: underenhetdata.bransje,
        sektor: mapTilPrivatEllerOffentligSektor(enhetsdata.institusjonellSektorkode),
        antallAnsatte: tilSegmenteringAntallAnsatte(underenhetdata.antallAnsatte),
    };
};

export const getEkstraDataFraSummertSykefraværshistorikk = (
    restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk,
): Partial<Ekstradata> => {
  if (
      restSummertSykefraværshistorikk.status !== RestStatus.Suksess &&
      restSummertSykefraværshistorikk.status !== RestStatus.Feil
  ) {
    return {};
  }

  try {
    const summertSykefraværshistorikk =
        restSummertSykefraværshistorikk.status === RestStatus.Suksess
            ? restSummertSykefraværshistorikk.data
            : undefined;

    const sammenligningResultatTotalt = getSammenligningResultatMedProsent(
        restSummertSykefraværshistorikk.status,
        summertSykefraværshistorikk,
        SammenligningsType.TOTALT
    );

    const sammenligningResultatKorttid = getSammenligningResultatMedProsent(
        restSummertSykefraværshistorikk.status,
        summertSykefraværshistorikk,
        SammenligningsType.KORTTID
    );
    const sammenligningResultatLangtid = getSammenligningResultatMedProsent(
        restSummertSykefraværshistorikk.status,
        summertSykefraværshistorikk,
        SammenligningsType.LANGTID
    );

    const resultater = {
      sykefraværSiste4Kvartaler: sammenligningResultatTotalt.sammenligningVurdering,
      korttidSiste4Kvartaler: sammenligningResultatKorttid.sammenligningVurdering,
      langtidSiste4Kvartaler: sammenligningResultatLangtid.sammenligningVurdering,
    };

    let ekstradata: Partial<Ekstradata> = {...resultater};
    return {...ekstradata};
  } catch (error) {
    return {};
  }
};
