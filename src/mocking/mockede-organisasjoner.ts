import { VirksomhetMetadata } from '../api/virksomhetMetadata';
import { Sykefraværshistorikk } from '../api/sykefraværshistorikk';
import {
    lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet,
    lagHistorikkMedLikHistorikkForUnderenhetOgOverordnetEnhet,
    lagMaskertHistorikk,
    lagMockHistorikkForBarnehage,
} from './sykefraværshistorikk-mock';
import { SummertSykefraværshistorikk } from '../api/sykefraværsvarighet';
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
    sykefraværshistorikkKvartalsvis?: Sykefraværshistorikk[] | number;
    summertSykefraværshistorikk?: SummertSykefraværshistorikk[] | number;
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
        summertSykefraværshistorikk: 500,
    },
    {
        orgnr: '100100100',
        bedriftsmetrikker: 500,
        sykefraværshistorikkKvartalsvis: 403,
        summertSykefraværshistorikk: 403,
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
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    },
    {
        orgnr: '120000002',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.SYKEHJEM),
    },
    {
        orgnr: '120000003',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.SYKEHUS),
    },
    {
        orgnr: '120000004',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI),
    },
    {
        orgnr: '120000005',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.TRANSPORT),
    },
    {
        orgnr: '120000006',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BYGG),
    },
    {
        orgnr: '120000007',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.ANLEGG),
    },
    {
        orgnr: '120000009',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.ANDRE_BRANSJER),
    },
];
