import {
    AltinnOrganisasjon,
    finnOrgnumreTilJuridiskeEnheterSomBrukerIkkeHarTilgangTil,
} from './OrganisasjonstreProvider';

const JURIDISK_ENHET = {
    Name: 'juridisk',
    Type: 'Enterprise',
    OrganizationNumber: '164367486',
    OrganizationForm: 'string',
    Status: 'string',
    ParentOrganizationNumber: null,
};
const UNDERENHET = {
    Name: 'underenhet',
    Type: 'Business',
    OrganizationNumber: '164367486',
    OrganizationForm: 'string',
    Status: 'string',
    ParentOrganizationNumber: '1454573657',
};

describe('Tester for finnOrgnumreTilJuridiskeEnheterSomBrukerIkkeHarTilgangTil', () => {
    test('skal returnere de orgnumre som blir referert til, men som ikke er i listen', () => {
        const altinnOrganisasjoner: AltinnOrganisasjon[] = [
            { ...UNDERENHET, OrganizationNumber: '1', ParentOrganizationNumber: '10' },
            { ...JURIDISK_ENHET, OrganizationNumber: '10' },
            { ...UNDERENHET, OrganizationNumber: '2', ParentOrganizationNumber: '11' },
            { ...UNDERENHET, OrganizationNumber: '3', ParentOrganizationNumber: '12' },
        ] as AltinnOrganisasjon[];
        const resultat = finnOrgnumreTilJuridiskeEnheterSomBrukerIkkeHarTilgangTil(
            altinnOrganisasjoner
        );
        expect(resultat).toEqual(['11', '12']);
    });

    test('skal ikke returnere null', () => {
        const altinnOrganisasjoner: AltinnOrganisasjon[] = [
            { ...JURIDISK_ENHET, OrganizationNumber: '10', ParentOrganizationNumber: null },
        ];
        const resultat = finnOrgnumreTilJuridiskeEnheterSomBrukerIkkeHarTilgangTil(
            altinnOrganisasjoner
        );
        expect(resultat).not.toContain(null);
    });

    test('skal fjerne duplikater', () => {
        const altinnOrganisasjoner: AltinnOrganisasjon[] = [
            { ...UNDERENHET, OrganizationNumber: '1', ParentOrganizationNumber: '10' },
            { ...UNDERENHET, OrganizationNumber: '2', ParentOrganizationNumber: '10' },
        ] as AltinnOrganisasjon[];
        const resultat = finnOrgnumreTilJuridiskeEnheterSomBrukerIkkeHarTilgangTil(
            altinnOrganisasjoner
        );
        expect(resultat).toEqual(['10']);
    });
});
