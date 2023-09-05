import { AggregertStatistikk } from '../../hooks/useAggregertStatistikk';
import { siste4KvartalerMock } from './aggregert-statistikk-response-mock';
import { SykefraværAppData } from '../../hooks/useSykefraværAppData';
import { RestStatus } from '../api-utils';
import {
    getOrganisasjonerBrukerHarIaRettigheterTilMock,
    getOrganisasjonerMock,
} from './altinn-mock';
import { mapTilUnderenhet } from '../../enhetsregisteret/api/underenheter-api';
import { underenheterResponseMock } from '../../enhetsregisteret/api/mocks/underenheter-api-mocks';
import { getMockPubliseringsdatoer } from './mock-publiseringsdatoer';
import { Statistikkategori } from '../../domene/statistikkategori';

const aggregertStatistikkMock = new Map<Statistikkategori, AggregertStatistikk>();
aggregertStatistikkMock.set(Statistikkategori.VIRKSOMHET, {
    prosentSiste4KvartalerTotalt: {
        statistikkategori: Statistikkategori.VIRKSOMHET,
        label: 'Virksomheten min',
        kvartalerIBeregningen: siste4KvartalerMock,
        verdi: '10.0',
        antallPersonerIBeregningen: 100,
    },
});
aggregertStatistikkMock.set(Statistikkategori.BRANSJE, {
    prosentSiste4KvartalerTotalt: {
        statistikkategori: Statistikkategori.BRANSJE,
        label: 'Bransjen mi',
        kvartalerIBeregningen: siste4KvartalerMock,
        verdi: '13.0',
        antallPersonerIBeregningen: 1000,
    },
});

export const mockAllDatahentingStatusOk: SykefraværAppData = {
    aggregertStatistikk: { restStatus: RestStatus.Suksess, aggregertData: aggregertStatistikkMock },
    altinnOrganisasjoner: { status: RestStatus.Suksess, data: getOrganisasjonerMock() },
    altinnOrganisasjonerMedStatistikktilgang: {
        status: RestStatus.Suksess,
        data: getOrganisasjonerBrukerHarIaRettigheterTilMock(),
    },
    enhetsregisterdata: {
        restUnderenhet: {
            status: RestStatus.Suksess,
            data: mapTilUnderenhet(underenheterResponseMock),
        },
        restOverordnetEnhet: {
            status: RestStatus.Suksess,
            data: {
                orgnr: '999999991',
                institusjonellSektorkode: { kode: '6100', beskrivelse: 'min sektor' },
            },
        },
    },
    publiseringsdatoer: { status: RestStatus.Suksess, data: getMockPubliseringsdatoer() },
    sykefraværshistorikk: {
        status: RestStatus.Suksess,
        data: [
            {
                type: 'LAND',
                label: 'Norge',
                kvartalsvisSykefraværsprosent: [
                    {
                        årstall: 2015,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 5.5,
                        tapteDagsverk: 55,
                        muligeDagsverk: 5500,
                    },
                ],
            },
            {
                type: 'SEKTOR',
                label: 'Statlig forvaltning',
                kvartalsvisSykefraværsprosent: [
                    {
                        årstall: 2015,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 4,
                        tapteDagsverk: 40,
                        muligeDagsverk: 4000,
                    },
                ],
            },
            {
                type: 'VIRKSOMHET',
                label: 'FLESK OG FISK AS',
                kvartalsvisSykefraværsprosent: [
                    {
                        årstall: 2017,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 8.3,
                        tapteDagsverk: 83,
                        muligeDagsverk: 8300,
                    },
                ],
            },
            {
                type: 'OVERORDNET_ENHET',
                label: 'THE FISHING GROUP',
                kvartalsvisSykefraværsprosent: [
                    {
                        årstall: 2016,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 7.1,
                        tapteDagsverk: 71,
                        muligeDagsverk: 7100,
                    },
                ],
            },
            {
                type: 'NÆRING',
                label: 'Produksjon av nærings- og nytelsesmidler',
                kvartalsvisSykefraværsprosent: [
                    {
                        årstall: 2015,
                        kvartal: 2,
                        erMaskert: false,
                        prosent: 6.7,
                        tapteDagsverk: 67,
                        muligeDagsverk: 6700,
                    },
                ],
            },
        ],
    },
};

export const mockAllDatahentingStatusLaster: SykefraværAppData = {
    aggregertStatistikk: { restStatus: RestStatus.LasterInn },
    altinnOrganisasjoner: { status: RestStatus.LasterInn },
    altinnOrganisasjonerMedStatistikktilgang: {
        status: RestStatus.LasterInn,
    },
    enhetsregisterdata: {
        restUnderenhet: {
            status: RestStatus.LasterInn,
        },
        restOverordnetEnhet: {
            status: RestStatus.LasterInn,
        },
    },
    publiseringsdatoer: { status: RestStatus.Suksess, data: getMockPubliseringsdatoer() },
    sykefraværshistorikk: { status: RestStatus.Suksess, data: [] },
};

export const mockAllDatahentingFeiler: SykefraværAppData = {
    aggregertStatistikk: { restStatus: RestStatus.Feil },
    altinnOrganisasjoner: { status: RestStatus.Feil },
    altinnOrganisasjonerMedStatistikktilgang: { status: RestStatus.Feil },
    enhetsregisterdata: {
        restUnderenhet: { status: RestStatus.Feil },
        restOverordnetEnhet: {
            status: RestStatus.Feil,
        },
    },
    publiseringsdatoer: { status: RestStatus.Feil },
    sykefraværshistorikk: { status: RestStatus.Feil },
};
