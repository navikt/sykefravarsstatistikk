import { AltinnOrganisasjon } from '../api/altinnorganisasjon-api';
import { setUserProperties } from './amplitude';

const hentAntallUnderenheter = (organisasjoner: AltinnOrganisasjon[]): string | number =>
    organisasjoner.filter((org) => org.OrganizationNumber && org.OrganizationNumber.length > 0)
        .length;

export const setAntallUnderenheterUserProperty = (organisasjoner: AltinnOrganisasjon[]) =>
    setUserProperties({
        antallUnderenheter: hentAntallUnderenheter(organisasjoner),
    });

export const setAntallUnderenheterMedTilgangTilStatistikkUserProperty = (
    organisasjoner: AltinnOrganisasjon[]
) =>
    setUserProperties({
        antallUnderenheterMedTilgangTilStatistikk: hentAntallUnderenheter(organisasjoner),
    });
