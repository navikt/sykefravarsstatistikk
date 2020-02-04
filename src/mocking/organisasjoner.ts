import { organisasjonstreMock } from './organisasjonstre';
import { AltinnOrganisasjon, Organisasjon } from '../api/organisasjonstre/organisasjonstre-utils';

const mapTilEnterprise = (organisasjon: Organisasjon): AltinnOrganisasjon => {
    return {
        Name: organisasjon.navn,
        Type: 'Enterprise',
        OrganizationNumber: organisasjon.orgnr,
        ParentOrganizationNumber: null,
        OrganizationForm: 'AS',
        Status: 'Active',
    };
};

const mapTilBusiness = (
    organisasjon: Organisasjon,
    overordnetEnhetOrgnr: string
): AltinnOrganisasjon => {
    return {
        Name: organisasjon.navn,
        Type: 'Business',
        OrganizationNumber: organisasjon.orgnr,
        ParentOrganizationNumber: overordnetEnhetOrgnr,
        OrganizationForm: 'BEDR',
        Status: 'Active',
    };
};

export const getOrganisasjonerMock = (): AltinnOrganisasjon[] => {
    let organisasjoner: AltinnOrganisasjon[] = [];

    organisasjonstreMock.forEach(juridiskEnhetMedUnderenheter => {
        const { juridiskEnhet, underenheter } = juridiskEnhetMedUnderenheter;
        organisasjoner.push(mapTilEnterprise(juridiskEnhet));
        underenheter.forEach(underenhet =>
            organisasjoner.push(mapTilBusiness(underenhet, juridiskEnhet.orgnr))
        );
    });
    return organisasjoner;
};
