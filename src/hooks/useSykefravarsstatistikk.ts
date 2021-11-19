import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useAltinnOrganisasjoner } from './useAltinnOrganisasjoner';
import { useAltinnOrganisasjonerMedStatistikk } from './useAltinnOrganisasjonerMedStatistikk';
import { RestVirksomhetsdata } from '../api/virksomhetsdata-api';
import { useVirksomhetsdata } from './useVirksomhetsdata';
import { EnhetsregisteretState, useEnheter } from './useEnheter';
import { RestSummertSykefraværshistorikk } from '../api/summert-sykefraværshistorikk-api';
import { useSummertSykefravær } from './useSummertSykefravær';
import { useSykefraværshistorikk } from './useSykefraværshistorikk';
import { RestSykefraværshistorikk } from '../api/kvartalsvis-sykefraværshistorikk-api';
import { useFeatureToggles } from './useFeatureToggles';
import { RestFeatureToggles } from '../api/feature-toggles-api';

export interface Sykefravarsstatistikk {
    altinnOrganisasjoner: RestAltinnOrganisasjoner;
    altinnOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
    virksomhetsdata: RestVirksomhetsdata;
    enhetsInfomasjon: EnhetsregisteretState;
    summertSykefravær: RestSummertSykefraværshistorikk;
    fraværshistorikk: RestSykefraværshistorikk;
    featureToggles: RestFeatureToggles;
}

export function useSykefravarsstatistikk(): Sykefravarsstatistikk {
    const altinnOrganisasjoner = useAltinnOrganisasjoner();
    const altinnOrganisasjonerMedStatistikk = useAltinnOrganisasjonerMedStatistikk();
    const virksomhetsdata = useVirksomhetsdata();
    const enhetsInfomasjon = useEnheter();
    const summertSykefravær = useSummertSykefravær();
    const fraværshistorikk = useSykefraværshistorikk();
    const featureToggles = useFeatureToggles();
    return {
        altinnOrganisasjoner,
        altinnOrganisasjonerMedStatistikk,
        virksomhetsdata,
        enhetsInfomasjon,
        summertSykefravær,
        fraværshistorikk,
        featureToggles,
    };
}
