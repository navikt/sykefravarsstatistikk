import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useAltinnOrganisasjoner } from './useAltinnOrganisasjoner';
import { useAltinnOrganisasjonerMedStatistikk } from './useAltinnOrganisasjonerMedStatistikk';
import { RestVirksomhetsdata } from '../api/virksomhetsdata-api';
import { useVirksomhetsdata } from './useVirksomhetsdata';
import { EnhetsregisteretState, useEnheter } from './useEnheter';

export interface Sykefravarsstatistikk {
    altinnOrganisasjoner: RestAltinnOrganisasjoner;
    altinnOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
    virksomhetsdata: RestVirksomhetsdata;
    enhetsInfomasjon: EnhetsregisteretState;
}

export function useSykefravarsstatistikk(): Sykefravarsstatistikk {
    const altinnOrganisasjoner = useAltinnOrganisasjoner();
    const altinnOrganisasjonerMedStatistikk = useAltinnOrganisasjonerMedStatistikk();
    const virksomhetsdata = useVirksomhetsdata();
    const enhetsInfomasjon = useEnheter();
    return {
        altinnOrganisasjoner,
        altinnOrganisasjonerMedStatistikk,
        virksomhetsdata,
        enhetsInfomasjon,
    };
}
