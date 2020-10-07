import { ReactElement } from 'react';
import {
    aldriKjedelig,
    barnehagerKoblerErgonomiOgPedagogikk,
    deTokGrep,
    fåNedKorttidsfravær,
    seKursForebyggeSykefravær,
    seKursFølgeOppSykefravær,
    stabiltToProsent,
} from './tips-innhold';
import { SykefraværResultat } from '../../Forside/barnehage/Speedometer/Speedometer';
import { SammenligningsType } from '../../Forside/barnehage/vurderingstekster';

export interface Tips {
    tittel: string;
    ingress: string;
    tidsbruk?: ReactElement | string;
    href: string;
    img: { src: string; alt: string };
}

export const getTips = (type: SammenligningsType, resultat: SykefraværResultat): Tips | null => {
    switch (type) {
        case SammenligningsType.KORTTID:
            return getTipsKorttidsfravær(resultat);
        case SammenligningsType.LANGTID:
            return getTipsLangtidsfravær(resultat);
        case SammenligningsType.TOTALT:
            return getTipsTotaltFravær(resultat);
    }
};

export const getTipsKorttidsfravær = (resultat: SykefraværResultat): Tips | null => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
        case SykefraværResultat.FEIL:
            return null;
        default:
            return fåNedKorttidsfravær;
    }
};

export const getTipsLangtidsfravær = (resultat: SykefraværResultat): Tips | null => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
        case SykefraværResultat.FEIL:
            return null;
        case SykefraværResultat.OVER:
            return seKursFølgeOppSykefravær;
        default:
            return seKursForebyggeSykefravær;
    }
};

export const getTipsTotaltFravær = (resultat: SykefraværResultat): Tips | null => {
    switch (resultat) {
        case SykefraværResultat.INGEN_DATA:
        case SykefraværResultat.MASKERT:
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return barnehagerKoblerErgonomiOgPedagogikk;
        case SykefraværResultat.OVER:
            return deTokGrep;
        case SykefraværResultat.MIDDELS:
            return stabiltToProsent;
        case SykefraværResultat.UNDER:
            return aldriKjedelig;
        default:
            return null;
    }
};
