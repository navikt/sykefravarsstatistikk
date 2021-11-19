import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useAltinnOrganisasjoner } from './useAltinnOrganisasjoner';
import { useAltinnOrganisasjonerMedStatistikk } from './useAltinnOrganisasjonerMedStatistikk';
import { RestVirksomhetsdata } from '../api/virksomhetsdata-api';
import { useVirksomhetsdata } from './useVirksomhetsdata';
import { EnhetsregisteretState, useEnheter } from './useEnheter';
import { RestSummertSykefraværshistorikk } from '../api/summert-sykefraværshistorikk-api';
import { useSummertSykefravær } from './useSummertSykefravær';

export interface Sykefravarsstatistikk {
    altinnOrganisasjoner: RestAltinnOrganisasjoner;
    altinnOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
    virksomhetsdata: RestVirksomhetsdata;
    enhetsInfomasjon: EnhetsregisteretState;
    summertSykefravær: RestSummertSykefraværshistorikk;
}

export function useSykefravarsstatistikk(): Sykefravarsstatistikk {
    const altinnOrganisasjoner = useAltinnOrganisasjoner();
    const altinnOrganisasjonerMedStatistikk = useAltinnOrganisasjonerMedStatistikk();
    const virksomhetsdata = useVirksomhetsdata();
    const enhetsInfomasjon = useEnheter();
    const summertSykefravær = useSummertSykefravær();
    return {
        altinnOrganisasjoner,
        altinnOrganisasjonerMedStatistikk,
        virksomhetsdata,
        enhetsInfomasjon,
        summertSykefravær,
    };
}
