import {
    AntallAnsatteSegmentering,
    SegmenteringSykefraværsprosent,
    tilSegmenteringAntallAnsatte,
    tilSegmenteringSykefraværsprosent,
} from './segmentering';
import { SykefraværVurdering } from '../Forside/Speedometer/Speedometer';
import { RestStatus } from '../api/api-utils';
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
    speedometerfarge: SykefraværVurdering;
    sektor: Sektor;
}

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

        const speedometerfarge = sammenliknSykefravær(
            virksomhetsdataTotalt,
            bransjeEllerNæringsdataTotalt
        );

        const resultater = {
            prosent: tilSegmenteringSykefraværsprosent(
                Number(virksomhetsdataTotalt?.verdi),
                speedometerfarge === SykefraværVurdering.MASKERT
            ),
            speedometerfarge: speedometerfarge,
        };

        let ekstradata: Partial<Ekstradata> = { ...resultater };
        return { ...ekstradata };
    } catch (error) {
        return {};
    }
};
