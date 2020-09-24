import { SummertSykefravær, Sykefraværsvarighet } from '../../api/sykefraværsvarighet';
import { SykefraværResultat } from './Speedometer/Speedometer';
import { RestStatus } from '../../api/api-utils';
import { ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';

export const sykefraværForBarnehagerSiste4Kvartaler = {
    totalt: 8.5,
    langtidsfravær: 7.4,
    korttidsfravær: 1.1,
};

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
    bransjensProsent: number
): SykefraværResultat => {
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

export const getTotaltSykefraværSiste4Kvartaler = (
    varighet: Sykefraværsvarighet | undefined
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
