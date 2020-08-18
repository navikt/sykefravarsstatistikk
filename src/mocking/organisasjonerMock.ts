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

export const organisasjonerMock: AltinnOrganisasjon[] = fleskOgFisk;
