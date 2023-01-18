import {SykefraværVurdering} from './Speedometer/Speedometer';
import {
  RestSummertSykefraværshistorikk,
  Statistikkategori
} from '../api/summert-sykefraværshistorikk-api';
import {RestStatus} from '../api/api-utils';
import {
  lagStatistikkMock,
  siste4KvartalerMock
} from "../mocking/summert-sykefraværshistorikk-mock";
import { getVurdering } from "./vurdering-utils";

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

describe('Tester for getSammenligningResultat', () => {
  it('get - skal gi vurdering FEIL hvis reststatus er FEIL', () => {
    const restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk = {
      status: RestStatus.Feil,
    };
    const resultater: Sammenligningsresultater = getSammenligningResultat(
        restSummertSykefraværshistorikk
    );

    expect(resultater.sammenligningResultatTotalt.sammenligningVurdering).toEqual(
        SykefraværVurdering.FEIL
    );
    expect(resultater.sammenligningResultatKorttid.sammenligningVurdering).toEqual(
        SykefraværVurdering.FEIL
    );
    expect(resultater.sammenligningResultatLangtid.sammenligningVurdering).toEqual(
        SykefraværVurdering.FEIL
    );
    expect(resultater.sammenligningResultatGradert.sammenligningVurdering).toEqual(
        SykefraværVurdering.FEIL
    );
  });

  it('getSammenligningResultat - skal gi vurdering UNDER hvis data tilsier det', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: summertSykefraværshistorikkMockGrønn,
    });

    expect(resultater.sammenligningResultatTotalt.sammenligningVurdering).toEqual(
        SykefraværVurdering.UNDER
    );
    expect(resultater.sammenligningResultatKorttid.sammenligningVurdering).toEqual(
        SykefraværVurdering.UNDER
    );
    expect(resultater.sammenligningResultatLangtid.sammenligningVurdering).toEqual(
        SykefraværVurdering.UNDER
    );
    expect(resultater.sammenligningResultatGradert.sammenligningVurdering).toEqual(
        SykefraværVurdering.OVER
    );
  });

  it('getSammenligningResultat - skal gi vurdering MIDDELS hvis data tilsier det', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: summertSykefraværshistorikkMockGul,
    });

    expect(resultater.sammenligningResultatTotalt.sammenligningVurdering).toEqual(
        SykefraværVurdering.MIDDELS
    );
    expect(resultater.sammenligningResultatKorttid.sammenligningVurdering).toEqual(
        SykefraværVurdering.MIDDELS
    );
    expect(resultater.sammenligningResultatLangtid.sammenligningVurdering).toEqual(
        SykefraværVurdering.MIDDELS
    );
    expect(resultater.sammenligningResultatGradert.sammenligningVurdering).toEqual(
        SykefraværVurdering.MIDDELS
    );
  });

  it('getSammenligningResultat - skal gi vurdering OVER hvis data tilsier det', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: summertSykefraværshistorikkMockRød,
    });

    expect(resultater.sammenligningResultatTotalt.sammenligningVurdering).toEqual(
        SykefraværVurdering.OVER
    );
    expect(resultater.sammenligningResultatKorttid.sammenligningVurdering).toEqual(
        SykefraværVurdering.OVER
    );
    expect(resultater.sammenligningResultatLangtid.sammenligningVurdering).toEqual(
        SykefraværVurdering.OVER
    );
    expect(resultater.sammenligningResultatGradert.sammenligningVurdering).toEqual(
        SykefraværVurdering.UNDER
    );
  });

  it('getSammenligningResultat - skal gi vurdering INGEN_DATA hvis data tilsier det', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: summertSykefraværshistorikkMockUtenData,
    });

    expect(resultater.sammenligningResultatTotalt.sammenligningVurdering).toEqual(
        SykefraværVurdering.INGEN_DATA
    );
    expect(resultater.sammenligningResultatKorttid.sammenligningVurdering).toEqual(
        SykefraværVurdering.INGEN_DATA
    );
    expect(resultater.sammenligningResultatLangtid.sammenligningVurdering).toEqual(
        SykefraværVurdering.INGEN_DATA
    );
    expect(resultater.sammenligningResultatGradert.sammenligningVurdering).toEqual(
        SykefraværVurdering.INGEN_DATA
    );
  });

  it('getSammenligningResultat - skal gi vurdering UFULLSTENDIG_DATA hvis data tilsier det', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: summertSykefraværshistorikkMockMedBare2Kvartaler,
    });

    expect(resultater.sammenligningResultatTotalt.sammenligningVurdering).toEqual(
        SykefraværVurdering.UFULLSTENDIG_DATA
    );
    expect(resultater.sammenligningResultatKorttid.sammenligningVurdering).toEqual(
        SykefraværVurdering.UFULLSTENDIG_DATA
    );
    expect(resultater.sammenligningResultatLangtid.sammenligningVurdering).toEqual(
        SykefraværVurdering.UFULLSTENDIG_DATA
    );
    expect(resultater.sammenligningResultatGradert.sammenligningVurdering).toEqual(
        SykefraværVurdering.UFULLSTENDIG_DATA
    );
  });

  it('getSammenligningResultat - skal gi vurdering MASKERT hvis data tilsier det', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: summertSykefraværshistorikkMockMaskert,
    });

    expect(resultater.sammenligningResultatTotalt.sammenligningVurdering).toEqual(
        SykefraværVurdering.MASKERT
    );
    expect(resultater.sammenligningResultatKorttid.sammenligningVurdering).toEqual(
        SykefraværVurdering.MASKERT
    );
    expect(resultater.sammenligningResultatLangtid.sammenligningVurdering).toEqual(
        SykefraværVurdering.MASKERT
    );
    expect(resultater.sammenligningResultatGradert.sammenligningVurdering).toEqual(
        SykefraværVurdering.MASKERT
    );
  });

  it('getSammenligningResultat - skal gi riktig vurdering for virksomhet uten bransje', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: getSummertSykefraværshistorikkMock(
          Statistikkategori.NÆRING,
          'Produksjon av nærings- og nytelsesmidler'
      ),
    });

    expect(resultater.sammenligningResultatTotalt.sammenligningVurdering).toEqual(
        SykefraværVurdering.MIDDELS
    );
    expect(resultater.sammenligningResultatKorttid.sammenligningVurdering).toEqual(
        SykefraværVurdering.OVER
    );
    expect(resultater.sammenligningResultatLangtid.sammenligningVurdering).toEqual(
        SykefraværVurdering.UNDER
    );
    expect(resultater.sammenligningResultatGradert.sammenligningVurdering).toEqual(
        SykefraværVurdering.UNDER
    );
  });

  const siste4Kvartaler = [
    {årstall: 2019, kvartal: 2},
    {årstall: 2019, kvartal: 3},
    {årstall: 2019, kvartal: 4},
    {årstall: 2020, kvartal: 1},
  ];
  it('getSammenligningResultat skal returnere riktig sykefraværsprosent for virksomhet', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: [
        {
          type: Statistikkategori.VIRKSOMHET,
          label: 'En virksomhet',
          summertKorttidsOgLangtidsfravær: {
            summertKorttidsfravær: {
              prosent: 2.3,
              tapteDagsverk: 140.6,
              muligeDagsverk: 3990.4,
              erMaskert: false,
              kvartaler: siste4Kvartaler,
            },
            summertLangtidsfravær: {
              prosent: 6.1,
              tapteDagsverk: 116.7,
              muligeDagsverk: 3990.4,
              erMaskert: false,
              kvartaler: siste4Kvartaler,
            },
          },
          summertGradertFravær: {
            prosent: 1,
            tapteDagsverk: 39.9,
            muligeDagsverk: 3990.4,
            erMaskert: false,
            kvartaler: siste4Kvartaler,
          },
        },
      ],
    });
    expect(resultater.sammenligningResultatTotalt.sykefraværVirksomhet! - 8.4).toBeLessThan(
        0.01
    );
    expect(resultater.sammenligningResultatKorttid.sykefraværVirksomhet).toEqual(2.3);
    expect(resultater.sammenligningResultatLangtid.sykefraværVirksomhet).toEqual(6.1);
    expect(resultater.sammenligningResultatGradert.sykefraværVirksomhet! - 15.51).toBeLessThan(
        0.01
    );
  });

  it('getSammenligningResultat skal returnere riktig sykefraværsprosent for bransje', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: [
        {
          type: Statistikkategori.BRANSJE,
          label: 'Barnehager',

          summertKorttidsOgLangtidsfravær: {
            summertKorttidsfravær: {
              prosent: 1.2,
              tapteDagsverk: 12,
              muligeDagsverk: 1000,
              erMaskert: false,
              kvartaler: siste4Kvartaler,
            },
            summertLangtidsfravær: {
              prosent: 7.5,
              tapteDagsverk: 75,
              muligeDagsverk: 1000,
              erMaskert: false,
              kvartaler: siste4Kvartaler,
            },
          },
          summertGradertFravær: {
            prosent: 4.4,
            tapteDagsverk: 44,
            muligeDagsverk: 1000,
            erMaskert: false,
            kvartaler: siste4Kvartaler,
          },
        },
      ],
    });
    expect(resultater.sammenligningResultatTotalt.sykefraværNæringEllerBransje).toEqual(8.7);
    expect(resultater.sammenligningResultatKorttid.sykefraværNæringEllerBransje).toEqual(1.2);
    expect(resultater.sammenligningResultatLangtid.sykefraværNæringEllerBransje).toEqual(7.5);
    expect(
        resultater.sammenligningResultatGradert.sykefraværNæringEllerBransje! - 50.6
    ).toBeLessThan(0.01);
  });

  it('getSammenligningResultat skal returnere riktig sykefraværsprosent for næring', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: [
        {
          type: Statistikkategori.NÆRING,
          label: 'En virksomhet',
          summertKorttidsOgLangtidsfravær: {
            summertKorttidsfravær: {
              prosent: 2.3,
              tapteDagsverk: 140.6,
              muligeDagsverk: 3990.4,
              erMaskert: false,
              kvartaler: siste4Kvartaler,
            },
            summertLangtidsfravær: {
              prosent: 6.1,
              tapteDagsverk: 116.7,
              muligeDagsverk: 3990.4,
              erMaskert: false,
              kvartaler: siste4Kvartaler,
            },
          },
          summertGradertFravær: {
            prosent: 1,
            tapteDagsverk: 39.9,
            muligeDagsverk: 3990.4,
            erMaskert: false,
            kvartaler: siste4Kvartaler,
          },
        },
      ],
    });
    expect(
        resultater.sammenligningResultatTotalt.sykefraværNæringEllerBransje! - 8.4
    ).toBeLessThan(0.01);
    expect(resultater.sammenligningResultatKorttid.sykefraværNæringEllerBransje).toEqual(2.3);
    expect(resultater.sammenligningResultatLangtid.sykefraværNæringEllerBransje).toEqual(6.1);
    expect(
        resultater.sammenligningResultatGradert.sykefraværNæringEllerBransje! - 15.51
    ).toBeLessThan(0.01);
  });

  it('getSammenligningResultat skal returnere riktige kvartaler', () => {
    const resultater: Sammenligningsresultater = getSammenligningResultat({
      status: RestStatus.Suksess,
      data: [
        {
          type: Statistikkategori.VIRKSOMHET,
          label: 'En virksomhet',
          summertKorttidsOgLangtidsfravær: {
            summertKorttidsfravær: {
              prosent: 2.3,
              tapteDagsverk: 140.6,
              muligeDagsverk: 3990.4,
              erMaskert: false,
              kvartaler: siste4Kvartaler,
            },
            summertLangtidsfravær: {
              prosent: 6.1,
              tapteDagsverk: 116.7,
              muligeDagsverk: 3990.4,
              erMaskert: false,
              kvartaler: siste4Kvartaler,
            },
          },
          summertGradertFravær: {
            prosent: 1,
            tapteDagsverk: 39.9,
            muligeDagsverk: 3990.4,
            erMaskert: false,
            kvartaler: siste4Kvartaler,
          },
        },
        {
          type: Statistikkategori.NÆRING,
          label: 'En virksomhet',
          summertKorttidsOgLangtidsfravær: {
            summertKorttidsfravær: {
              prosent: 2.3,
              tapteDagsverk: 140.6,
              muligeDagsverk: 3990.4,
              erMaskert: false,
              kvartaler: siste4Kvartaler,
            },
            summertLangtidsfravær: {
              prosent: 6.1,
              tapteDagsverk: 116.7,
              muligeDagsverk: 3990.4,
              erMaskert: false,
              kvartaler: siste4Kvartaler,
            },
          },
          summertGradertFravær: {
            prosent: 1,
            tapteDagsverk: 39.9,
            muligeDagsverk: 3990.4,
            erMaskert: false,
            kvartaler: siste4Kvartaler,
          },
        },
      ],
    });
    expect(resultater.sammenligningResultatTotalt.kvartaler).toEqual([
      {årstall: 2020, kvartal: 1},
      {årstall: 2019, kvartal: 4},
      {årstall: 2019, kvartal: 3},
      {årstall: 2019, kvartal: 2},
    ]);
    expect(resultater.sammenligningResultatKorttid.kvartaler).toEqual([
      {årstall: 2020, kvartal: 1},
      {årstall: 2019, kvartal: 4},
      {årstall: 2019, kvartal: 3},
      {årstall: 2019, kvartal: 2},
    ]);
    expect(resultater.sammenligningResultatLangtid.kvartaler).toEqual([
      {årstall: 2020, kvartal: 1},
      {årstall: 2019, kvartal: 4},
      {årstall: 2019, kvartal: 3},
      {årstall: 2019, kvartal: 2},
    ]);
    expect(resultater.sammenligningResultatGradert.kvartaler).toEqual([
      {årstall: 2020, kvartal: 1},
      {årstall: 2019, kvartal: 4},
      {årstall: 2019, kvartal: 3},
      {årstall: 2019, kvartal: 2},
    ]);
  });
});
