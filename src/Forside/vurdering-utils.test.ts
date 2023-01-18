import { SykefraværVurdering } from './Speedometer/Speedometer';
import { Statistikkategori } from '../api/summert-sykefraværshistorikk-api';
import {
    lagStatistikkMock,
    siste4KvartalerMock,
    siste2KvartalerMock,
} from '../mocking/summert-sykefraværshistorikk-mock';
import { getVurdering } from './vurdering-utils';

function sykefraværVirksomhet(prosent: string) {
    return lagStatistikkMock(
        Statistikkategori.VIRKSOMHET,
        'virksomhetens navn',
        prosent,
        siste4KvartalerMock
    );
}

function sykefraværBransje(prosent: string) {
    return lagStatistikkMock(
        Statistikkategori.BRANSJE,
        'bransjens navn',
        prosent,
        siste4KvartalerMock
    );
}

it('getVurdering skal gi riktig vurdering', () => {
    expect(getVurdering(sykefraværVirksomhet('5.5'), sykefraværBransje('5.0'))).toEqual(
        SykefraværVurdering.OVER
    );
    expect(getVurdering(sykefraværVirksomhet('5.4'), sykefraværBransje('5.0'))).toEqual(
        SykefraværVurdering.MIDDELS
    );
    expect(getVurdering(sykefraværVirksomhet('4.5'), sykefraværBransje('5.0'))).toEqual(
        SykefraværVurdering.MIDDELS
    );
    expect(getVurdering(sykefraværVirksomhet('4.49'), sykefraværBransje('5.0'))).toEqual(
        SykefraværVurdering.UNDER
    );
});

it('getVurdering skal gi vurdering INGEN_DATA hvis data tilsier det', () => {
    expect(getVurdering(undefined, undefined)).toEqual(SykefraværVurdering.FEIL_ELLER_INGEN_DATA);
});

it('getVurdering - skal gi vurdering UFULLSTENDIG_DATA hvis data tilsier det', () => {
    const bareToKvartaler = {
        ...sykefraværVirksomhet('10.0'),
        kvartalerIBeregningen: siste2KvartalerMock,
    };

    expect(getVurdering(bareToKvartaler, sykefraværBransje('10.0'))).toEqual(
        SykefraværVurdering.UFULLSTENDIG_DATA
    );
});

it('getVurdering - skal gi vurdering MASKERT hvis data inneholder bransjetall, men ikke virksomhetstall', () => {
    expect(getVurdering(undefined, sykefraværBransje('10.0'))).toEqual(SykefraværVurdering.MASKERT);
});
