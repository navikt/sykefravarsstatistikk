import { Sykefraværsvarighet } from '../../api/sykefraværsvarighet';
import { SykefraværResultat } from './Speedometer/Speedometer';

export const sykefraværForBarnehagerSiste4Kvartaler = {
    totalt: 8.3,
    langtidsfravær: 7.2,
    korttidsfravær: 1.1,
};

export const getResultatForKorttidsfravær = (varighet: Sykefraværsvarighet): SykefraværResultat => {
    return getResultat(
        varighet.korttidsfraværSiste4Kvartaler.prosent,
        sykefraværForBarnehagerSiste4Kvartaler.korttidsfravær
    );
};
export const getResultatForLangtidsfravær = (varighet: Sykefraværsvarighet): SykefraværResultat => {
    return getResultat(
        varighet.langtidsfraværSiste4Kvartaler.prosent,
        sykefraværForBarnehagerSiste4Kvartaler.langtidsfravær
    );
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

