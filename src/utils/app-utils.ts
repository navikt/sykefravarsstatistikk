export const sisteOppdatering = '02.09.2020';

export const formaterProsent = (prosent: number | null | undefined): string => {
    if (prosent === undefined || prosent === null) {
        return '';
    }
    return Number(prosent).toFixed(1).toString().replace('.', ',');
};
