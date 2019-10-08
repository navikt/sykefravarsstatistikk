import {
    AltinnOrganisasjon,
    finnOrgnumreTilManglendeJuridiskeEnheter,
    mapTilOrganisasjonstre,
    Organisasjon,
    Organisasjonstre,
} from './organisasjonstre-utils';

const ALTINN_JURIDISK_ENHET: AltinnOrganisasjon = {
    Name: 'juridisk',
    Type: 'Enterprise',
    OrganizationNumber: '164367486',
    OrganizationForm: 'string',
    Status: 'string',
    ParentOrganizationNumber: null,
};

const ALTINN_UNDERENHET: AltinnOrganisasjon = {
    Name: 'underenhet',
    Type: 'Business',
    OrganizationNumber: '164367486',
    OrganizationForm: 'string',
    Status: 'string',
    ParentOrganizationNumber: '1454573657',
};

const ORGANISASJON: Organisasjon = {
    navn: 'organisasjon',
    orgnr: '124236545367',
};

const finnUnderenhetOrgnumreTilJuridiskEnhet = (
    organisasjonstre: Organisasjonstre,
    juridiskEnhetOrgnr: string
): string[] => {
    return organisasjonstre
        .find(
            juridiskEnhetMedUnderenheter =>
                juridiskEnhetMedUnderenheter.juridiskEnhet.orgnr === juridiskEnhetOrgnr
        )!
        .underenheter.map(org => org.orgnr)
        .sort();
};

const finnJuridiskEnhet = (
    organisasjonstre: Organisasjonstre,
    juridiskEnhetOrgnr: string
): Organisasjon => {
    return organisasjonstre
        .map(juridiskMedUnderenheter => juridiskMedUnderenheter.juridiskEnhet)
        .find(org => org.orgnr === juridiskEnhetOrgnr)!;
};

const finnUnderenhet = (
    organisasjonstre: Organisasjonstre,
    underenhetOrgnr: string
): Organisasjon => {
    const nøstedeUnderenheter: Organisasjon[][] = organisasjonstre.map(
        juridiskMedUnderenheter => juridiskMedUnderenheter.underenheter
    );
    const underenheter = ([] as Organisasjon[]).concat(...nøstedeUnderenheter);
    return underenheter.find(org => org.orgnr === underenhetOrgnr)!;
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
        const altinnOrganisasjoner = [
            { ...ALTINN_JURIDISK_ENHET, OrganizationNumber: '10', ParentOrganizationNumber: null },
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

describe('Tester for mapTilOrganisasjonstre', () => {
    test('skal legge til de manglende juridiske enhetene', () => {
        const altinnOrganisasjoner: AltinnOrganisasjon[] = [
            { ...ALTINN_UNDERENHET, OrganizationNumber: '1', ParentOrganizationNumber: '10' },
            { ...ALTINN_JURIDISK_ENHET, OrganizationNumber: '10' },
            { ...ALTINN_UNDERENHET, OrganizationNumber: '2', ParentOrganizationNumber: '20' },
            { ...ALTINN_UNDERENHET, OrganizationNumber: '3', ParentOrganizationNumber: '30' },
        ];

        const manglendeJuridiskeEnheter: Organisasjon[] = [
            { ...ORGANISASJON, orgnr: '20' },
            { ...ORGANISASJON, orgnr: '30' },
        ];

        const resultat = mapTilOrganisasjonstre(altinnOrganisasjoner, manglendeJuridiskeEnheter);

        const orgnrTilJuridiskeEnheter = resultat.map(
            juridiskEnhetMedUnderenheter => juridiskEnhetMedUnderenheter.juridiskEnhet.orgnr
        );
        expect(orgnrTilJuridiskeEnheter.sort()).toEqual(['10', '20', '30']);
    });

    test('skal legge underenhetene på riktig juridisk enhet', () => {
        const altinnOrganisasjoner: AltinnOrganisasjon[] = [
            { ...ALTINN_UNDERENHET, OrganizationNumber: '1', ParentOrganizationNumber: '10' },
            { ...ALTINN_JURIDISK_ENHET, OrganizationNumber: '10' },
            { ...ALTINN_UNDERENHET, OrganizationNumber: '2', ParentOrganizationNumber: '20' },
            { ...ALTINN_UNDERENHET, OrganizationNumber: '3', ParentOrganizationNumber: '10' },
        ];

        const manglendeJuridiskeEnheter: Organisasjon[] = [{ ...ORGANISASJON, orgnr: '20' }];

        const resultat = mapTilOrganisasjonstre(altinnOrganisasjoner, manglendeJuridiskeEnheter);

        expect(finnUnderenhetOrgnumreTilJuridiskEnhet(resultat, '10')).toEqual(['1', '3']);
        expect(finnUnderenhetOrgnumreTilJuridiskEnhet(resultat, '20')).toEqual(['2']);
    });

    test('skal sette riktig tilgang på organisasjonene', () => {
        const altinnOrganisasjoner: AltinnOrganisasjon[] = [
            { ...ALTINN_UNDERENHET, OrganizationNumber: '1', ParentOrganizationNumber: '10' },
            { ...ALTINN_JURIDISK_ENHET, OrganizationNumber: '10' },
            { ...ALTINN_UNDERENHET, OrganizationNumber: '2', ParentOrganizationNumber: '20' },
            { ...ALTINN_UNDERENHET, OrganizationNumber: '3', ParentOrganizationNumber: '10' },
            { ...ALTINN_UNDERENHET, OrganizationNumber: '4', ParentOrganizationNumber: '30' },
        ];

        const manglendeJuridiskeEnheter: Organisasjon[] = [
            { ...ORGANISASJON, orgnr: '20' },
            { ...ORGANISASJON, orgnr: '30' },
        ];

        const resultat = mapTilOrganisasjonstre(altinnOrganisasjoner, manglendeJuridiskeEnheter);

        expect(finnJuridiskEnhet(resultat, '10').harTilgang).toBe(true);
        expect(finnJuridiskEnhet(resultat, '20').harTilgang).toBe(false);
        expect(finnJuridiskEnhet(resultat, '30').harTilgang).toBe(false);
        expect(finnUnderenhet(resultat, '1').harTilgang).toBe(true);
        expect(finnUnderenhet(resultat, '2').harTilgang).toBe(true);
        expect(finnUnderenhet(resultat, '3').harTilgang).toBe(true);
        expect(finnUnderenhet(resultat, '4').harTilgang).toBe(true);
    });

    test('skal filtrere bort juridiske enheter uten underenheter', () => {
        // TODO Denne funksjonaliteten finnes i dagens bedriftsvelger. Er det noe vi vil ha?

        const altinnOrganisasjoner: AltinnOrganisasjon[] = [
            { ...ALTINN_JURIDISK_ENHET, OrganizationNumber: '10' },
        ];

        const resultat = mapTilOrganisasjonstre(altinnOrganisasjoner, []);

        expect(resultat).toEqual([]);
    });
});
