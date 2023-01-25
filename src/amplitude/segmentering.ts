export type AntallAnsatteSegmentering = '0' | '1-4' | '5-19' | '20-49' | '50-99' | '100+';
export const tilSegmenteringAntallAnsatte = (antallAnsatte: number): AntallAnsatteSegmentering => {
    if (antallAnsatte === 0) return '0';
    if (antallAnsatte >= 1 && antallAnsatte <= 4) return '1-4';
    if (antallAnsatte >= 5 && antallAnsatte <= 19) return '5-19';
    if (antallAnsatte >= 20 && antallAnsatte <= 49) return '20-49';
    if (antallAnsatte >= 50 && antallAnsatte <= 99) return '50-99';
    return '100+';
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
    prosentverdi?: number,
    erMaskert?: boolean
): SegmenteringSykefraværsprosent => {
    if (prosentverdi === undefined || prosentverdi === null) {
        return erMaskert ? 'MASKERT' : 'IKKE_SATT';
    }
    return tilSegmenteringProsent(prosentverdi);
};
