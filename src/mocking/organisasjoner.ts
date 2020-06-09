import { organisasjonstreMock } from './organisasjonstre';
import { AltinnOrganisasjon } from '../api/altinnorganisasjon-api';

export const getOrganisasjonerMock = (): AltinnOrganisasjon[] => {
    return organisasjonstreMock;
};
