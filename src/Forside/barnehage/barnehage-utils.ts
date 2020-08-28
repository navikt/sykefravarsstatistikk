import { SykefraværSiste4Kvartaler, Sykefraværsvarighet } from '../../api/sykefraværsvarighet';
import { SykefraværResultat } from './Speedometer/Speedometer';
import { RestStatus } from '../../api/api-utils';

export const sykefraværForBarnehagerSiste4Kvartaler = {
    totalt: 8.3,
    langtidsfravær: 7.2,
    korttidsfravær: 1.1,
};

export const getResultatForSammenligningAvSykefravær = (
    restStatus: RestStatus,
    sykefravær: SykefraværSiste4Kvartaler | undefined,
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
        case RestStatus.IngenTilgang:
            return SykefraværResultat.FEIL;
        default:
            return SykefraværResultat.FEIL;
    }
};

export const getTotaltSykefraværSiste4Kvartaler = (
    varighet: Sykefraværsvarighet | undefined
): SykefraværSiste4Kvartaler | undefined => {
    if (varighet === undefined) return undefined;
    const korttid = varighet.korttidsfraværSiste4Kvartaler;
    const langtid = varighet.langtidsfraværSiste4Kvartaler;
    return {
        kvartaler: korttid.kvartaler,
        tapteDagsverk: addNullable(korttid.tapteDagsverk, langtid.tapteDagsverk),
        muligeDagsverk: korttid.muligeDagsverk,
        prosent: addNullable(korttid.prosent, langtid.prosent),
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

    if (virksomhetensProsent < 0.9 * bransjensProsent) {
        return SykefraværResultat.UNDER;
    } else if (virksomhetensProsent < bransjensProsent * 1.1) {
        return SykefraværResultat.MIDDELS;
    } else if (virksomhetensProsent >= bransjensProsent * 1.1) {
        return SykefraværResultat.OVER;
    }
    throw new Error('virksomhetens eller bransjens tall er NaN');
};

const addNullable = (number1: number | null, number2: number | null) => {
    if (number1 === null || number2 === null) return null;
    return number1 + number2;
};
