import {RestAltinnOrganisasjoner} from '../api/altinnorganisasjon-api';
import {useAltinnOrganisasjoner} from './useAltinnOrganisasjoner';
import {useAltinnOrganisasjonerMedStatistikk} from './useAltinnOrganisasjonerMedStatistikk';
import {RestVirksomhetsdata} from '../api/virksomhetsdata-api';
import {useVirksomhetsdata} from './useVirksomhetsdata';
import {Enhetsregisterdata, useEnheter} from './useEnheter';
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
  virksomhetsdata: RestVirksomhetsdata;
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
  const virksomhetsdata = useVirksomhetsdata();
  const enhetsregisterdata = useEnheter();
  const summertSykefravær = useSummertSykefravær();
  const sykefraværshistorikk = useSykefraværshistorikk();
  const featureToggles = useFeatureToggles();
  const aggregertStatistikk = useAggregertStatistikk();
  const publiseringsdatoer = usePubliseringsdatoer();

  return {
    altinnOrganisasjoner,
    altinnOrganisasjonerMedStatistikk,
    virksomhetsdata,
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
                                virksomhetsdata,
                                enhetsregisterdata,
                              }: {
  summertSykefravær: RestSummertSykefraværshistorikk;
  sykefraværshistorikk: RestSykefraværshistorikk;
  virksomhetsdata: RestVirksomhetsdata;
  enhetsregisterdata: Enhetsregisterdata;
}): Partial<Ekstradata> {
  return {
    ...getEkstraDataFraVirksomhetsdata(virksomhetsdata),
    ...getEkstraDataFraSykefraværshistorikk(sykefraværshistorikk),
    ...getEkstraDataFraSummertSykefraværshistorikk(summertSykefravær, virksomhetsdata),
    ...getEkstraDataFraEnhetsregisteret(enhetsregisterdata.restOverordnetEnhet),
  };
}
