import {Virksomhetsdata} from '../api/virksomhetsdata-api';
import {KvartalsvisSykefraværshistorikk} from '../api/kvartalsvis-sykefraværshistorikk-api';
import {
  lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet,
  lagMaskertHistorikk,
  lagMockHistorikkForBarnehage,
} from './sykefraværshistorikk-mock';
import {
  Statistikkategori,
  SummertSykefraværshistorikk
} from '../api/summert-sykefraværshistorikk-api';
import {UnderenhetDto} from '../enhetsregisteret/api/underenheter-api';
import {getvirksomhetsdataMock} from './virksomhetsdata-mock';
import {ArbeidsmiljøportalenBransje} from '../utils/bransje-utils';
import {
  getSummertSykefraværshistorikkMock,
  summertSykefraværshistorikkMockGrønn,
  summertSykefraværshistorikkMockGul,
  summertSykefraværshistorikkMockMaskert,
  summertSykefraværshistorikkMockMedBare2Kvartaler,
  summertSykefraværshistorikkMockMedSiste4Kvartaler,
  summertSykefraværshistorikkMockRød,
} from './summert-sykefraværshistorikk-mock';
import { OverordnetEnhet } from "../enhetsregisteret/domene/enhet";

export interface OrganisasjonMock {
  orgnr: string;
  bedriftsmetrikker?: Virksomhetsdata | number;
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
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.BARNEHAGER),
    sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    summertSykefraværshistorikk: summertSykefraværshistorikkMockRød,
  },
  {
    orgnr: '888888882',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.BARNEHAGER),
    sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    summertSykefraværshistorikk: summertSykefraværshistorikkMockGul,
  },
  {
    orgnr: '888888883',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.BARNEHAGER),
    sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    summertSykefraværshistorikk: summertSykefraværshistorikkMockGrønn,
  },
  {
    orgnr: '888888884',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.BARNEHAGER),
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
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.BARNEHAGER),
    sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    summertSykefraværshistorikk: summertSykefraværshistorikkMockMedBare2Kvartaler,
  },
  {
    orgnr: '888888887',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.BARNEHAGER),
    sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    summertSykefraværshistorikk: summertSykefraværshistorikkMockMaskert,
  },
  {
    orgnr: '888888888',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.BARNEHAGER),
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
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.BARNEHAGER),
    sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
    summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
        Statistikkategori.BRANSJE,
        'Barnehager',
    ),
  },
  {
    orgnr: '120000002',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.SYKEHJEM),
    summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
        Statistikkategori.BRANSJE,
        'Sykehjem',
    ),
  },
  {
    orgnr: '120000003',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.SYKEHUS),
    summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
        Statistikkategori.BRANSJE,
        'Sykehus',
    ),
  },
  {
    orgnr: '120000004',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.NÆRINGSMIDDELINDUSTRI),
    summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
        Statistikkategori.BRANSJE,
        'Næringsmiddelindustrien',
    ),
  },
  {
    orgnr: '120000005',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.TRANSPORT),
    summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
        Statistikkategori.BRANSJE,
        'Transport',
    ),
  },
  {
    orgnr: '120000006',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.BYGG),
    summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
        Statistikkategori.BRANSJE,
        'Byggebransjen',
    ),
  },
  {
    orgnr: '120000007',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.ANLEGG),
    summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
        Statistikkategori.BRANSJE,
        'Anleggsbransjen',
    ),
  },
  {
    orgnr: '120000009',
    bedriftsmetrikker: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.ANDRE_BRANSJER),
    summertSykefraværshistorikk: getSummertSykefraværshistorikkMock(
        Statistikkategori.NÆRING,
        'Produksjon av nærings- og nytelsesmidler',
    ),
  },
];
