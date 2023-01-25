import { SykefraværVurdering } from './Speedometer/Speedometer';
import { Statistikkategori } from '../api/summert-sykefraværshistorikk-api';
import {
    lagStatistikkMock,
    siste4KvartalerMock,
    siste2KvartalerMock,
} from '../mocking/summert-sykefraværshistorikk-mock';
import { sammenliknSykefravær } from './vurdering-utils';

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

it('sammenliknSykefravær skal gi riktig vurdering', () => {
    expect(sammenliknSykefravær(sykefraværVirksomhet('5.51'), sykefraværBransje('5.0')))
      .toEqual(SykefraværVurdering.OVER);
    expect(sammenliknSykefravær(sykefraværVirksomhet('5.50'), sykefraværBransje('5.0')))
      .toEqual(SykefraværVurdering.MIDDELS);
    expect(sammenliknSykefravær(sykefraværVirksomhet('4.5'), sykefraværBransje('5.0')))
      .toEqual(SykefraværVurdering.MIDDELS);
    expect(sammenliknSykefravær(sykefraværVirksomhet('4.49'), sykefraværBransje('5.0')))
      .toEqual(SykefraværVurdering.UNDER);
});

it('sammenliknSykefravær skal gi vurdering INGEN_DATA hvis data tilsier det', () => {
    expect(sammenliknSykefravær(undefined, undefined)).toEqual(SykefraværVurdering.FEIL_ELLER_INGEN_DATA);
});

it('sammenliknSykefravær - skal gi vurdering UFULLSTENDIG_DATA hvis data tilsier det', () => {
    const bareToKvartaler = {
        ...sykefraværVirksomhet('10.0'),
        kvartalerIBeregningen: siste2KvartalerMock,
    };

    expect(sammenliknSykefravær(bareToKvartaler, sykefraværBransje('10.0'))).toEqual(
        SykefraværVurdering.UFULLSTENDIG_DATA
    );
});

it('sammenliknSykefravær - skal gi vurdering MASKERT hvis data inneholder bransjetall, men ikke virksomhetstall', () => {
    expect(sammenliknSykefravær(undefined, sykefraværBransje('10.0'))).toEqual(SykefraværVurdering.MASKERT);
});
