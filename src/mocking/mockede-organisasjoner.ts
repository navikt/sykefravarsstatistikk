import { Bransjetype, VirksomhetMetadata } from '../api/virksomhetMetadata';

export interface OrganisasjonMock {
    orgnr: string;
    bedriftsmetrikker: null | VirksomhetMetadata | number;
}

const bedriftsmetrikkerBarnehager: VirksomhetMetadata = {
    antallAnsatte: 99,
    næringskode5Siffer: {
        kode: '88911',
        beskrivelse: 'Barnehager',
    },
    bransje: Bransjetype.BARNEHAGER,
};

export const getMockOrganisasjon = (orgnr: string): OrganisasjonMock | undefined =>
    mockedeOrganisasjoner.find((org) => org.orgnr === orgnr);

const mockedeOrganisasjoner: OrganisasjonMock[] = [
    {
        orgnr: '101010101',
        bedriftsmetrikker: 500,
    },
    {
        orgnr: '100100100',
        bedriftsmetrikker: 500,
    },
    {
        orgnr: '888888881',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
    },
    {
        orgnr: '888888882',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
    },
    {
        orgnr: '888888883',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
    },
    {
        orgnr: '888888884',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
    },
    {
        orgnr: '888888885',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
    },
    {
        orgnr: '888888886',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
    },
    {
        orgnr: '888888887',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
    },
    {
        orgnr: '888888888',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
    },
];
