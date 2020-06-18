import { Sykefraværsprosent } from '../api/sykefraværshistorikk';

export const tilSegmenteringAntallAnsatte = (antallAnsatte: number): string => {
    if (antallAnsatte === 0) return '0';
    if (antallAnsatte >= 1 && antallAnsatte <= 4) return '1-4';
    if (antallAnsatte >= 5 && antallAnsatte <= 19) return '5-19';
    if (antallAnsatte >= 20 && antallAnsatte <= 49) return '20-49';
    if (antallAnsatte >= 50 && antallAnsatte <= 99) return '50-99';
    return '100+';
};

export const tilSegmenteringSykefraværprosent = (sykefraværprosent: Sykefraværsprosent): string => {
    if (sykefraværprosent.erMaskert) return 'MASKERT';
    const prosent = sykefraværprosent.prosent;
    if (prosent === undefined || prosent === null) return 'IKKE_SATT';
    return tilSegmenteringProsent(prosent);
};

export const tilSegmenteringProsent = (prosent: number): string => {
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

export const tilSegmenteringSammenligning = (
    virksomhet: Sykefraværsprosent,
    næringEllerBransje: Sykefraværsprosent
): string => {
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
