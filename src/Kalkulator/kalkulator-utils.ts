import { Sykefraværshistorikk, SykefraværshistorikkType } from '../api/sykefraværshistorikk';

const summerTall = (tall: number[]) => tall.reduce((a, b) => a + b);
export enum AntallTapteDagsverkEllerProsent {
    ANTALLTAPTEDAGSVERK = 'antallTapteDagsverk',
    SYKEFRAVÆRSPROSENT = 'sykefraværsprosent',
}
export const getAntallTapteDagsverkSiste4Kvartaler = (
    historikkListe: Sykefraværshistorikk[]
): number | 'erMaskertEllerHarIkkeNokData' => {
    const alleProsenter = [
        ...historikkListe.find(historikk => historikk.type === SykefraværshistorikkType.VIRKSOMHET)!
            .kvartalsvisSykefraværsprosent,
    ];
    alleProsenter.reverse();

    const prosenterForSiste4Kvartaler = alleProsenter
        .filter((sammenligning, index) => index < 4)
        .filter(prosent => !prosent.erMaskert);

    if (prosenterForSiste4Kvartaler.length !== 4) {
        return 'erMaskertEllerHarIkkeNokData';
    }
    const tapteDagsverkForSiste4Kvartaler = prosenterForSiste4Kvartaler.map(
        prosent => prosent.tapteDagsverk!
    );
    return Math.round(summerTall(tapteDagsverkForSiste4Kvartaler));
};
export const getSykefraværsprosentSiste4Kvartaler = (
    historikkListe: Sykefraværshistorikk[]
): number | 'erMaskertEllerHarIkkeNokData' => {
    const alleProsenter = [
        ...historikkListe.find(historikk => historikk.type === SykefraværshistorikkType.VIRKSOMHET)!
            .kvartalsvisSykefraværsprosent,
    ];
    alleProsenter.reverse();
    if (
        alleProsenter[0].erMaskert ||
        alleProsenter[1].erMaskert ||
        alleProsenter[2].erMaskert ||
        alleProsenter[3].erMaskert
    ) {
        return 'erMaskertEllerHarIkkeNokData';
    } else {
        return (((alleProsenter[0].prosent as number) +
            (alleProsenter[1].prosent as number) +
            (alleProsenter[2].prosent as number) +
            (alleProsenter[3].prosent as number)) /
            4) as number;
    }
};
export const getAntallMuligeDagsverSiste4Kvartaler = (
    historikkListe: Sykefraværshistorikk[]
): number | 'erMaskertEllerHarIkkeNokData' => {
    const alleProsenter = [
        ...historikkListe.find(historikk => historikk.type === SykefraværshistorikkType.VIRKSOMHET)!
            .kvartalsvisSykefraværsprosent,
    ];
    alleProsenter.reverse();
    if (
        alleProsenter[0].erMaskert ||
        alleProsenter[1].erMaskert ||
        alleProsenter[2].erMaskert ||
        alleProsenter[3].erMaskert
    ) {
        return 'erMaskertEllerHarIkkeNokData';
    } else {
        return (((alleProsenter[0].muligeDagsverk as number) +
            (alleProsenter[1].muligeDagsverk as number) +
            (alleProsenter[0].muligeDagsverk as number) +
            (alleProsenter[1].muligeDagsverk as number)) /
            4) as number;
    }
};
