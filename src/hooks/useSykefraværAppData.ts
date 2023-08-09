import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useAltinnOrganisasjoner } from './useAltinnOrganisasjoner';
import { useAltinnOrganisasjonerMedStatistikktilgang } from './useAltinnOrganisasjonerMedStatistikktilgang';
import { Enhetsregisterdata, useEnheter } from '../enhetsregisteret/hooks/useEnheter';
import { useSykefraværshistorikk } from './useSykefraværshistorikk';
import { RestSykefraværshistorikk } from '../api/kvartalsvis-sykefraværshistorikk-api';
import {
    AmplitudeEkstradata,
    getEkstraDataFraEnhetsregisteret,
    getEkstraDataFraAggregertSykefravær,
} from '../amplitude/amplitudeEkstradata';
import useAggregertStatistikk, { RestAggregertStatistikk } from './useAggregertStatistikk';
import { Publiseringsdatoer, RestPubliseringsdatoer } from '../api/publiseringsdatoer-api';
import { usePubliseringsdatoer } from './usePubliseringsdatoer';

export interface SykefraværAppData {
    altinnOrganisasjoner: RestAltinnOrganisasjoner;
    altinnOrganisasjonerMedStatistikktilgang: RestAltinnOrganisasjoner;
    enhetsregisterdata: Enhetsregisterdata;
    sykefraværshistorikk: RestSykefraværshistorikk;
    aggregertStatistikk: RestAggregertStatistikk;
    publiseringsdatoer: RestPubliseringsdatoer<Publiseringsdatoer>;
    skalSendeMetrikkerAutomatisk?: boolean;
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
        publiseringsdatoer,
    };
}

export function getEkstradata(
    aggregertHistorikk: RestAggregertStatistikk,
    enhetsregisterdata: Enhetsregisterdata
): Partial<AmplitudeEkstradata> {
    return {
        ...getEkstraDataFraAggregertSykefravær(aggregertHistorikk),
        ...getEkstraDataFraEnhetsregisteret(enhetsregisterdata),
    };
}
