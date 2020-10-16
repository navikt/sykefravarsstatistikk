import {
    AntallAnsatteSegmentering,
    SegmenteringSammenligning,
    SegmenteringSykefraværsprosent,
    tilSegmenteringAntallAnsatte,
    tilSegmenteringSammenligning,
    tilSegmenteringSykefraværsprosent,
} from './segmentering';
import { SykefraværResultat } from '../Forside/barnehage/Speedometer/Speedometer';
import { Bransjetype, RestVirksomhetMetadata } from '../api/virksomhetMetadata';
import { RestStatus } from '../api/api-utils';
import { mapTilNæringsbeskrivelse } from './næringsbeskrivelser';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { konverterTilKvartalsvisSammenligning } from '../utils/sykefraværshistorikk-utils';
import { RestOverordnetEnhet } from '../api/enhetsregisteret-api';
import { mapTilPrivatElleOffentligSektor, Sektor } from '../utils/sektorUtils';
import { RestSykefraværsvarighet } from '../api/sykefraværsvarighet';
import {
    getResultatForSammenligningAvSykefravær,
    getTotaltSykefraværSiste4Kvartaler,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../Forside/barnehage/barnehage-utils';

export interface Ekstradata {
    næring2siffer: string;
    bransje: string;
    antallAnsatte: AntallAnsatteSegmentering;

    prosent: SegmenteringSykefraværsprosent;
    sammenligning: SegmenteringSammenligning;

    sykefraværSiste4Kvartaler: SykefraværResultat;
    korttidSiste4Kvartaler: SykefraværResultat;
    langtidSiste4Kvartaler: SykefraværResultat;
    antallFarger: number; // TODO Midlertidig måling. Må fjernes.

    sektor: Sektor;
}

export const getEkstraDataFraVirksomhetMetadata = (
    restVirksomhetMetadata: RestVirksomhetMetadata
): Partial<Ekstradata> => {
    if (restVirksomhetMetadata.status === RestStatus.Suksess) {
        const metrikker = restVirksomhetMetadata.data;
        const næringskode2siffer = metrikker.næringskode5Siffer.kode.substring(0, 2);
        const næring2siffer =
            næringskode2siffer + ' ' + mapTilNæringsbeskrivelse(næringskode2siffer);

        return {
            næring2siffer,
            bransje: metrikker.bransje,
            antallAnsatte: tilSegmenteringAntallAnsatte(metrikker.antallAnsatte),
        };
    }
    return {};
};

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
    restOverordnetEnhet: RestOverordnetEnhet,
    restVirksomhetMetadata: RestVirksomhetMetadata
): Partial<Ekstradata> => {
    if (
        restVirksomhetMetadata.status === RestStatus.Suksess &&
        restVirksomhetMetadata.data.bransje === Bransjetype.BARNEHAGER &&
        restOverordnetEnhet.status === RestStatus.Suksess
    ) {
        return {
            sektor: mapTilPrivatElleOffentligSektor(
                restOverordnetEnhet.data.institusjonellSektorkode
            ),
        };
    }
    return {};
};

const getAntallForskjelligeFarger = (...resultater: SykefraværResultat[]): number | undefined => {
    const resultaterMedRiktigeFarger = resultater.filter((resultat) =>
        [SykefraværResultat.OVER, SykefraværResultat.MIDDELS, SykefraværResultat.UNDER].includes(
            resultat
        )
    );

    console.log(new Set(resultaterMedRiktigeFarger).size, resultater);

    return resultaterMedRiktigeFarger.length > 0
        ? new Set(resultaterMedRiktigeFarger).size
        : undefined;
};

export const getEkstraDataFraSykefraværsvarighet = (
    restSykefraværsvarighet: RestSykefraværsvarighet,
    restVirksomhetMetadata: RestVirksomhetMetadata
): Partial<Ekstradata> => {
    if (
        restVirksomhetMetadata.status !== RestStatus.Suksess ||
        restVirksomhetMetadata.data.bransje !== Bransjetype.BARNEHAGER
    ) {
        return {};
    }

    if (
        restSykefraværsvarighet.status !== RestStatus.Suksess &&
        restSykefraværsvarighet.status !== RestStatus.Feil
    ) {
        return {};
    }

    const varighet =
        restSykefraværsvarighet.status === RestStatus.Suksess
            ? restSykefraværsvarighet.data
            : undefined;

    try {
        const sykefraværSiste4Kvartaler = getResultatForSammenligningAvSykefravær(
            restSykefraværsvarighet.status,
            getTotaltSykefraværSiste4Kvartaler(varighet),
            sykefraværForBarnehagerSiste4Kvartaler.totalt
        );
        const korttidSiste4Kvartaler = getResultatForSammenligningAvSykefravær(
            restSykefraværsvarighet.status,
            varighet?.summertKorttidsfravær,
            sykefraværForBarnehagerSiste4Kvartaler.korttidsfravær
        );
        const langtidSiste4Kvartaler = getResultatForSammenligningAvSykefravær(
            restSykefraværsvarighet.status,
            varighet?.summertLangtidsfravær,
            sykefraværForBarnehagerSiste4Kvartaler.langtidsfravær
        );

        let ekstradata: Partial<Ekstradata> = {
            sykefraværSiste4Kvartaler,
            korttidSiste4Kvartaler,
            langtidSiste4Kvartaler,
        };

        const antallFarger = getAntallForskjelligeFarger(
            sykefraværSiste4Kvartaler,
            korttidSiste4Kvartaler,
            langtidSiste4Kvartaler
        );

        if (antallFarger !== undefined) {
            ekstradata = { ...ekstradata, antallFarger };
        }

        return ekstradata;
    } catch (error) {
        return {};
    }
};
