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

export interface OrganisasjonMock {
    orgnr: string;
    bedriftsmetrikker?: VirksomhetMetadata | number;
    sykefraværshistorikkKvartalsvis?: Sykefraværshistorikk[] | number;
    sykefraværshistorikkSummert?: Sykefraværsvarighet | number;
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
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: sykefraværsvarighetMockRød,
    },
    {
        orgnr: '888888882',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: sykefraværsvarighetMockGul,
    },
    {
        orgnr: '888888883',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: sykefraværsvarighetMockGrønn,
    },
    {
        orgnr: '888888884',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: 500,
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
        sykefraværshistorikkSummert: sykefraværsvarighetMockMedBare2Kvartaler,
    },
    {
        orgnr: '888888887',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        sykefraværshistorikkSummert: sykefraværsvarighetMockMaskert,
    },
    {
        orgnr: '888888888',
        bedriftsmetrikker: bedriftsmetrikkerBarnehager,
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
];
