import { KvartalsvisSykefraværshistorikk } from '../api/kvartalsvis-sykefraværshistorikk-api';
import {
    lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet,
    lagMaskertHistorikk,
    lagMockHistorikkForBarnehage,
} from './sykefraværshistorikk-mock';
import { Statistikkategori } from '../api/summert-sykefraværshistorikk-api';
import { UnderenhetDto } from '../enhetsregisteret/api/underenheter-api';
import {
    AggregertStatistikkApiResponse,
    aggregertStatistikkMockGrønnBarnehage,
    aggregertStatistikkMockGulBarnehage,
    aggregertStatistikkMockMaskert,
    aggregertStatistikkMockMedBare2Kvartaler,
    aggregertStatistikkMockRødBarnehage,
    lagAggregertStatistikkMockGul,
} from './summert-sykefraværshistorikk-mock';
import { OverordnetEnhetDto } from '../enhetsregisteret/api/enheter-api';

export interface OrganisasjonMock {
    orgnr: string;
    sykefraværshistorikkKvartalsvis?: KvartalsvisSykefraværshistorikk[] | number;
    aggregertStatistikk?: AggregertStatistikkApiResponse | number;
    overordnetEnhet?: OverordnetEnhetDto | number;
    underenhet?: UnderenhetDto | number;
}

export const getMockOrganisasjon = (orgnr: string): OrganisasjonMock | undefined =>
    mockedeOrganisasjoner.find((org) => org.orgnr === orgnr);

export const OverordnetEnhetFiskOgFlesk: OverordnetEnhetDto = {
    organisasjonsnummer: '111111111',
    institusjonellSektorkode: { kode: '2100', beskrivelse: 'Private aksjeselskaper mv.' },
};

// TODO: Flytt meg til enhetsregisteret
export const underenhetFiskOgFleskMock: UnderenhetDto = {
    organisasjonsnummer: '910969439',
    navn: 'FLESK OG FISK OSLO',
    organisasjonsform: {
        kode: 'BEDR',
        beskrivelse: 'Bedrift',
        _links: {
            self: {
                href: 'https://data.brreg.no/enhetsregisteret/api/organisasjonsformer/BEDR',
            },
        },
    },
    registreringsdatoEnhetsregisteret: '1990-01-01',
    registrertIMvaregisteret: false,
    naeringskode1: {
        beskrivelse: 'Hav- og kystfiske',
        kode: '03.111',
    },
    antallAnsatte: 38,
    overordnetEnhet: '111111111',
    oppstartsdato: '1990-01-01',
    beliggenhetsadresse: {
        land: 'Norge',
        landkode: 'NO',
        postnummer: '9392',
        poststed: 'STONGLANDSEIDET',
        adresse: ['testadresse AS'],
        kommune: 'SENJA',
        kommunenummer: '5421',
    },
    _links: {
        self: {
            href: 'https://data.brreg.no/enhetsregisteret/api/underenheter/910969439',
        },
        overordnetEnhet: {
            href: 'https://data.brreg.no/enhetsregisteret/api/enheter/111111111',
        },
    },
};

const mockedeOrganisasjoner: OrganisasjonMock[] = [
    {
        orgnr: '111111111',
        sykefraværshistorikkKvartalsvis: 500,
        aggregertStatistikk: 500,
        overordnetEnhet: OverordnetEnhetFiskOgFlesk,
    },
    {
        orgnr: '101010101',
        sykefraværshistorikkKvartalsvis: 500,
        aggregertStatistikk: 500,
    },
    {
        orgnr: '100100100',
        sykefraværshistorikkKvartalsvis: 403,
        aggregertStatistikk: 403,
    },
    {
        orgnr: '910969439',
        aggregertStatistikk: lagAggregertStatistikkMockGul(
            Statistikkategori.NÆRING,
            'Produksjon av nærings- og nytelsesmidler'
        ),
        overordnetEnhet: OverordnetEnhetFiskOgFlesk,
        underenhet: underenhetFiskOgFleskMock,
    },
    {
        orgnr: '888888881',
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        aggregertStatistikk: aggregertStatistikkMockRødBarnehage,
    },
    {
        orgnr: '888888882',
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        aggregertStatistikk: aggregertStatistikkMockGulBarnehage,
    },
    {
        orgnr: '888888883',
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        aggregertStatistikk: aggregertStatistikkMockGrønnBarnehage,
    },
    {
        orgnr: '888888884',
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        aggregertStatistikk: 500,
    },
    {
        orgnr: '888888885',
        sykefraværshistorikkKvartalsvis: undefined,
        aggregertStatistikk: undefined,
    },
    {
        orgnr: '888888886',
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        aggregertStatistikk: aggregertStatistikkMockMedBare2Kvartaler(),
    },
    {
        orgnr: '888888887',
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        aggregertStatistikk: aggregertStatistikkMockMaskert,
    },
    {
        orgnr: '333333333',
        sykefraværshistorikkKvartalsvis:
            lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet(),
        aggregertStatistikk: lagAggregertStatistikkMockGul(
            Statistikkategori.NÆRING,
            'Produksjon av nærings- og nytelsesmidler'
        ),
    },
    {
        orgnr: '444444444',
        sykefraværshistorikkKvartalsvis: lagMaskertHistorikk(),
        aggregertStatistikk: aggregertStatistikkMockMaskert,
    },
    {
        orgnr: '120000001',
        sykefraværshistorikkKvartalsvis: lagMockHistorikkForBarnehage(),
        aggregertStatistikk: lagAggregertStatistikkMockGul(Statistikkategori.BRANSJE, 'Barnehager'),
    },
    {
        orgnr: '120000002',
        aggregertStatistikk: lagAggregertStatistikkMockGul(Statistikkategori.BRANSJE, 'Sykehjem'),
    },
    {
        orgnr: '120000003',
        aggregertStatistikk: lagAggregertStatistikkMockGul(Statistikkategori.BRANSJE, 'Sykehus'),
    },
    {
        orgnr: '120000004',
        aggregertStatistikk: lagAggregertStatistikkMockGul(
            Statistikkategori.BRANSJE,
            'Næringsmiddelindustrien'
        ),
    },
    {
        orgnr: '120000005',
        aggregertStatistikk: lagAggregertStatistikkMockGul(Statistikkategori.BRANSJE, 'Transport'),
    },
    {
        orgnr: '120000006',
        aggregertStatistikk: lagAggregertStatistikkMockGul(
            Statistikkategori.BRANSJE,
            'Byggebransjen'
        ),
    },
    {
        orgnr: '120000007',
        aggregertStatistikk: lagAggregertStatistikkMockGul(
            Statistikkategori.BRANSJE,
            'Anleggsbransjen'
        ),
    },
    {
        orgnr: '120000009',
        aggregertStatistikk: lagAggregertStatistikkMockGul(
            Statistikkategori.NÆRING,
            'Produksjon av nærings- og nytelsesmidler'
        ),
    },
];
