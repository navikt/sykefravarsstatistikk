import { RestRessurs } from './api-utils';
import { sendEventDirekte } from '../utils/amplitude';
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

export const mapTilAntallAnsatteBucket = (antallAnsatte: number): string => {
    if (antallAnsatte === 0) {
        return '0';
    } else if (antallAnsatte >= 1 && antallAnsatte <= 4) {
        return '1-4';
    } else if (antallAnsatte >= 5 && antallAnsatte <= 19) {
        return '5-19';
    } else if (antallAnsatte >= 20 && antallAnsatte <= 49) {
        return '20-49';
    } else if (antallAnsatte >= 50 && antallAnsatte <= 99) {
        return '50-99';
    } else {
        return '100+';
    }
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
    sendEventDirekte('segmentering-storrelse', størrelse);

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
            sendEventDirekte(
                'segmentering-fravarsprosent',
                tilSegmenteringSykefraværprosent(sykefraværprosent)
            );
        }
    }
};

export const tilSegmenteringSykefraværprosent = (sykefraværprosent: Sykefraværsprosent): string => {
    if (sykefraværprosent.erMaskert) return 'MASKERT';
    const prosent = sykefraværprosent.prosent;
    if (prosent === undefined || prosent === null) return 'IKKE_SATT';
    if (prosent === 0) return '0';
    if (prosent > 0 && prosent < 2) return '<2';
    if (prosent >= 2 && prosent < 4) return '2-4';
    if (prosent >= 4 && prosent < 6) return '4-6';
    if (prosent >= 6 && prosent < 8) return '6-8';
    if (prosent >= 8 && prosent < 10) return '8-10';
    if (prosent >= 10 && prosent < 12) return '10-12';
    if (prosent >= 12 && prosent < 14) return '12-14';
    if (prosent >= 14 && prosent < 16) return '14-16';
    if (prosent >= 16) return '>16';
    return 'IKKE_SATT';
};
