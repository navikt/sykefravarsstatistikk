import { organisasjonerMock, orgnrUtenTilgang } from './organisasjonerMock';
import { AltinnOrganisasjon } from '../api/altinnorganisasjon-api';

export const getOrganisasjonerMock = (): AltinnOrganisasjon[] => {
    return [];
};
export const getOrganisasjonerBrukerHarTilgangTilMock = (): AltinnOrganisasjon[] => {
    return organisasjonerMock.filter((org) => org.OrganizationNumber !== orgnrUtenTilgang);
};
