import {
    Statistikkategori,
    SummertSykefravær,
    SummertSykefraværshistorikk,
    SummertKorttidsOgLangtidsfravær,
} from '../../api/sykefraværsvarighet';
import { SykefraværResultat } from './Speedometer/Speedometer';
import { RestStatus } from '../../api/api-utils';
import { ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import { SammenligningsType } from './vurderingstekster';

// TODO Hardkodede tall
export const siste4PubliserteKvartaler: ÅrstallOgKvartal[] = [
    {
        årstall: 2020,
        kvartal: 2,
    },
    {
        årstall: 2020,
        kvartal: 1,
    },
    {
        årstall: 2019,
        kvartal: 4,
    },
    {
        årstall: 2019,
        kvartal: 3,
    },
];

export const getResultatForSammenligningAvSykefravær = (
    restStatus: RestStatus.Suksess | RestStatus.Feil,
    sykefravær: SummertSykefravær | undefined,
    bransjensProsent: number | null | undefined
): SykefraværResultat => {
    if (bransjensProsent === null || bransjensProsent === undefined) {
        return SykefraværResultat.INGEN_DATA;
    }

    switch (restStatus) {
        case RestStatus.Suksess:
            if (sykefravær === undefined) {
                return SykefraværResultat.INGEN_DATA;
            }
            if (sykefravær.erMaskert) {
                return SykefraværResultat.MASKERT;
            }

            const antallKvartaler = sykefravær.kvartaler.length;

            if (antallKvartaler === 0) {
                return SykefraværResultat.INGEN_DATA;
            } else if (antallKvartaler < 4) {
                return SykefraværResultat.UFULLSTENDIG_DATA;
            }

            if (sykefravær.prosent === null) {
                return SykefraværResultat.INGEN_DATA;
            }
            return getResultat(sykefravær.prosent, bransjensProsent);

        case RestStatus.Feil:
            return SykefraværResultat.FEIL;
    }
};

export const getAlleResultaterForSammenligningAvSykefravær = (
    restStatus: RestStatus.Suksess | RestStatus.Feil,
    summertSykefraværshistorikk: SummertSykefraværshistorikk[] | undefined
): {
    totaltFravær: SykefraværResultat;
    korttidsfravær: SykefraværResultat;
    langtidsfravær: SykefraværResultat;
} => {
    const varighetVirksomhet = getSummertKorttidsOgLangtidsfravær(
        summertSykefraværshistorikk,
        Statistikkategori.VIRKSOMHET
    );
    const varighetBransjeEllerNæring = getSummertKorttidsOgLangtidsfravær(
        summertSykefraværshistorikk,
        Statistikkategori.BRANSJE,
        Statistikkategori.NÆRING
    );

    const resultatTotaltFravær = getResultatForSammenligningAvSykefravær(
        restStatus,
        getTotaltSykefraværSiste4Kvartaler(varighetVirksomhet),
        getTotaltSykefraværSiste4Kvartaler(varighetBransjeEllerNæring)?.prosent
    );
    const resultatKorttidsfravær = getResultatForSammenligningAvSykefravær(
        restStatus,
        varighetVirksomhet?.summertKorttidsfravær,
        varighetBransjeEllerNæring?.summertKorttidsfravær.prosent
    );
    const resultatLangtidsfravær = getResultatForSammenligningAvSykefravær(
        restStatus,
        varighetVirksomhet?.summertLangtidsfravær,
        varighetBransjeEllerNæring?.summertLangtidsfravær.prosent
    );
    return {
        totaltFravær: resultatTotaltFravær,
        korttidsfravær: resultatKorttidsfravær,
        langtidsfravær: resultatLangtidsfravær,
    };
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

export const getTotaltSykefraværSiste4Kvartaler = (
    varighet: SummertKorttidsOgLangtidsfravær | undefined
): SummertSykefravær | undefined => {
    if (varighet === undefined) return undefined;
    const korttid = varighet.summertKorttidsfravær;
    const langtid = varighet.summertLangtidsfravær;
    return {
        kvartaler: korttid.kvartaler,
        tapteDagsverk: addEllerReturnerNull(korttid.tapteDagsverk, langtid.tapteDagsverk),
        muligeDagsverk: korttid.muligeDagsverk,
        prosent: addEllerReturnerNull(korttid.prosent, langtid.prosent),
        erMaskert: korttid.erMaskert,
    };
};

export const getResultat = (
    virksomhetensProsent: number | null,
    bransjensProsent: number
): SykefraværResultat => {
    if (virksomhetensProsent === null) {
        throw new Error('virksomhetens eller bransjens tall er null');
    }

    if (virksomhetensProsent < getGrønnGrense(bransjensProsent)) {
        return SykefraværResultat.UNDER;
    } else if (virksomhetensProsent < getRødGrense(bransjensProsent)) {
        return SykefraværResultat.MIDDELS;
    } else if (virksomhetensProsent >= getRødGrense(bransjensProsent)) {
        return SykefraværResultat.OVER;
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

export const getSammenligningResultatMedProsent = (
    restStatus: RestStatus.Suksess | RestStatus.Feil,
    summertSykefraværshistorikk: SummertSykefraværshistorikk[] | undefined,
    sammenligningsType: SammenligningsType
): {
    sammenligningstype: SammenligningsType;
    sammenligningResultat: SykefraværResultat;
    sykefraværVirksomhet: number | null | undefined;
    sykefraværBransje: number | null | undefined;
    kvartaler: ÅrstallOgKvartal[] | undefined;
} => {
    const summertSykefraværVirksomhet =
        restStatus === RestStatus.Suksess
            ? getSummertKorttidsOgLangtidsfravær(summertSykefraværshistorikk, Statistikkategori.VIRKSOMHET)
            : undefined;
    const kvartaler = summertSykefraværVirksomhet?.summertKorttidsfravær.kvartaler.slice().reverse();

    const summertSykefraværVirksomhetNæringEllerBransje =
        restStatus === RestStatus.Suksess
            ? getSummertKorttidsOgLangtidsfravær(
                  summertSykefraværshistorikk,
                  Statistikkategori.BRANSJE,
                  Statistikkategori.NÆRING
              )
            : undefined;

    let sammenligningResultat: SykefraværResultat;
    let sykefraværVirksomhet;
    let sykefraværBransje;

    switch (sammenligningsType) {
        case SammenligningsType.TOTALT:
            sammenligningResultat = getResultatForSammenligningAvSykefravær(
                restStatus,
                getTotaltSykefraværSiste4Kvartaler(summertSykefraværVirksomhet),
                getTotaltSykefraværSiste4Kvartaler(summertSykefraværVirksomhetNæringEllerBransje)?.prosent
            );
            sykefraværVirksomhet = getTotaltSykefraværSiste4Kvartaler(summertSykefraværVirksomhet)?.prosent;
            sykefraværBransje = getTotaltSykefraværSiste4Kvartaler(summertSykefraværVirksomhetNæringEllerBransje)
                ?.prosent;
            break;
        case SammenligningsType.KORTTID:
            sammenligningResultat = getResultatForSammenligningAvSykefravær(
                restStatus,
                summertSykefraværVirksomhet?.summertKorttidsfravær,
                summertSykefraværVirksomhetNæringEllerBransje?.summertKorttidsfravær.prosent
            );
            sykefraværVirksomhet = summertSykefraværVirksomhet?.summertKorttidsfravær.prosent;
            sykefraværBransje = summertSykefraværVirksomhetNæringEllerBransje?.summertKorttidsfravær.prosent;
            break;
        case SammenligningsType.LANGTID:
            sammenligningResultat = getResultatForSammenligningAvSykefravær(
                restStatus,
                summertSykefraværVirksomhet?.summertLangtidsfravær,
                summertSykefraværVirksomhetNæringEllerBransje?.summertLangtidsfravær.prosent
            );
            sykefraværVirksomhet = summertSykefraværVirksomhet?.summertLangtidsfravær.prosent;
            sykefraværBransje = summertSykefraværVirksomhetNæringEllerBransje?.summertLangtidsfravær.prosent;
    }

    return {
        sammenligningstype: sammenligningsType,
        sammenligningResultat: sammenligningResultat,
        sykefraværVirksomhet: sykefraværVirksomhet,
        sykefraværBransje: sykefraværBransje,
        kvartaler: kvartaler,
    };
};
