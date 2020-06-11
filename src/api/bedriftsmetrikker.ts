import { RestRessurs } from './api-utils';
import { useContext } from 'react';
import { sendEvent } from '../utils/amplitude';
import {
    Sykefraværshistorikk,
    SykefraværshistorikkType,
    Sykefraværsprosent,
} from './sykefraværshistorikk';
import {
    beregnHvilkeÅrstallOgKvartalerSomSkalVises,
    finnProsent,
    ÅrstallOgKvartal,
} from '../utils/sykefraværshistorikk-utils';
import { bedriftsmetrikkerContext } from '../utils/bedriftsmetrikkerContext';

enum SegmenteringSykefraværprosent {
    IKKE_SATT = 'IKKE_SATT',
    NULL = '0',
    LAVERE_ENN_TO_OG_IKKE_NULL = '<2',
    TO_TIL_FIRE = '2-4',
    FIRE_TIL_SEKS = '4-6',
    SEKS_TIL_ÅTTE = '6-8',
    ÅTTE_TIL_TI = '8-10',
    TI_TIL_TOLV = '10-12',
    TOLV_TIL_FJORTEN = '12-14',
    FJORTEN_TIL_SEKSTEN = '14-16',
    OVER_SEKSTEN = '>16',
}

export type Næringskode5Siffer = {
    kode: string;
    beskrivelse: string;
};

export interface Bedriftsmetrikker {
    næringskode5Siffer: Næringskode5Siffer;
    bransje: string;
    antallAnsatte: number;
}

export type RestBedriftsmetrikker = RestRessurs<Bedriftsmetrikker>;

export const useRestBedriftsmetrikker = (orgnr: string | undefined): RestBedriftsmetrikker => {
    const restBedriftsmetrikker = useContext(bedriftsmetrikkerContext);
    return restBedriftsmetrikker;
};

export const trackBedriftsmetrikker = (
    bedriftsmetrikker: Bedriftsmetrikker,
    historikkListe: Sykefraværshistorikk[]
) => {
    let størrelse: string;
    const antallAnsatte = bedriftsmetrikker.antallAnsatte;
    if (antallAnsatte === 0) {
        størrelse = 'ingen';
    } else if (antallAnsatte >= 1 && antallAnsatte <= 4) {
        størrelse = 'sma-1-4';
    } else if (antallAnsatte >= 5 && antallAnsatte <= 19) {
        størrelse = 'sma-5-19';
    } else if (antallAnsatte >= 20 && antallAnsatte <= 49) {
        størrelse = 'medium-20-49';
    } else if (antallAnsatte >= 50 && antallAnsatte <= 99) {
        størrelse = 'medium-50-99';
    } else {
        størrelse = '-store-100+';
    }
    sendEvent('segmentering-storrelse', størrelse);

    const årstallOgKvartalListe: ÅrstallOgKvartal[] = beregnHvilkeÅrstallOgKvartalerSomSkalVises(
        historikkListe
    );
    const sisteÅrstallOgKvartal = årstallOgKvartalListe.pop();

    if (sisteÅrstallOgKvartal) {
        const sykefraværprosent: Sykefraværsprosent = finnProsent(
            historikkListe,
            sisteÅrstallOgKvartal,
            SykefraværshistorikkType.VIRKSOMHET
        );

        if (sykefraværprosent && !sykefraværprosent.erMaskert && sykefraværprosent.prosent) {
            sendEvent(
                'segmentering-fravarsprosent',
                tilSegmenteringSykefraværprosent(sykefraværprosent.prosent).toString()
            );
        }
    }
};

const tilSegmenteringSykefraværprosent = (prosent: number): SegmenteringSykefraværprosent => {
    let segmenteringSykefraværprosent: SegmenteringSykefraværprosent;

    if (prosent === 0) {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.NULL;
    } else if (prosent > 0 && prosent < 2) {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.LAVERE_ENN_TO_OG_IKKE_NULL;
    } else if (prosent >= 2 && prosent < 4) {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.TO_TIL_FIRE;
    } else if (prosent >= 4 && prosent < 6) {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.FIRE_TIL_SEKS;
    } else if (prosent >= 6 && prosent < 8) {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.SEKS_TIL_ÅTTE;
    } else if (prosent >= 8 && prosent < 10) {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.ÅTTE_TIL_TI;
    } else if (prosent >= 10 && prosent < 12) {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.TI_TIL_TOLV;
    } else if (prosent >= 12 && prosent < 14) {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.TOLV_TIL_FJORTEN;
    } else if (prosent >= 14 && prosent < 16) {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.FJORTEN_TIL_SEKSTEN;
    } else if (prosent >= 16) {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.OVER_SEKSTEN;
    } else {
        segmenteringSykefraværprosent = SegmenteringSykefraværprosent.IKKE_SATT;
    }
    return segmenteringSykefraværprosent;
};
