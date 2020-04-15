import {
    AltinnOrganisasjon,
    finnOrgnumreTilManglendeJuridiskeEnheter,
} from './organisasjonstre-utils';

const ALTINN_JURIDISK_ENHET: AltinnOrganisasjon = {
    Name: 'juridisk',
    Type: 'Enterprise',
    OrganizationNumber: '164367486',
    OrganizationForm: 'string',
    Status: 'string',
    ParentOrganizationNumber: '',
};

const ALTINN_UNDERENHET: AltinnOrganisasjon = {
    Name: 'underenhet',
    Type: 'Business',
    OrganizationNumber: '164367486',
    OrganizationForm: 'string',
    Status: 'string',
    ParentOrganizationNumber: '1454573657',
};

describe('Tester for finnOrgnumreTilManglendeJuridiskeEnheter', () => {
    test('skal returnere de orgnumre som blir referert til, men som ikke er i listen', () => {
        const altinnOrganisasjoner: AltinnOrganisasjon[] = [
            { ...ALTINN_UNDERENHET, OrganizationNumber: '1', ParentOrganizationNumber: '10' },
            { ...ALTINN_JURIDISK_ENHET, OrganizationNumber: '10' },
            { ...ALTINN_UNDERENHET, OrganizationNumber: '2', ParentOrganizationNumber: '11' },
            { ...ALTINN_UNDERENHET, OrganizationNumber: '3', ParentOrganizationNumber: '12' },
        ] as AltinnOrganisasjon[];
        const resultat = finnOrgnumreTilManglendeJuridiskeEnheter(altinnOrganisasjoner);
        expect(resultat).toEqual(['11', '12']);
    });

    test('skal ikke returnere null', () => {
        const altinnOrganisasjoner: AltinnOrganisasjon[] = [
            { ...ALTINN_JURIDISK_ENHET, OrganizationNumber: '10', ParentOrganizationNumber: '' },
        ];
        const resultat = finnOrgnumreTilManglendeJuridiskeEnheter(altinnOrganisasjoner);
        expect(resultat).not.toContain(null);
    });

    test('skal fjerne duplikater', () => {
        const altinnOrganisasjoner: AltinnOrganisasjon[] = [
            { ...ALTINN_UNDERENHET, OrganizationNumber: '1', ParentOrganizationNumber: '10' },
            { ...ALTINN_UNDERENHET, OrganizationNumber: '2', ParentOrganizationNumber: '10' },
        ];
        const resultat = finnOrgnumreTilManglendeJuridiskeEnheter(altinnOrganisasjoner);
        expect(resultat).toEqual(['10']);
    });
});
