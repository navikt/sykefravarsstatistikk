// TODO Dette er ikke relle tall. Må oppdateres!
import { Sykefraværsvarighet } from '../../api/sykefraværsvarighet';
import { SykefraværResultat } from './Speedometer/Speedometer';

export const sykefraværForBarnehagerSiste4Kvartaler = {
    totalt: 8.6,
    langtidsfravær: 4.6,
    korttidsfravær: 4,
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

const getResultat = (
    virksomhetensProsent: number,
    bransjensProsent: number
): SykefraværResultat => {
    if (virksomhetensProsent < 0.9 * bransjensProsent) {
        return SykefraværResultat.UNDER;
    } else if (virksomhetensProsent < bransjensProsent * 1.1) {
        return SykefraværResultat.MIDDELS;
    } else if (virksomhetensProsent >= bransjensProsent * 1.1) {
        return SykefraværResultat.OVER;
    }
    throw new Error('virksomhetens eller bransjens tall er NaN');
};
