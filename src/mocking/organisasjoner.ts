import { organisasjonstreMock } from './organisasjonstre';
import { AltinnOrganisasjon, Organisasjon } from '../api/organisasjonstre/organisasjonstre-utils';

const mapTilAltinnOrganisasjon = (
    organisasjon: Organisasjon,
    overordnetEnhetOrgnr: string | null,
    type: string,
    organizationForm: string
): AltinnOrganisasjon => {
    return {
        Name: organisasjon.navn,
        Type: type,
        OrganizationNumber: organisasjon.orgnr,
        ParentOrganizationNumber: overordnetEnhetOrgnr !== null ? overordnetEnhetOrgnr : '',
        OrganizationForm: organizationForm,
        Status: 'Active',
    };
};

export const getOrganisasjonerMock = (): AltinnOrganisasjon[] => {
    let organisasjoner: AltinnOrganisasjon[] = [];

    organisasjonstreMock.forEach(juridiskEnhetMedUnderenheter => {
        const { juridiskEnhet, underenheter } = juridiskEnhetMedUnderenheter;
        organisasjoner.push(mapTilAltinnOrganisasjon(juridiskEnhet, null, 'Enterprise', 'AS'));
        underenheter.forEach(underenhet =>
            organisasjoner.push(
                mapTilAltinnOrganisasjon(underenhet, juridiskEnhet.orgnr, 'Business', 'BEDR')
            )
        );
    });
    return organisasjoner;
};
