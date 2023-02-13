import {
    AntallAnsatteSegmentering,
    SegmenteringSykefraværsprosent,
    tilSegmenteringAntallAnsatte,
    tilSegmenteringSykefraværsprosent,
} from './segmentering';
import { RestStatus } from '../api/api-utils';
import { mapTilPrivatEllerOffentligSektor, Sektor } from '../utils/sektorUtils';
import { Enhetsregisterdata } from '../enhetsregisteret/hooks/useEnheter';
import { ArbeidsmiljøportalenBransje } from '../utils/bransje-utils';
import { RestAggregertStatistikk } from '../hooks/useAggregertStatistikk';
import { sammenliknSykefravær, SykefraværVurdering } from '../Forside/vurdering-utils';
import { Næring } from '../enhetsregisteret/domene/underenhet';
import { Statistikkategori } from '../domene/statistikkategori';

export interface AmplitudeEkstradata {
    næring2siffer: string;
    bransje: ArbeidsmiljøportalenBransje;
    antallAnsatte: AntallAnsatteSegmentering;
    prosent: SegmenteringSykefraværsprosent;
    sykefraværsvurdering: SykefraværVurdering;
    sektor: Sektor;
}

function formaterNæring(næring?: Næring): string | 'INGEN_INFO' {
    return næring ? `${næring?.kode} ${næring?.beskrivelse}` : 'INGEN_INFO';
}

export const getEkstraDataFraEnhetsregisteret = (
    virksomhet: Enhetsregisterdata
): Partial<AmplitudeEkstradata> => {
    if (
        virksomhet.restOverordnetEnhet.status !== RestStatus.Suksess ||
        virksomhet.restUnderenhet.status !== RestStatus.Suksess
    ) {
        return {};
    }

    const enhetsdata = virksomhet.restOverordnetEnhet.data;
    const underenhetdata = virksomhet.restUnderenhet.data;

    return {
        næring2siffer: formaterNæring(underenhetdata.næring),
        bransje: underenhetdata.bransje,
        sektor: mapTilPrivatEllerOffentligSektor(enhetsdata.institusjonellSektorkode),
        antallAnsatte: tilSegmenteringAntallAnsatte(underenhetdata.antallAnsatte),
    };
};

export const getEkstraDataFraAggregertSykefravær = (
    aggregertResponse: RestAggregertStatistikk
): Partial<AmplitudeEkstradata> => {
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

        const speedometervurdering = sammenliknSykefravær(
            virksomhetsdataTotalt,
            bransjeEllerNæringsdataTotalt
        );
        const prostsentsegmentering = tilSegmenteringSykefraværsprosent(
            Number(virksomhetsdataTotalt?.verdi),
            speedometervurdering === 'MASKERT'
        );

        return {
            sykefraværsvurdering: speedometervurdering,
            prosent: prostsentsegmentering,
        };
    } catch (error) {
        return {};
    }
};
