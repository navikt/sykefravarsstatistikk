import {
    KvartalsvisSykefraværsprosent,
    Sykefraværshistorikk,
    SykefraværshistorikkType,
} from '../api/sykefraværshistorikk';

const summerTall = (tall: number[]) => tall.reduce((a, b) => a + b);
export enum AntallTapteDagsverkEllerProsent {
    ANTALLTAPTEDAGSVERK = 'antallTapteDagsverk',
    SYKEFRAVÆRSPROSENT = 'sykefraværsprosent',
}
export enum Maskering {
    ERMASKERTELLERHARIKKENOEDATA = 'erMaskertEllerHarIkkeNokData',
}
export const getSiste4KvartalsvisSykefraværshistorikk = (
    historikkListe: Sykefraværshistorikk[]
): KvartalsvisSykefraværsprosent[] => {
    const alleProsenter = [
        ...historikkListe.find(historikk => historikk.type === SykefraværshistorikkType.VIRKSOMHET)!
            .kvartalsvisSykefraværsprosent,
    ];
    alleProsenter.reverse();

    return alleProsenter
        .filter((sammenligning, index) => index < 4)
        .filter(prosent => !prosent.erMaskert);
};

export const getAntallTapteDagsverkSiste4Kvartaler = (
    historikkListe: Sykefraværshistorikk[]
): number | 'erMaskertEllerHarIkkeNokData' => {
    const prosenterForSiste4Kvartaler = getSiste4KvartalsvisSykefraværshistorikk(historikkListe);
    console.log(historikkListe);
    if (prosenterForSiste4Kvartaler.length !== 4) {
        return 'erMaskertEllerHarIkkeNokData';
    }
    const tapteDagsverkForSiste4Kvartaler = prosenterForSiste4Kvartaler.map(
        prosent => prosent.tapteDagsverk!
    );
    return Math.round(summerTall(tapteDagsverkForSiste4Kvartaler));
};

export const getAntallMuligeDagsverkSiste4Kvartaler = (
    historikkListe: Sykefraværshistorikk[]
): number | Maskering.ERMASKERTELLERHARIKKENOEDATA => {
    const prosenterForSiste4Kvartaler = getSiste4KvartalsvisSykefraværshistorikk(historikkListe);
    //console.log(historikkListe);
    if (prosenterForSiste4Kvartaler.length !== 4) {
        return Maskering.ERMASKERTELLERHARIKKENOEDATA;
    }
    const tapteDagsverkForSiste4Kvartaler = prosenterForSiste4Kvartaler.map(
        prosent => prosent.muligeDagsverk!
    );
    return Math.round(summerTall(tapteDagsverkForSiste4Kvartaler));
};

export const getSykefraværsprosentSiste4Kvartaler = (
    historikkListe: Sykefraværshistorikk[]
): number | Maskering.ERMASKERTELLERHARIKKENOEDATA => {
    const antallTapteDagsverSiste4Kvartaler = getAntallTapteDagsverkSiste4Kvartaler(historikkListe);
    const antallMuligeDagsverkSiste4Kvartaler = getAntallMuligeDagsverkSiste4Kvartaler(
        historikkListe
    );
    if (
        antallTapteDagsverSiste4Kvartaler === Maskering.ERMASKERTELLERHARIKKENOEDATA ||
        antallMuligeDagsverkSiste4Kvartaler === Maskering.ERMASKERTELLERHARIKKENOEDATA
    ) {
        return Maskering.ERMASKERTELLERHARIKKENOEDATA;
    } else {
        console.log('antalltaptedagsverk: ' + antallTapteDagsverSiste4Kvartaler);
        console.log('antalmuligedagsverk:' + antallMuligeDagsverkSiste4Kvartaler);
        return (
            ((antallTapteDagsverSiste4Kvartaler as number) * 100) /
            (antallMuligeDagsverkSiste4Kvartaler as number)
        );
    }
};
