import { VirksomhetMetadata } from '../api/virksomhetMetadata';
import { KvartalsvisSykefraværshistorikk } from '../api/kvartalsvisSykefraværshistorikk';
import {
    lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet,
    lagHistorikkMedLikHistorikkForUnderenhetOgOverordnetEnhet,
    lagMaskertHistorikk,
    lagMockHistorikkForBarnehage,
} from './sykefraværshistorikk-mock';
import { SummertSykefraværshistorikk } from '../api/summertSykefraværshistorikk';
import { OverordnetEnhet, UnderenhetDto } from '../api/enhetsregisteret-api';
import { getVirksomhetMetadataMock } from './virksomhet-metadata-mock';
import { ArbeidstilsynetBransje } from '../Forside/ArbeidsmiljøportalPanel/bransje-utils';
import {
    summertSykefraværshistorikkMockGrønn,
    summertSykefraværshistorikkMockGul,
    summertSykefraværshistorikkMockMaskert,
    summertSykefraværshistorikkMockMedBare2Kvartaler,
    summertSykefraværshistorikkMockMedSiste4Kvartaler,
    summertSykefraværshistorikkMockRød,
} from './summert-sykefraværshistorikk-mock';

export interface OrganisasjonMock {
    orgnr: string;
    bedriftsmetrikker?: VirksomhetMetadata | number;
    sykefraværshistorikkKvartalsvis?: KvartalsvisSykefraværshistorikk[] | number;
    summertSykefraværshistorikk?: SummertSykefraværshistorikk[] | number;
    overordnetEnhet?: OverordnetEnhet | number;
    underenhetDto?: UnderenhetDto | number;
}

// TODO Nå sammenlignes alle mot barnehage-tall.

export const getMockOrganisasjon = (orgnr: string): OrganisasjonMock | undefined =>
    mockedeOrganisasjoner.find((org) => org.orgnr === orgnr);

const mockedeOrganisasjoner: OrganisasjonMock[] = [
    {
        orgnr: '101010101',
        bedriftsmetrikker: 500,
        sykefraværshistorikkKvartalsvis: 500,
        summertSykefraværshistorikk: 500,
    },
    {
        orgnr: '100100100',
        bedriftsmetrikker: 500,
        sykefraværshistorikkKvartalsvis: 403,
        summertSykefraværshistorikk: 403,
    },
    {
        orgnr: '910969439',
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '888888881',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockRød,
    },
    {
        orgnr: '888888882',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockGul,
    },
    {
        orgnr: '888888883',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockGrønn,
    },
    {
        orgnr: '888888884',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        summertSykefraværshistorikk: 500,
    },
    {
        orgnr: '888888885',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '888888886',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedBare2Kvartaler,
    },
    {
        orgnr: '888888887',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMaskert,
    },
    {
        orgnr: '888888888',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '333333333',
        sykefraværshistorikkKvartalsvis: lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '444444444',
        sykefraværshistorikkKvartalsvis: lagMaskertHistorikk(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '666666666',
        sykefraværshistorikkKvartalsvis: lagHistorikkMedLikHistorikkForUnderenhetOgOverordnetEnhet(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '120000001',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '120000002',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.SYKEHJEM),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '120000003',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.SYKEHUS),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '120000004',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '120000005',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.TRANSPORT),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '120000006',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BYGG),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '120000007',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.ANLEGG),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
    {
        orgnr: '120000009',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.ANDRE_BRANSJER),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMedSiste4Kvartaler,
    },
];
