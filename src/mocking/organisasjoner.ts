import { organisasjonstreMock } from './organisasjonstre';
import { AltinnOrganisasjon } from '../api/organisasjonstre/organisasjonstre-utils';

export const getOrganisasjonerMock = (): AltinnOrganisasjon[] => {
    return organisasjonstreMock;
};
