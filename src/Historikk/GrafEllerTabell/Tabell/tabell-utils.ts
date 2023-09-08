import { Sykefraværsprosent } from '../../../api/kvartalsvis-sykefraværshistorikk-api';

export const formaterProsent = (prosent: Sykefraværsprosent): string => {
    if (prosent.erMaskert) {
        return '***';
    } else if (prosent.prosent === undefined) {
        return '';
    } else {
        return (prosent.prosent + ' %').replace('.', ',');
    }
};
