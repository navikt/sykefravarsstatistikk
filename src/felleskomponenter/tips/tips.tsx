import { ReactElement } from 'react';
import {
    fåNedKorttidsfravær,
    seKursForebyggeSykefravær,
    seKursFølgeOppSykefravær,
    seKursFølgeOppSykefraværBarnehager,
    seKursFølgeOppSykefraværSykehjem,
    tipsOgRådArbeidsmiljøSykefravær,
} from './tips-innhold';
import { SykefraværVurdering } from '../../Forside/barnehage/Speedometer/Speedometer';
import { SammenligningsType } from '../../Forside/barnehage/vurderingstekster';
import { Bransjetype } from '../../api/virksomhetMetadata';

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
    }
};

const getTipsKorttidsfravær = (resultat: SykefraværVurdering): Tips[] => {
    switch (resultat) {
        case SykefraværVurdering.UNDER:
        case SykefraværVurdering.FEIL:
            return [];
        default:
            return [fåNedKorttidsfravær];
    }
};

const getTipsLangtidsfravær = (
    resultat: SykefraværVurdering,
    bransje: Bransjetype | undefined
): Tips[] => {
    if (bransje !== Bransjetype.BARNEHAGER) {
        return [];
    }
    switch (resultat) {
        case SykefraværVurdering.UNDER:
        case SykefraværVurdering.FEIL:
            return [];
        case SykefraværVurdering.OVER:
            return [seKursFølgeOppSykefravær];
        default:
            return [seKursForebyggeSykefravær];
    }
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
            default:
                return [seKursForebyggeSykefravær, tipsOgRådArbeidsmiljøSykefravær];
        }
    }
};
