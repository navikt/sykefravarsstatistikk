import {VirksomhetMetadata} from '../api/virksomhetMetadata';
import {KvartalsvisSykefraværshistorikk} from '../api/kvartalsvisSykefraværshistorikk';
import {
    lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet,
    lagMaskertHistorikk,
    lagMockHistorikkForBarnehage,
} from './sykefraværshistorikk-mock';
import {Statistikkategori, SummertSykefraværshistorikk} from '../api/summertSykefraværshistorikk';
import {OverordnetEnhet, UnderenhetDto} from '../api/enhetsregisteret-api';
import {getVirksomhetMetadataMock} from './virksomhet-metadata-mock';
import {ArbeidstilsynetBransje} from '../Forside/ArbeidsmiljøportalPanel/bransje-utils';
import {
    getSummertSykefraværshistorikkMock,
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

export const getMockOrganisasjon = (orgnr: string): OrganisasjonMock | undefined =>
    mockedeOrganisasjoner.find((org) => org.orgnr === orgnr);

export const OverordnetEnhetFiskOgFlesk: OverordnetEnhet = {
    orgnr: "111111111",
    institusjonellSektorkode: {kode: '2100', beskrivelse: 'Private aksjeselskaper mv.'},
};

export const underenhetFiskOgFleskMock: UnderenhetDto = {
    organisasjonsnummer: "910969439",
    navn: "FLESK OG FISK OSLO",
    organisasjonsform: {
        kode: "BEDR",
        beskrivelse: "Bedrift",
        _links: {
            self: {
                href: "https://data.brreg.no/enhetsregisteret/api/organisasjonsformer/BEDR"
            }
        }
    },
    registreringsdatoEnhetsregisteret: "1990-01-01",
    registrertIMvaregisteret: false,
    naeringskode1: {
        beskrivelse: "Hav- og kystfiske",
        kode: "03.111"
    },
    antallAnsatte: 38,
    overordnetEnhet: "111111111",
    oppstartsdato: "1990-01-01",
    beliggenhetsadresse: {
        land: "Norge",
        landkode: "NO",
        postnummer: "9392",
        poststed: "STONGLANDSEIDET",
        adresse: [
            "testadresse AS"
        ],
        kommune: "SENJA",
        kommunenummer: "5421"
    },
    _links: {
        self: {
            href: "https://data.brreg.no/enhetsregisteret/api/underenheter/910969439"
        },
        overordnetEnhet: {
            href: "https://data.brreg.no/enhetsregisteret/api/enheter/111111111"
        }
    }
}

const mockedeOrganisasjoner: OrganisasjonMock[] = [
    {
        orgnr: '111111111',
        bedriftsmetrikker: 500,
        sykefraværshistorikkKvartalsvis: 500,
        summertSykefraværshistorikk: 500,
        overordnetEnhet: OverordnetEnhetFiskOgFlesk,
    },
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
        summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
            Statistikkategori.NÆRING,
            'Produksjon av nærings- og nytelsesmidler'
        ),
        overordnetEnhet: OverordnetEnhetFiskOgFlesk,
        underenhetDto: underenhetFiskOgFleskMock,
        bedriftsmetrikker: {
            antallAnsatte: 132,
            næringskode5Siffer: {
                kode: '03111',
                beskrivelse: 'Hav- og kystfiske',
            },
        }
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
        bedriftsmetrikker: undefined,
        sykefraværshistorikkKvartalsvis: undefined,
        summertSykefraværshistorikk: undefined,
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
        summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
            Statistikkategori.NÆRING,
            'Produksjon av nærings- og nytelsesmidler'
        ),
    },
    {
        orgnr: '444444444',
        sykefraværshistorikkKvartalsvis: lagMaskertHistorikk(),
        summertSykefraværshistorikk: summertSykefraværshistorikkMockMaskert,
    },
    {
        orgnr: '120000001',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BARNEHAGER),
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
            Statistikkategori.BRANSJE,
            'Barnehager'
        ),
    },
    {
        orgnr: '120000002',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.SYKEHJEM),
        summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
            Statistikkategori.BRANSJE,
            'Sykehjem'
        ),
    },
    {
        orgnr: '120000003',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.SYKEHUS),
        summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
            Statistikkategori.BRANSJE,
            'Sykehus'
        ),
    },
    {
        orgnr: '120000004',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI),
        summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
            Statistikkategori.BRANSJE,
            'Næringsmiddelindustrien'
        ),
    },
    {
        orgnr: '120000005',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.TRANSPORT),
        summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
            Statistikkategori.BRANSJE,
            'Transport'
        ),
    },
    {
        orgnr: '120000006',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.BYGG),
        summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
            Statistikkategori.BRANSJE,
            'Byggebransjen'
        ),
    },
    {
        orgnr: '120000007',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.ANLEGG),
        summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
            Statistikkategori.BRANSJE,
            'Anleggsbransjen'
        ),
    },
    {
        orgnr: '120000009',
        bedriftsmetrikker: getVirksomhetMetadataMock(ArbeidstilsynetBransje.ANDRE_BRANSJER),
        summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
            Statistikkategori.NÆRING,
            'Produksjon av nærings- og nytelsesmidler'
        ),
    },
];
