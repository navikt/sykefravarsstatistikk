import { AltinnOrganisasjon } from '../api/altinnorganisasjon-api';

export const orgnrUtenTilgang = '100100100';

const fleskOgFisk: AltinnOrganisasjon[] = [
    {
        Name: 'FLESK OG FISK AS',
        Type: 'Enterprise',
        OrganizationNumber: '111111111',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: '',
    },
    {
        Name: 'FLESK OG FISK OSLO',
        Type: 'Business',
        OrganizationNumber: '910969439',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '111111111',
    },
    {
        Name: 'FLESK OG FISK ULLENSAKER',
        Type: 'Business',
        OrganizationNumber: '333333333',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '111111111',
    },
    {
        Name: 'FLESK OG FISK SIGDAL',
        Type: 'Business',
        OrganizationNumber: '444444444',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '111111111',
    },
];

const ingenTilgangAs = [
    {
        Name: 'INGEN TILGANG AS',
        Type: 'Enterprise',
        OrganizationNumber: '900900900',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: '',
    },

    {
        Name: 'INGEN TILGANG',
        Type: 'Business',
        OrganizationNumber: orgnrUtenTilgang,
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '900900900',
    },
];

const olaNordmannEnk = [
    {
        Name: 'OLA NORDMANN ENK',
        Type: 'Enterprise',
        OrganizationNumber: '555555555',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: '',
    },

    {
        Name: 'OLA NORDMANN ENK',
        Type: 'Business',
        OrganizationNumber: '666666666',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '555555555',
    },
];

const heiOgHåBarnehage: AltinnOrganisasjon[] = [
    {
        Name: 'HEI OG HÅ BARNEHAGE',
        Type: 'Enterprise',
        OrganizationNumber: '777777777',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: '',
    },
    {
        Name: 'HEI OG HÅ BARNEHAGE',
        Type: 'Business',
        OrganizationNumber: '888888888',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '777777777',
    },
    {
        Name: 'HEI OG HÅ BARNEHAGE - Maskert',
        Type: 'Business',
        OrganizationNumber: '888888887',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '777777777',
    },
    {
        Name: 'HEI OG HÅ BARNEHAGE - To kvartaler',
        Type: 'Business',
        OrganizationNumber: '888888886',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '777777777',
    },
    {
        Name: 'HEI OG HÅ BARNEHAGE - Ingen data',
        Type: 'Business',
        OrganizationNumber: '888888885',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '777777777',
    },
    {
        Name: 'HEI OG HÅ BARNEHAGE - Feil',
        Type: 'Business',
        OrganizationNumber: '888888884',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '777777777',
    },
    {
        Name: 'HEI OG HÅ BARNEHAGE - Grønn',
        Type: 'Business',
        OrganizationNumber: '888888883',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '777777777',
    },
    {
        Name: 'HEI OG HÅ BARNEHAGE - Gul',
        Type: 'Business',
        OrganizationNumber: '888888882',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '777777777',
    },
    {
        Name: 'HEI OG HÅ BARNEHAGE - Rød',
        Type: 'Business',
        OrganizationNumber: '888888881',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '777777777',
    },
];

const systemfeilAs = [
    {
        Name: 'SYSTEMFEIL AS',
        Type: 'Enterprise',
        OrganizationNumber: '999999999',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: '',
    },

    {
        Name: 'SYSTEMFEIL',
        Type: 'Business',
        OrganizationNumber: '101010101',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '999999999',
    },
];

export const organisasjonerMock: AltinnOrganisasjon[] = [
    ...fleskOgFisk,
    ...heiOgHåBarnehage,
    ...olaNordmannEnk,
    ...ingenTilgangAs,
    ...systemfeilAs,
];
