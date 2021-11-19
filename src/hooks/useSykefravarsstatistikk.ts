import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useAltinnOrganisasjoner } from './useAltinnOrganisasjoner';
import { useAltinnOrganisasjonerMedStatistikk } from './useAltinnOrganisasjonerMedStatistikk';

export interface Sykefravarsstatistikk {
    altinnOrganisasjoner: RestAltinnOrganisasjoner;
    altinnOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
}

export function useSykefravarsstatistikk(): Sykefravarsstatistikk {
    const altinnOrganisasjoner = useAltinnOrganisasjoner();
    const altinnOrganisasjonerMedStatistikk = useAltinnOrganisasjonerMedStatistikk();
    return {
        altinnOrganisasjoner,
        altinnOrganisasjonerMedStatistikk,
    };
}
