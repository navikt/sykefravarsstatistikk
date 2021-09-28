import { ReactElement } from 'react';
import {
    fåNedKorttidsfravær,
    seKursForebyggeSykefravær,
    seKursFølgeOppSykefravær,
    seKursFølgeOppSykefraværBarnehager,
    seKursFølgeOppSykefraværSykehjem,
    tipsOgRådArbeidsmiljøSykefravær,
} from './tips-innhold';
import { SykefraværVurdering } from '../../Forside/Speedometer/Speedometer';
import { SammenligningsType } from '../../Forside/vurderingstekster';
import { Bransjetype } from '../../api/virksomhetsdata';

export interface Tips {
    id: string;
    tittel: string;
    ingress: ReactElement | string;
    tidsbruk?: ReactElement | string;
    href: string;
    img: { src: string; alt: string };
}

export const getTips = (
    type: SammenligningsType,
    resultat: SykefraværVurdering,
    bransje: Bransjetype | undefined
): Tips[] => {
    switch (type) {
        case SammenligningsType.KORTTID:
            return getTipsKorttidsfravær(resultat);
        case SammenligningsType.LANGTID:
            return getTipsLangtidsfravær(resultat, bransje);
        case SammenligningsType.TOTALT:
            return getTipsTotaltFravær(resultat, bransje);
        case SammenligningsType.GRADERT:
            return [];
    }
};

const getTipsKorttidsfravær = (resultat: SykefraværVurdering): Tips[] => {
    switch (resultat) {
        case SykefraværVurdering.UNDER:
            return [];
        default:
            return [fåNedKorttidsfravær];
    }
};

const getTipsLangtidsfravær = (
    resultat: SykefraværVurdering,
    bransje: Bransjetype | undefined
): Tips[] => {
    return [];
};

const getTipsTotaltFravær = (
    resultat: SykefraværVurdering,
    bransje: Bransjetype | undefined
): Tips[] => {
    if (bransje === Bransjetype.BARNEHAGER) {
        return [seKursFølgeOppSykefraværBarnehager, tipsOgRådArbeidsmiljøSykefravær];
    } else if (bransje === Bransjetype.SYKEHJEM) {
        return [seKursFølgeOppSykefraværSykehjem, tipsOgRådArbeidsmiljøSykefravær];
    } else {
        switch (resultat) {
            case SykefraværVurdering.OVER:
                return [seKursFølgeOppSykefravær, tipsOgRådArbeidsmiljøSykefravær];
            case SykefraværVurdering.INGEN_DATA:
            case SykefraværVurdering.MASKERT:
            case SykefraværVurdering.UFULLSTENDIG_DATA:
            case SykefraværVurdering.MIDDELS:
            case SykefraværVurdering.UNDER:
            case SykefraværVurdering.FEIL:
            default:
                return [seKursForebyggeSykefravær, tipsOgRådArbeidsmiljøSykefravær];
        }
    }
};
