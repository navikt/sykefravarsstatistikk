import {
    getSammenligningResultat,
    getVurdering,
    Sammenligningsresultater,
} from './barnehage-utils';
import { SykefraværVurdering } from './Speedometer/Speedometer';
import {
    RestSummertSykefraværshistorikk,
    Statistikkategori,
    SummertSykefraværshistorikk,
} from '../../api/summertSykefraværshistorikk';
import { RestStatus } from '../../api/api-utils';
import {
    summertSykefraværshistorikkMockGrønn,
    summertSykefraværshistorikkMockGul, summertSykefraværshistorikkMockRød,
} from '../../mocking/summert-sykefraværshistorikk-mock';

it('getVurdering skal gi riktig vurdering', () => {
    expect(getVurdering(5.5, 5)).toEqual(SykefraværVurdering.OVER);
    expect(getVurdering(5.4, 5)).toEqual(SykefraværVurdering.MIDDELS);
    expect(getVurdering(4.5, 5)).toEqual(SykefraværVurdering.MIDDELS);
    expect(getVurdering(4.49, 5)).toEqual(SykefraværVurdering.UNDER);
});

it('getVurderingForSammenligningMedProsent skal gi riktig resultat', () => {
    expect(getVurdering(5.5, 5)).toEqual(SykefraværVurdering.OVER);
    expect(getVurdering(5.4, 5)).toEqual(SykefraværVurdering.MIDDELS);
    expect(getVurdering(4.5, 5)).toEqual(SykefraværVurdering.MIDDELS);
    expect(getVurdering(4.49, 5)).toEqual(SykefraværVurdering.UNDER);
});

/*
    sammenligningVurdering: SykefraværVurdering;
sykefraværVirksomhet: number | null | undefined;
sykefraværBransje: number | null | undefined;
kvartaler: ÅrstallOgKvartal[] | undefined;
 */

describe('Tester for getSammenligningResultat', () => {
    it('getSammenligningResultat - skal gi vurdering FEIL hvis reststatus er FEIL', () => {
        const restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk = {
            status: RestStatus.Feil,
        };
        const resultater: Sammenligningsresultater = getSammenligningResultat(
            restSummertSykefraværshistorikk
        );

        expect(resultater.sammenligningResultatTotalt.sammenligningVurdering).toEqual(
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
            SykefraværVurdering.UNDER
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
            SykefraværVurdering.OVER
        );
    });
});
