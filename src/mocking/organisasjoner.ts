import { organisasjonstreMock } from './organisasjonstre';
import { AltinnOrganisasjon } from '../api/altinnorganisasjon/altinnorganisasjon-api';

export const getOrganisasjonerMock = (): AltinnOrganisasjon[] => {
    return organisasjonstreMock;
};
