import { Sykefraværsprosent } from '../api/kvartalsvis-sykefraværshistorikk-api';

export type AntallAnsatteSegmentering = '0' | '1-4' | '5-19' | '20-49' | '50-99' | '100+';
export const tilSegmenteringAntallAnsatte = (antallAnsatte: number): AntallAnsatteSegmentering => {
    if (antallAnsatte === 0) return '0';
    if (antallAnsatte >= 1 && antallAnsatte <= 4) return '1-4';
    if (antallAnsatte >= 5 && antallAnsatte <= 19) return '5-19';
    if (antallAnsatte >= 20 && antallAnsatte <= 49) return '20-49';
    if (antallAnsatte >= 50 && antallAnsatte <= 99) return '50-99';
    return '100+';
};

export type AntallVirksomheterSegmentering =
    | '0'
    | '1'
    | '2'
    | '3-9'
    | '10-49'
    | '50-99'
    | '100+'
    | undefined;
export const tilSegmenteringAntallVirksomheter = (
    antallVirksomheter: number
): AntallVirksomheterSegmentering => {
    if (antallVirksomheter === 0) return '0';
    if (antallVirksomheter === 1) return '1';
    if (antallVirksomheter === 2) return '2';
    if (antallVirksomheter >= 3 && antallVirksomheter <= 9) return '3-9';
    if (antallVirksomheter >= 10 && antallVirksomheter <= 49) return '10-49';
    if (antallVirksomheter >= 50 && antallVirksomheter <= 99) return '50-99';
    if (antallVirksomheter >= 100) return '100+';
    return undefined;
};

export type SegmenteringProsent =
    | '0'
    | '<2'
    | '2-4'
    | '4-6'
    | '6-8'
    | '8-10'
    | '10-12'
    | '12-14'
    | '14-16'
    | '>16'
    | 'IKKE_SATT';
export const tilSegmenteringProsent = (prosent: number): SegmenteringProsent => {
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

export type SegmenteringSykefraværsprosent = SegmenteringProsent | 'MASKERT';
export const tilSegmenteringSykefraværsprosent = (
    sykefraværprosent: Sykefraværsprosent
): SegmenteringSykefraværsprosent => {
    if (sykefraværprosent.erMaskert) return 'MASKERT';
    const prosent = sykefraværprosent.prosent;
    if (prosent === undefined || prosent === null) return 'IKKE_SATT';
    return tilSegmenteringProsent(prosent);
};

export const tilTiendedeler = (teller: number, nevner: number): string | undefined => {
    const tiendedeler = Math.round((teller * 10) / nevner);
    if (tiendedeler >= 0 && tiendedeler <= 10 && !isNaN(tiendedeler)) {
        return `${tiendedeler} av 10`;
    }
    return undefined;
};

export type SegmenteringSammenligning = string;
export const tilSegmenteringSammenligning = (
    virksomhet: Sykefraværsprosent,
    næringEllerBransje: Sykefraværsprosent
): SegmenteringSammenligning => {
    if (
        virksomhet.prosent === undefined ||
        virksomhet.prosent === null ||
        næringEllerBransje.prosent === undefined ||
        næringEllerBransje.prosent === null
    ) {
        return 'IKKE_SATT';
    }
    const sammenligning = virksomhet.prosent - næringEllerBransje.prosent;
    const segmenteringProsent = tilSegmenteringProsent(Math.abs(sammenligning));
    if (sammenligning > 0) return 'virksomhet ligger ' + segmenteringProsent + ' over';
    if (sammenligning < 0) return 'virksomhet ligger ' + segmenteringProsent + ' under';
    if (sammenligning === 0) return 'virksomhet ligger likt';
    return 'IKKE_SATT';
};
