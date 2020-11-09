import { Bransjetype, VirksomhetMetadata } from '../api/virksomhetMetadata';
import { Sykefraværshistorikk } from '../api/sykefraværshistorikk';
import {
    lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet,
    lagHistorikkMedLikHistorikkForUnderenhetOgOverordnetEnhet,
    lagMaskertHistorikk,
    lagMockHistorikkForBarnehage,
} from './sykefraværshistorikk';
import { Sykefraværsvarighet } from '../api/sykefraværsvarighet';
import {
    sykefraværsvarighetMockGrønn,
    sykefraværsvarighetMockGul,
    sykefraværsvarighetMockMaskert,
    sykefraværsvarighetMockMedBare2Kvartaler,
    sykefraværsvarighetMockMedSiste4Kvartaler,
    sykefraværsvarighetMockRød,
} from './sykefraværsvarighet';
import { OverordnetEnhet, UnderenhetDto } from '../api/enhetsregisteret-api';
import { getVirksomhetMetadataMock } from './virksomhet-metadata';

export interface OrganisasjonMock {
    orgnr: string;
    bedriftsmetrikker?: VirksomhetMetadata | number;
    sykefraværshistorikkKvartalsvis?: Sykefraværshistorikk[] | number;
    sykefraværshistorikkSummert?: Sykefraværsvarighet | number;
    overordnetEnhet?: OverordnetEnhet | number;
    underenhetDto?: UnderenhetDto | number;
}

export const getMockOrganisasjon = (orgnr: string): OrganisasjonMock | undefined =>
    mockedeOrganisasjoner.find((org) => org.orgnr === orgnr);

const mockedeOrganisasjoner: OrganisasjonMock[] = [
    {
        orgnr: '101010101',
        bedriftsmetrikker: 500,
        sykefraværshistorikkKvartalsvis: 500,
        sykefraværshistorikkSummert: 500,
    },
    {
        orgnr: '100100100',
        bedriftsmetrikker: 500,
        sykefraværshistorikkKvartalsvis: 403,
        sykefraværshistorikkSummert: 403,
    },
    {
        orgnr: '888888881',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: sykefraværsvarighetMockRød,
    },
    {
        orgnr: '888888882',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: sykefraværsvarighetMockGul,
    },
    {
        orgnr: '888888883',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: sykefraværsvarighetMockGrønn,
    },
    {
        orgnr: '888888884',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: 500,
    },
    {
        orgnr: '888888885',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    },
    {
        orgnr: '888888886',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: sykefraværsvarighetMockMedBare2Kvartaler,
    },
    {
        orgnr: '888888887',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: sykefraværsvarighetMockMaskert,
    },
    {
        orgnr: '888888888',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: sykefraværsvarighetMockMedSiste4Kvartaler,
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
    {
        orgnr: '120000001',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.BARNEHAGER),
    },
    {
        orgnr: '120000002',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.SYKEHJEM),
    },
    {
        orgnr: '120000003',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.SYKEHUS),
    },
    {
        orgnr: '120000004',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.NÆRINGSMIDDELINDUSTRI),
    },
    {
        orgnr: '120000005',
        bedriftsmetrikker: getVirksomhetMetadataMock(Bransjetype.TRANSPORT),
    },
    {
        orgnr: '120000009',
        bedriftsmetrikker: getVirksomhetMetadataMock(),
    },
];
