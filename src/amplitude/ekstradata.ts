import {
    AntallAnsatteSegmentering,
    SegmenteringSammenligning,
    SegmenteringSykefraværsprosent,
    tilSegmenteringAntallAnsatte,
    tilSegmenteringSammenligning,
    tilSegmenteringSykefraværsprosent,
} from './segmentering';
import { SykefraværVurdering } from '../Forside/Speedometer/Speedometer';
import { RestStatus } from '../api/api-utils';
import { RestSykefraværshistorikk } from '../api/kvartalsvis-sykefraværshistorikk-api';
import { konverterTilKvartalsvisSammenligning } from '../utils/sykefraværshistorikk-utils';
import { mapTilPrivatEllerOffentligSektor, Sektor } from '../utils/sektorUtils';
import { Enhetsregisterdata } from '../enhetsregisteret/hooks/useEnheter';
import { Næring } from '../enhetsregisteret/domene/underenhet';
import { ArbeidsmiljøportalenBransje } from '../utils/bransje-utils';
import { RestAggregertStatistikk } from '../hooks/useAggregertStatistikk';
import { sammenliknSykefravær } from '../Forside/vurdering-utils';
import { Statistikkategori } from '../api/summert-sykefraværshistorikk-api';

export interface Ekstradata {
    næring: Næring;
    bransje: ArbeidsmiljøportalenBransje;
    antallAnsatte: AntallAnsatteSegmentering;
    prosent: SegmenteringSykefraværsprosent;
    sammenligning: SegmenteringSammenligning;
    sykefraværSiste4Kvartaler: SykefraværVurdering
    sektor: Sektor;
}

export const getEkstraDataFraSykefraværshistorikk = (
    restSykefraværshistorikk: RestSykefraværshistorikk
): Partial<Ekstradata> => {
    if (restSykefraværshistorikk.status === RestStatus.Suksess) {
        const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
            restSykefraværshistorikk.data
        );

        const sammenligningForSisteKvartal = kvartalsvisSammenligning.pop();

        if (sammenligningForSisteKvartal) {
            const { virksomhet, næringEllerBransje } = sammenligningForSisteKvartal;

            if (virksomhet) {
                return {
                    prosent: tilSegmenteringSykefraværsprosent(virksomhet),
                    sammenligning: tilSegmenteringSammenligning(virksomhet, næringEllerBransje),
                };
            }
        }
    }
    return {};
};

export const getEkstraDataFraEnhetsregisteret = (
    virksomhet: Enhetsregisterdata
): Partial<Ekstradata> => {
    if (
        virksomhet.restOverordnetEnhet.status !== RestStatus.Suksess ||
        virksomhet.restUnderenhet.status !== RestStatus.Suksess
    ) {
        return {};
    }

    const enhetsdata = virksomhet.restOverordnetEnhet.data;
    const underenhetdata = virksomhet.restUnderenhet.data;

    return {
        næring: underenhetdata.næring,
        bransje: underenhetdata.bransje,
        sektor: mapTilPrivatEllerOffentligSektor(enhetsdata.institusjonellSektorkode),
        antallAnsatte: tilSegmenteringAntallAnsatte(underenhetdata.antallAnsatte),
    };
};

export const getEkstraDataFraAggregertSykefraværshistorikk = (
    aggregertResponse: RestAggregertStatistikk
): Partial<Ekstradata> => {
    if (aggregertResponse.restStatus !== RestStatus.Suksess) {
        return {};
    }
    try {
        const virksomhetsdataTotalt = aggregertResponse.aggregertData?.get(
            Statistikkategori.VIRKSOMHET
        )?.prosentSiste4KvartalerTotalt;
        const bransjedataTotalt = aggregertResponse.aggregertData?.get(
            Statistikkategori.BRANSJE
        )?.prosentSiste4KvartalerTotalt;
        const næringsdataTotalt = aggregertResponse.aggregertData?.get(
            Statistikkategori.NÆRING
        )?.prosentSiste4KvartalerTotalt;
        const bransjeEllerNæringsdataTotalt =
            bransjedataTotalt !== undefined ? bransjedataTotalt : næringsdataTotalt;

        const resultater = {
            sykefraværSiste4Kvartaler: sammenliknSykefravær(
                virksomhetsdataTotalt,
                bransjeEllerNæringsdataTotalt
            ),
        };

        let ekstradata: Partial<Ekstradata> = { ...resultater };
        return { ...ekstradata };
    } catch (error) {
        return {};
    }
};
