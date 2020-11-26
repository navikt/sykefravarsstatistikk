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
import { SykefraværVurdering } from '../../Forside/barnehage/Speedometer/Speedometer';
import { SammenligningsType } from '../../Forside/barnehage/vurderingstekster';

export interface Tips {
    id: string;
    tittel: string;
    ingress: string;
    tidsbruk?: ReactElement | string;
    href: string;
    img: { src: string; alt: string };
}

export const getTips = (type: SammenligningsType, resultat: SykefraværVurdering): Tips | null => {
    switch (type) {
        case SammenligningsType.KORTTID:
            return getTipsKorttidsfravær(resultat);
        case SammenligningsType.LANGTID:
            return getTipsLangtidsfravær(resultat);
        case SammenligningsType.TOTALT:
            return getTipsTotaltFravær(resultat);
    }
};

export const getTipsKorttidsfravær = (resultat: SykefraværVurdering): Tips | null => {
    switch (resultat) {
        case SykefraværVurdering.UNDER:
        case SykefraværVurdering.FEIL:
            return null;
        default:
            return fåNedKorttidsfravær;
    }
};

export const getTipsLangtidsfravær = (resultat: SykefraværVurdering): Tips | null => {
    switch (resultat) {
        case SykefraværVurdering.UNDER:
        case SykefraværVurdering.FEIL:
            return null;
        case SykefraværVurdering.OVER:
            return seKursFølgeOppSykefravær;
        default:
            return seKursForebyggeSykefravær;
    }
};

export const getTipsTotaltFravær = (resultat: SykefraværVurdering): Tips | null => {
    switch (resultat) {
        case SykefraværVurdering.INGEN_DATA:
        case SykefraværVurdering.MASKERT:
        case SykefraværVurdering.UFULLSTENDIG_DATA:
            return barnehagerKoblerErgonomiOgPedagogikk;
        case SykefraværVurdering.OVER:
            return deTokGrep;
        case SykefraværVurdering.MIDDELS:
            return stabiltToProsent;
        case SykefraværVurdering.UNDER:
            return aldriKjedelig;
        default:
            return null;
    }
};
