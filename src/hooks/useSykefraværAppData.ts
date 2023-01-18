import {RestAltinnOrganisasjoner} from '../api/altinnorganisasjon-api';
import {useAltinnOrganisasjoner} from './useAltinnOrganisasjoner';
import {useAltinnOrganisasjonerMedStatistikk} from './useAltinnOrganisasjonerMedStatistikk';
import {Enhetsregisterdata, useEnheter} from '../enhetsregisteret/hooks/useEnheter';
import {useSykefraværshistorikk} from './useSykefraværshistorikk';
import {RestSykefraværshistorikk} from '../api/kvartalsvis-sykefraværshistorikk-api';
import {
  Ekstradata,
  getEkstraDataFraEnhetsregisteret,
  getEkstraDataFraAggregertSykefraværshistorikk,
  getEkstraDataFraSykefraværshistorikk,
} from '../amplitude/ekstradata';
import useAggregertStatistikk, {
  RestAggregertStatistikk
} from "./useAggregertStatistikk";
import {RestPubliseringsdatoer} from "../api/publiseringsdatoer-api";
import {usePubliseringsdatoer} from "./usePubliseringsdatoer";

export interface SykefraværAppData {
  altinnOrganisasjoner: RestAltinnOrganisasjoner;
  altinnOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
  enhetsregisterdata: Enhetsregisterdata;
  sykefraværshistorikk: RestSykefraværshistorikk;
  aggregertStatistikk: RestAggregertStatistikk;
  publiseringsdatoer: RestPubliseringsdatoer;
}

export function useSykefraværAppData(): SykefraværAppData {
  const altinnOrganisasjoner = useAltinnOrganisasjoner();
  const altinnOrganisasjonerMedStatistikk = useAltinnOrganisasjonerMedStatistikk();
  const enhetsregisterdata = useEnheter();
  const sykefraværshistorikk = useSykefraværshistorikk();
  const aggregertStatistikk = useAggregertStatistikk();
  const publiseringsdatoer = usePubliseringsdatoer();

  return {
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikk,
    enhetsregisterdata,
    sykefraværshistorikk,
    aggregertStatistikk,
    publiseringsdatoer
  };
}

export function getEkstradata(
    sykefraværshistorikk: RestSykefraværshistorikk,
    aggregertHistorikk: RestAggregertStatistikk,
    enhetsregisterdata: Enhetsregisterdata,
): Partial<Ekstradata> {
    return {
        ...getEkstraDataFraSykefraværshistorikk(sykefraværshistorikk),
        ...getEkstraDataFraAggregertSykefraværshistorikk(aggregertHistorikk),
        ...getEkstraDataFraEnhetsregisteret(enhetsregisterdata),
    };
}
