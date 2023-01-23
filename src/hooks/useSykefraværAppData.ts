import {RestAltinnOrganisasjoner} from '../api/altinnorganisasjon-api';
import {useAltinnOrganisasjoner} from './useAltinnOrganisasjoner';
import {useAltinnOrganisasjonerMedStatistikktilgang} from './useAltinnOrganisasjonerMedStatistikktilgang';
import {Enhetsregisterdata, useEnheter} from '../enhetsregisteret/hooks/useEnheter';
import {useSykefraværshistorikk} from './useSykefraværshistorikk';
import {RestSykefraværshistorikk} from '../api/kvartalsvis-sykefraværshistorikk-api';
import {
  Ekstradata,
  getEkstraDataFraEnhetsregisteret,
  getEkstraDataFraAggregertSykefraværshistorikk,
} from '../amplitude/ekstradata';
import useAggregertStatistikk, {
  RestAggregertStatistikk
} from "./useAggregertStatistikk";
import {RestPubliseringsdatoer} from "../api/publiseringsdatoer-api";
import {usePubliseringsdatoer} from "./usePubliseringsdatoer";

export interface SykefraværAppData {
  altinnOrganisasjoner: RestAltinnOrganisasjoner;
  altinnOrganisasjonerMedStatistikktilgang: RestAltinnOrganisasjoner;
  enhetsregisterdata: Enhetsregisterdata;
  sykefraværshistorikk: RestSykefraværshistorikk;
  aggregertStatistikk: RestAggregertStatistikk;
  publiseringsdatoer: RestPubliseringsdatoer;
}

export function useSykefraværAppData(): SykefraværAppData {
  const altinnOrganisasjoner = useAltinnOrganisasjoner();
  const altinnOrganisasjonerMedStatistikktilgang = useAltinnOrganisasjonerMedStatistikktilgang();
  const enhetsregisterdata = useEnheter();
  const sykefraværshistorikk = useSykefraværshistorikk();
  const aggregertStatistikk = useAggregertStatistikk();
  const publiseringsdatoer = usePubliseringsdatoer();

  return {
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikktilgang,
    enhetsregisterdata,
    sykefraværshistorikk,
    aggregertStatistikk,
    publiseringsdatoer
  };
}

export function getEkstradata(
    aggregertHistorikk: RestAggregertStatistikk,
    enhetsregisterdata: Enhetsregisterdata,
): Partial<Ekstradata> {
    return {
        ...getEkstraDataFraAggregertSykefraværshistorikk(aggregertHistorikk),
        ...getEkstraDataFraEnhetsregisteret(enhetsregisterdata),
    };
}
