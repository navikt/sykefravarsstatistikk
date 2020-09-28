import {
    AntallAnsatteSegmentering,
    SegmenteringSammenligning,
    SegmenteringSykefraværsprosent,
    tilSegmenteringAntallAnsatte, tilSegmenteringSammenligning, tilSegmenteringSykefraværsprosent,
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
    getTotaltSykefraværSiste4Kvartaler, sykefraværForBarnehagerSiste4Kvartaler,
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

    sektor: Sektor;
}

export const hentEkstraDataFraVirksomhetMetadata = (
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

export const hentEkstraDataFraSykefraværshistorikk = (
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

export const hentEkstraDataFraEnhetsregisteret = (
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

export const hentEkstraDataFraSykefraværsvarighet = (
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
        return {
            sykefraværSiste4Kvartaler: getResultatForSammenligningAvSykefravær(
                restSykefraværsvarighet.status,
                getTotaltSykefraværSiste4Kvartaler(varighet),
                sykefraværForBarnehagerSiste4Kvartaler.totalt
            ),
            korttidSiste4Kvartaler: getResultatForSammenligningAvSykefravær(
                restSykefraværsvarighet.status,
                varighet?.summertKorttidsfravær,
                sykefraværForBarnehagerSiste4Kvartaler.korttidsfravær
            ),
            langtidSiste4Kvartaler: getResultatForSammenligningAvSykefravær(
                restSykefraværsvarighet.status,
                varighet?.summertLangtidsfravær,
                sykefraværForBarnehagerSiste4Kvartaler.langtidsfravær
            ),
        };
    } catch (error) {
        return {};
    }
};
