import { AltinnOrganisasjon } from '../api/organisasjonstre/organisasjonstre-utils';

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
        Name: 'FLESK OG FISK HAMAR',
        Type: 'Business',
        OrganizationNumber: '333333333',
        OrganizationForm: 'BEDR',
        Status: 'Active',
        ParentOrganizationNumber: '111111111',
    },
    {
        Name: 'FLESK OG FISK GULEN',
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
        OrganizationNumber: '777777777',
        Type: 'Enterprise',
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
        Name: 'FEIL AS',
        Type: 'Enterprise',
        OrganizationNumber: '999999999',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: '',
    },

    {
        Name: 'FEIL',
        Type: 'Business',
        OrganizationNumber: '101010101',
        OrganizationForm: 'AS',
        Status: 'Active',
        ParentOrganizationNumber: '999999999',
    },
];
/*
const fleskOgFisk: JuridiskEnhetMedUnderenheter = {
    juridiskEnhet: {
        navn: 'FLESK OG FISK AS',
        orgnr: '111111111',
        harTilgang: true,
    },
    underenheter: [
        {
            navn: 'FLESK OG FISK OSLO',
            orgnr: '910969439',
            harTilgang: true,
        },
        {
            navn: 'FLESK OG FISK HAMAR',
            orgnr: '333333333',
            harTilgang: true,
        },
        {
            navn: 'FLESK OG FISK GULEN',
            orgnr: '444444444',
            harTilgang: true,
        },
    ],
};
*/

const olaNordmann: AltinnOrganisasjon[] = [
    /* {
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
    },*/
];

/*const heiOgHåBarnehage: JuridiskEnhetMedUnderenheter = {
    juridiskEnhet: {
        navn: 'HEI OG HÅ BARNEHAGE',
        orgnr: '777777777',
        harTilgang: true,
    },
    underenheter: [
        {
            navn: 'HEI OG HÅ BARNEHAGE',
            orgnr: '888888888',
            harTilgang: true,
        },
    ],
};*/
/*
const feil: JuridiskEnhetMedUnderenheter = {
    juridiskEnhet: {
        navn: 'FEIL AS',
        orgnr: '999999999',
        harTilgang: true,
    },
    underenheter: [
        {
            navn: 'FEIL',
            orgnr: '101010101',
            harTilgang: true,
        },
    ],
};*/
/*
export const organisasjonstreMock: Organisasjonstre = [
    fleskOgFisk,
    olaNordmann,
    heiOgHåBarnehage,
    feil,
];*/

export const organisasjonstreMock: AltinnOrganisasjon[] = fleskOgFisk;
/*heiOgHåBarnehage,
    feil,*/
