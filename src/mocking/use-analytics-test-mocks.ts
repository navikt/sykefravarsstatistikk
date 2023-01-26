import { AggregertStatistikk } from '../hooks/useAggregertStatistikk';
import { siste4KvartalerMock } from './summert-sykefraværshistorikk-mock';
import { SykefraværAppData } from '../hooks/useSykefraværAppData';
import { RestStatus } from '../api/api-utils';
import { getOrganisasjonerBrukerHarTilgangTilMock, getOrganisasjonerMock } from './altinn-mock';
import { mapTilUnderenhet } from '../enhetsregisteret/api/underenheter-api';
import { underenheterResponseMock } from '../enhetsregisteret/api/mocks/underenheter-api-mocks';
import { getMockPubliseringsdatoer } from './mock-publiseringsdatoer';
import { Statistikkategori } from "../domene/statistikkategori";

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

export const allDatahentingStatusOk: SykefraværAppData = {
    aggregertStatistikk: { restStatus: RestStatus.Suksess, aggregertData: aggregertStatistikkMock },
    altinnOrganisasjoner: { status: RestStatus.Suksess, data: getOrganisasjonerMock() },
    altinnOrganisasjonerMedStatistikktilgang: {
        status: RestStatus.Suksess,
        data: getOrganisasjonerBrukerHarTilgangTilMock(),
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
    sykefraværshistorikk: { status: RestStatus.Suksess, data: [] },
};

export const allDatahentingFeiler: SykefraværAppData = {
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
