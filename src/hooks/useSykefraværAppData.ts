import {RestAltinnOrganisasjoner} from '../api/altinnorganisasjon-api';
import {useAltinnOrganisasjoner} from './useAltinnOrganisasjoner';
import {useAltinnOrganisasjonerMedStatistikk} from './useAltinnOrganisasjonerMedStatistikk';
import {RestVirksomhetsdata} from '../api/virksomhetsdata-api';
import {useVirksomhetsdata} from './useVirksomhetsdata';
import {Enhetsregisterdata, useEnheter} from '../enhetsregisteret/hooks/useEnheter';
import {RestSummertSykefraværshistorikk} from '../api/summert-sykefraværshistorikk-api';
import {useSummertSykefravær} from './useSummertSykefravær';
import {useSykefraværshistorikk} from './useSykefraværshistorikk';
import {RestSykefraværshistorikk} from '../api/kvartalsvis-sykefraværshistorikk-api';
import {useFeatureToggles} from './useFeatureToggles';
import {RestFeatureToggles} from '../api/feature-toggles-api';
import {
  Ekstradata,
  getEkstraDataFraEnhetsregisteret,
  getEkstraDataFraSummertSykefraværshistorikk,
  getEkstraDataFraSykefraværshistorikk,
  getEkstraDataFraVirksomhetsdata,
} from '../amplitude/ekstradata';
import useAggregertStatistikk, {AggregertStatistikkResponse} from './useAggregertStatistikk';
import {RestPubliseringsdatoer} from "../api/publiseringsdatoer-api";
import {usePubliseringsdatoer} from "./usePubliseringsdatoer";

export interface SykefraværAppData {
  altinnOrganisasjoner: RestAltinnOrganisasjoner;
  altinnOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
  enhetsregisterdata: Enhetsregisterdata;
  summertSykefravær: RestSummertSykefraværshistorikk;
  sykefraværshistorikk: RestSykefraværshistorikk;
  featureToggles: RestFeatureToggles;
  aggregertStatistikk: AggregertStatistikkResponse;
  publiseringsdatoer: RestPubliseringsdatoer;
}

export function useSykefraværAppData(): SykefraværAppData {
  const altinnOrganisasjoner = useAltinnOrganisasjoner();
  const altinnOrganisasjonerMedStatistikk = useAltinnOrganisasjonerMedStatistikk();
  const enhetsregisterdata = useEnheter();
  const summertSykefravær = useSummertSykefravær();
  const sykefraværshistorikk = useSykefraværshistorikk();
  const featureToggles = useFeatureToggles();
  const aggregertStatistikk = useAggregertStatistikk();
  const publiseringsdatoer = usePubliseringsdatoer();

  return {
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikk,
    enhetsregisterdata,
    summertSykefravær,
    sykefraværshistorikk,
    featureToggles,
    aggregertStatistikk,
    publiseringsdatoer
  };
}

export function getEkstradata({
    sykefraværshistorikk,
    summertSykefravær,
    enhetsregisterdata,
}: {
    summertSykefravær: RestSummertSykefraværshistorikk;
    sykefraværshistorikk: RestSykefraværshistorikk;
    enhetsregisterdata: Enhetsregisterdata;
}): Partial<Ekstradata> {
    return {
        ...getEkstraDataFraSykefraværshistorikk(sykefraværshistorikk),
        ...getEkstraDataFraSummertSykefraværshistorikk(summertSykefravær),
        ...getEkstraDataFraEnhetsregisteret(enhetsregisterdata.restOverordnetEnhet),
      // TODO: Hent data fra aggregert
    };
}
