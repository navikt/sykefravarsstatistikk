import {
    RestSummertSykefraværshistorikk,
    Statistikkategori,
    SummertKorttidsOgLangtidsfravær,
    SummertSykefravær,
    SummertSykefraværshistorikk,
} from '../../api/summertSykefraværshistorikk';
import { SykefraværVurdering } from './Speedometer/Speedometer';
import { RestStatus } from '../../api/api-utils';
import { ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import { SammenligningsType } from './vurderingstekster';

export const getVurderingForSammenligningAvSykefravær = (
    restStatus: RestStatus.Suksess | RestStatus.Feil,
    sykefravær: SummertSykefravær | undefined,
    bransjensProsent: number | null | undefined,
    sammenligningsType?: SammenligningsType,
    gradertProsent?: number
): SykefraværVurdering => {
    if (bransjensProsent === null || bransjensProsent === undefined) {
        return SykefraværVurdering.INGEN_DATA;
    }

    switch (restStatus) {
        case RestStatus.Suksess:
            if (sykefravær === undefined) {
                return SykefraværVurdering.INGEN_DATA;
            }
            if (sykefravær.erMaskert) {
                return SykefraværVurdering.MASKERT;
            }

            const antallKvartaler = sykefravær.kvartaler.length;

            if (antallKvartaler === 0) {
                return SykefraværVurdering.INGEN_DATA;
            } else if (antallKvartaler < 4) {
                return SykefraværVurdering.UFULLSTENDIG_DATA;
            }

            if (
                sykefravær.prosent === null ||
                sykefravær.tapteDagsverk === undefined ||
                sykefravær.tapteDagsverk === null
            ) {
                return SykefraværVurdering.INGEN_DATA;
            }

            if (sammenligningsType !== SammenligningsType.GRADERT)
                return getVurdering(sykefravær.prosent, bransjensProsent);
            else return getVurdering(gradertProsent, bransjensProsent);

        case RestStatus.Feil:
            return SykefraværVurdering.FEIL;
    }
};

export const getSummertKorttidsOgLangtidsfravær = (
    summertSykefraværshistorikkListe: SummertSykefraværshistorikk[] | undefined,
    ...statistikkategorier: Statistikkategori[]
): SummertKorttidsOgLangtidsfravær | undefined => {
    if (summertSykefraværshistorikkListe === undefined) {
        return undefined;
    }

    return summertSykefraværshistorikkListe?.find((element) =>
        statistikkategorier.includes(element.type)
    )?.summertKorttidsOgLangtidsfravær;
};

export const getSummertGradertFravær = (
    summertSykefraværshistorikkListe: SummertSykefraværshistorikk[] | undefined,
    ...statistikkategorier: Statistikkategori[]
): SummertSykefravær | undefined => {
    if (summertSykefraværshistorikkListe === undefined) {
        return undefined;
    }

    return summertSykefraværshistorikkListe?.find((element) =>
        statistikkategorier.includes(element.type)
    )?.summertGradertFravær;
};

export const getTotaltSykefraværSiste4Kvartaler = (
    summertKorttidsOgLangtidsfravær: SummertKorttidsOgLangtidsfravær | undefined
): SummertSykefravær | undefined => {
    if (summertKorttidsOgLangtidsfravær === undefined) return undefined;
    const korttid = summertKorttidsOgLangtidsfravær.summertKorttidsfravær;
    const langtid = summertKorttidsOgLangtidsfravær.summertLangtidsfravær;
    return {
        kvartaler: korttid.kvartaler,
        tapteDagsverk: addEllerReturnerNull(korttid.tapteDagsverk, langtid.tapteDagsverk),
        muligeDagsverk: korttid.muligeDagsverk,
        prosent: addEllerReturnerNull(korttid.prosent, langtid.prosent),
        erMaskert: korttid.erMaskert,
    };
};

export const getVurdering = (
    virksomhetensProsent: number | null | undefined,
    bransjensProsent: number
): SykefraværVurdering => {
    if (virksomhetensProsent === null || virksomhetensProsent === undefined) {
        throw new Error('virksomhetens eller bransjens tall er null');
    }

    if (virksomhetensProsent < getGrønnGrense(bransjensProsent)) {
        return SykefraværVurdering.UNDER;
    } else if (virksomhetensProsent < getRødGrense(bransjensProsent)) {
        return SykefraværVurdering.MIDDELS;
    } else if (virksomhetensProsent >= getRødGrense(bransjensProsent)) {
        return SykefraværVurdering.OVER;
    }
    throw new Error('virksomhetens eller bransjens tall er NaN');
};

export const getGrønnGrense = (bransjensProsent: number) => bransjensProsent * 0.9;
export const getRødGrense = (bransjensProsent: number) => bransjensProsent * 1.1;

const byttPunktumMedKomma = (tall: number): string => `${tall}`.replace('.', ',');

export const getGrønnGrenseTekst = (bransjensProsent: number) =>
    byttPunktumMedKomma(Math.ceil(getGrønnGrense(bransjensProsent) * 10) / 10);
export const getRødGrenseTekst = (bransjensProsent: number) =>
    byttPunktumMedKomma(Math.floor(getRødGrense(bransjensProsent) * 10) / 10);

const addEllerReturnerNull = (number1: number | null, number2: number | null) => {
    if (number1 === null || number2 === null) return null;
    return number1 + number2;
};
interface SammenligningResultatReturnObjekt {
    sammenligningVurdering: SykefraværVurdering;
    sykefraværVirksomhet: number | null | undefined;
    sykefraværBransje: number | null | undefined;
    kvartaler: ÅrstallOgKvartal[] | undefined;
}
const undefinedSammenligningResultatReturnObjekt: SammenligningResultatReturnObjekt = {
    sammenligningVurdering: SykefraværVurdering.INGEN_DATA,
    sykefraværVirksomhet: undefined,
    sykefraværBransje: undefined,
    kvartaler: undefined,
};
export const getSammenligningResultat = (
    restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk
): {
    sammenligningResultatTotalt: SammenligningResultatReturnObjekt;
    sammenligningResultatKorttid: SammenligningResultatReturnObjekt;
    sammenligningResultatLangtid: SammenligningResultatReturnObjekt;
    sammenligningResultatGradert: SammenligningResultatReturnObjekt;
} => {
    if (
        restSummertSykefraværshistorikk.status !== RestStatus.Suksess &&
        restSummertSykefraværshistorikk.status !== RestStatus.Feil
    )
        return {
            sammenligningResultatTotalt: undefinedSammenligningResultatReturnObjekt,
            sammenligningResultatKorttid: undefinedSammenligningResultatReturnObjekt,
            sammenligningResultatLangtid: undefinedSammenligningResultatReturnObjekt,
            sammenligningResultatGradert: undefinedSammenligningResultatReturnObjekt,
        };
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

    const sammenligningResultatGradert = getSammenligningResultatMedProsent(
        restSummertSykefraværshistorikk.status,
        summertSykefraværshistorikk,
        SammenligningsType.GRADERT
    );
    return {
        sammenligningResultatTotalt,
        sammenligningResultatKorttid,
        sammenligningResultatLangtid,
        sammenligningResultatGradert,
    };
};
export const getSammenligningResultatMedProsent = (
    restStatus: RestStatus.Suksess | RestStatus.Feil,
    summertSykefraværshistorikk: SummertSykefraværshistorikk[] | undefined,
    sammenligningsType: SammenligningsType
): {
    sammenligningVurdering: SykefraværVurdering;
    sykefraværVirksomhet: number | null | undefined;
    sykefraværBransje: number | null | undefined;
    kvartaler: ÅrstallOgKvartal[] | undefined;
} => {
    const summertSykefraværVirksomhet =
        restStatus === RestStatus.Suksess
            ? getSummertKorttidsOgLangtidsfravær(
                  summertSykefraværshistorikk,
                  Statistikkategori.VIRKSOMHET
              )
            : undefined;
    const summertGradertSykefraværVirksomhet =
        restStatus === RestStatus.Suksess
            ? getSummertGradertFravær(summertSykefraværshistorikk, Statistikkategori.VIRKSOMHET)
            : undefined;
    const kvartaler = summertSykefraværVirksomhet?.summertKorttidsfravær.kvartaler
        .slice()
        .reverse();

    const summertSykefraværVirksomhetNæringEllerBransje =
        restStatus === RestStatus.Suksess
            ? getSummertKorttidsOgLangtidsfravær(
                  summertSykefraværshistorikk,
                  Statistikkategori.BRANSJE,
                  Statistikkategori.NÆRING
              )
            : undefined;
    const summertGradertSykefraværVirksomhetNæringEllerBransje =
        restStatus === RestStatus.Suksess
            ? getSummertGradertFravær(
                  summertSykefraværshistorikk,
                  Statistikkategori.BRANSJE,
                  Statistikkategori.NÆRING
              )
            : undefined;

    let sammenligningVurdering: SykefraværVurdering;
    let sykefraværVirksomhet;
    let sykefraværBransje;

    switch (sammenligningsType) {
        case SammenligningsType.TOTALT:
            sammenligningVurdering = getVurderingForSammenligningAvSykefravær(
                restStatus,
                getTotaltSykefraværSiste4Kvartaler(summertSykefraværVirksomhet),
                getTotaltSykefraværSiste4Kvartaler(summertSykefraværVirksomhetNæringEllerBransje)
                    ?.prosent
            );
            sykefraværVirksomhet = getTotaltSykefraværSiste4Kvartaler(summertSykefraværVirksomhet)
                ?.prosent;
            sykefraværBransje = getTotaltSykefraværSiste4Kvartaler(
                summertSykefraværVirksomhetNæringEllerBransje
            )?.prosent;
            break;
        case SammenligningsType.KORTTID:
            sammenligningVurdering = getVurderingForSammenligningAvSykefravær(
                restStatus,
                summertSykefraværVirksomhet?.summertKorttidsfravær,
                summertSykefraværVirksomhetNæringEllerBransje?.summertKorttidsfravær.prosent
            );
            sykefraværVirksomhet = summertSykefraværVirksomhet?.summertKorttidsfravær.prosent;
            sykefraværBransje =
                summertSykefraværVirksomhetNæringEllerBransje?.summertKorttidsfravær.prosent;
            break;
        case SammenligningsType.LANGTID:
            sammenligningVurdering = getVurderingForSammenligningAvSykefravær(
                restStatus,
                summertSykefraværVirksomhet?.summertLangtidsfravær,
                summertSykefraværVirksomhetNæringEllerBransje?.summertLangtidsfravær.prosent
            );
            sykefraværVirksomhet = summertSykefraværVirksomhet?.summertLangtidsfravær.prosent;
            sykefraværBransje =
                summertSykefraværVirksomhetNæringEllerBransje?.summertLangtidsfravær.prosent;
            break;

        case SammenligningsType.GRADERT:
            sykefraværVirksomhet = getGradertProsent(
                summertGradertSykefraværVirksomhet?.tapteDagsverk,
                getTotaltSykefraværSiste4Kvartaler(summertSykefraværVirksomhet)?.tapteDagsverk
            );
            sykefraværBransje = getGradertProsent(
                summertGradertSykefraværVirksomhetNæringEllerBransje?.tapteDagsverk,
                getTotaltSykefraværSiste4Kvartaler(summertSykefraværVirksomhetNæringEllerBransje)
                    ?.tapteDagsverk
            );
            sammenligningVurdering = getVurderingForSammenligningAvSykefravær(
                restStatus,
                summertGradertSykefraværVirksomhet,
                sykefraværBransje,
                sammenligningsType,
                sykefraværVirksomhet
            );
            break;
    }

    return {
        sammenligningVurdering: sammenligningVurdering,
        sykefraværVirksomhet: sykefraværVirksomhet,
        sykefraværBransje: sykefraværBransje,
        kvartaler: kvartaler,
    };
};
const getGradertProsent = (
    gradertTapteDagsverk: number | null | undefined,
    totaltTapteDagsverk: number | null | undefined
): number | undefined => {
    if (!totaltTapteDagsverk || !gradertTapteDagsverk) return undefined;
    else return (gradertTapteDagsverk * 100) / totaltTapteDagsverk;
};
export const summertHistorikkHarBransje = (historikk: SummertSykefraværshistorikk[]): boolean => {
    return !!historikk.find((data) => data.type === Statistikkategori.BRANSJE);
};
