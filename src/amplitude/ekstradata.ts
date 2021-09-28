import {
    AntallAnsatteSegmentering,
    SegmenteringSammenligning,
    SegmenteringSykefraværsprosent,
    tilSegmenteringAntallAnsatte,
    tilSegmenteringSammenligning,
    tilSegmenteringSykefraværsprosent,
} from './segmentering';
import { SykefraværVurdering } from '../Forside/Speedometer/Speedometer';
import { Bransjetype, RestVirksomhetsdata } from '../api/virksomhetsdata';
import { RestStatus } from '../api/api-utils';
import { mapTilNæringsbeskrivelse } from './næringsbeskrivelser';
import { RestSykefraværshistorikk } from '../api/kvartalsvisSykefraværshistorikk';
import { konverterTilKvartalsvisSammenligning } from '../utils/sykefraværshistorikk-utils';
import { RestOverordnetEnhet } from '../api/enhetsregisteret-api';
import { mapTilPrivatElleOffentligSektor, Sektor } from '../utils/sektorUtils';
import { RestSummertSykefraværshistorikk } from '../api/summertSykefraværshistorikk';
import { getSammenligningResultatMedProsent } from '../Forside/vurdering-utils';
import { SammenligningsType } from '../Forside/vurderingstekster';

export interface Ekstradata {
    næring2siffer: string;
    bransje: string;
    antallAnsatte: AntallAnsatteSegmentering;

    prosent: SegmenteringSykefraværsprosent;
    sammenligning: SegmenteringSammenligning;

    sykefraværSiste4Kvartaler: SykefraværVurdering;
    korttidSiste4Kvartaler: SykefraværVurdering;
    langtidSiste4Kvartaler: SykefraværVurdering;
    antallFarger: number; // TODO Midlertidig måling. Må fjernes.

    sektor: Sektor;
}

export const getEkstraDataFraVirksomhetsdata = (
    restVirksomhetsdata: RestVirksomhetsdata,
): Partial<Ekstradata> => {
    if (restVirksomhetsdata.status === RestStatus.Suksess) {
        const metrikker = restVirksomhetsdata.data;
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
    restvirksomhetsdata: RestVirksomhetsdata,
): Partial<Ekstradata> => {
    if (
        restvirksomhetsdata.status === RestStatus.Suksess &&
        restvirksomhetsdata.data.bransje === Bransjetype.BARNEHAGER &&
        restOverordnetEnhet.status === RestStatus.Suksess
    ) {
        return {
            sektor: mapTilPrivatElleOffentligSektor(
                restOverordnetEnhet.data.institusjonellSektorkode,
            ),
        };
    }
    return {};
};

const getAntallForskjelligeFarger = (...resultater: SykefraværVurdering[]): number | undefined => {
    const resultaterMedRiktigeFarger = resultater.filter((resultat) =>
        [SykefraværVurdering.OVER, SykefraværVurdering.MIDDELS, SykefraværVurdering.UNDER].includes(
            resultat
        )
    );

    return resultaterMedRiktigeFarger.length > 0
        ? new Set(resultaterMedRiktigeFarger).size
        : undefined;
};

export const getEkstraDataFraSummertSykefraværshistorikk = (
    restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk,
    restvirksomhetsdata: RestVirksomhetsdata,
): Partial<Ekstradata> => {
    if (
        restvirksomhetsdata.status !== RestStatus.Suksess
    ) {
        return {};
    }

    if (
        restSummertSykefraværshistorikk.status !== RestStatus.Suksess &&
        restSummertSykefraværshistorikk.status !== RestStatus.Feil
    ) {
        return {};
    }

    try {
        const summertSykefraværshistorikk =
            restSummertSykefraværshistorikk.status === RestStatus.Suksess
                ? restSummertSykefraværshistorikk.data
                : undefined;

        const sammenligningResultatTotalt = getSammenligningResultatMedProsent(
            restSummertSykefraværshistorikk.status,
            summertSykefraværshistorikk,
            SammenligningsType.TOTALT
        );

        const sammenligningResultatKorttid = getSammenligningResultatMedProsent(
            restSummertSykefraværshistorikk.status,
            summertSykefraværshistorikk,
            SammenligningsType.KORTTID
        );
        const sammenligningResultatLangtid = getSammenligningResultatMedProsent(
            restSummertSykefraværshistorikk.status,
            summertSykefraværshistorikk,
            SammenligningsType.LANGTID
        );

        const resultater = {
            sykefraværSiste4Kvartaler: sammenligningResultatTotalt.sammenligningVurdering,
            korttidSiste4Kvartaler: sammenligningResultatKorttid.sammenligningVurdering,
            langtidSiste4Kvartaler: sammenligningResultatLangtid.sammenligningVurdering,
        };

        const antallFarger = getAntallForskjelligeFarger(...Object.values(resultater));

        let ekstradata: Partial<Ekstradata> = { ...resultater };
        if (antallFarger !== undefined) {
            ekstradata = { ...ekstradata, antallFarger };
        }

        return ekstradata;
    } catch (error) {
        return {};
    }
};
