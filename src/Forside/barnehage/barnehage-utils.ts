import {
    Statistikkategori,
    SummertSykefravær,
    SummertSykefraværshistorikk,
    SummertKorttidsOgLangtidsfravær,
} from '../../api/summertSykefraværshistorikk';
import { SykefraværVurdering } from './Speedometer/Speedometer';
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

export const getVurderingForSammenligningAvSykefravær = (
    restStatus: RestStatus.Suksess | RestStatus.Feil,
    sykefravær: SummertSykefravær | undefined,
    bransjensProsent: number | null | undefined
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

            if (sykefravær.prosent === null) {
                return SykefraværVurdering.INGEN_DATA;
            }
            return getVurdering(sykefravær.prosent, bransjensProsent);

        case RestStatus.Feil:
            return SykefraværVurdering.FEIL;
    }
};

export const getAlleVurderingerForSammenligningAvSykefravær = (
    restStatus: RestStatus.Suksess | RestStatus.Feil,
    summertSykefraværshistorikk: SummertSykefraværshistorikk[] | undefined
): {
    totaltFravær: SykefraværVurdering;
    korttidsfravær: SykefraværVurdering;
    langtidsfravær: SykefraværVurdering;
} => {
    const summertKorttidsOgLangtidsfraværVirksomhet = getSummertKorttidsOgLangtidsfravær(
        summertSykefraværshistorikk,
        Statistikkategori.VIRKSOMHET
    );
    const summertKorttidsOgLangtidsfraværBransjeEllerNæring = getSummertKorttidsOgLangtidsfravær(
        summertSykefraværshistorikk,
        Statistikkategori.BRANSJE,
        Statistikkategori.NÆRING
    );

    const resultatTotaltFravær = getVurderingForSammenligningAvSykefravær(
        restStatus,
        getTotaltSykefraværSiste4Kvartaler(summertKorttidsOgLangtidsfraværVirksomhet),
        getTotaltSykefraværSiste4Kvartaler(summertKorttidsOgLangtidsfraværBransjeEllerNæring)
            ?.prosent
    );
    const resultatKorttidsfravær = getVurderingForSammenligningAvSykefravær(
        restStatus,
        summertKorttidsOgLangtidsfraværVirksomhet?.summertKorttidsfravær,
        summertKorttidsOgLangtidsfraværBransjeEllerNæring?.summertKorttidsfravær.prosent
    );
    const resultatLangtidsfravær = getVurderingForSammenligningAvSykefravær(
        restStatus,
        summertKorttidsOgLangtidsfraværVirksomhet?.summertLangtidsfravær,
        summertKorttidsOgLangtidsfraværBransjeEllerNæring?.summertLangtidsfravær.prosent
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
    virksomhetensProsent: number | null,
    bransjensProsent: number
): SykefraværVurdering => {
    if (virksomhetensProsent === null) {
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

export const getSammenligningResultatMedProsent = (
    restStatus: RestStatus.Suksess | RestStatus.Feil,
    summertSykefraværshistorikk: SummertSykefraværshistorikk[] | undefined,
    sammenligningsType: SammenligningsType
): {
    sammenligningstype: SammenligningsType;
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
    }

    return {
        sammenligningstype: sammenligningsType,
        sammenligningVurdering: sammenligningVurdering,
        sykefraværVirksomhet: sykefraværVirksomhet,
        sykefraværBransje: sykefraværBransje,
        kvartaler: kvartaler,
    };
};
