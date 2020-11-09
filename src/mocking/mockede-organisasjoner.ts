import { Bransjetype, VirksomhetMetadata } from '../api/virksomhetMetadata';
import { Sykefraværshistorikk } from '../api/sykefraværshistorikk';
import {
    lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet,
    lagHistorikkMedLikHistorikkForUnderenhetOgOverordnetEnhet,
    lagMaskertHistorikk,
    lagMockHistorikkForBarnehage,
} from './sykefraværshistorikk';

export interface OrganisasjonMock {
    orgnr: string;
    bedriftsmetrikker?: VirksomhetMetadata | number;
    sykefraværshistorikkKvartalsvis?: Sykefraværshistorikk[] | number;
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
        sykefraværshistorikkKvartalsvis: 500,
    },
    {
        orgnr: '100100100',
        bedriftsmetrikker: 500,
        sykefraværshistorikkKvartalsvis: 403,
    },
    {
        orgnr: '888888881',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    },
    {
        orgnr: '888888882',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    },
    {
        orgnr: '888888883',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    },
    {
        orgnr: '888888884',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    },
    {
        orgnr: '888888885',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    },
    {
        orgnr: '888888886',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    },
    {
        orgnr: '888888887',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    },
    {
        orgnr: '888888888',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    },
    {
        orgnr: '333333333',
        sykefraværshistorikkKvartalsvis: lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet(),
    },
    {
        orgnr: '444444444',
        sykefraværshistorikkKvartalsvis: lagMaskertHistorikk(),
    },
    {
        orgnr: '666666666',
        sykefraværshistorikkKvartalsvis: lagHistorikkMedLikHistorikkForUnderenhetOgOverordnetEnhet(),
    },
];
