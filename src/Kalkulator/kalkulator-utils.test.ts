import { getAntallTapteDagsverkSiste4Kvartaler } from './kalkulator-utils';
import {
    KvartalsvisSykefraværsprosent,
    KvartalsvisSykefraværshistorikk,
    SykefraværshistorikkType,
} from '../api/kvartalsvisSykefraværshistorikk';

describe('Tester for kalkulator-utils', () => {
    test('getAntallTapteDagsverkSiste4Kvartaler skal returnere antall tapte dagsverk for virksomhet de siste 4 kvartaler', () => {
        const antall = getAntallTapteDagsverkSiste4Kvartaler([
            {
                type: SykefraværshistorikkType.VIRKSOMHET,
                label: '',
                kvartalsvisSykefraværsprosent: [
                    tapteDagsverk(2018, 3, 1),
                    tapteDagsverk(2018, 4, 2),
                    tapteDagsverk(2019, 1, 10),
                    tapteDagsverk(2019, 2, 20),
                    tapteDagsverk(2019, 3, 30),
                    tapteDagsverk(2019, 4, 40),
                ],
            },
        ]);
        expect(antall).toEqual(100);
    });

    test('getAntallTapteDagsverkSiste4Kvartaler skal avrunde resultat', () => {
        const antall = getAntallTapteDagsverkSiste4Kvartaler([
            {
                type: SykefraværshistorikkType.VIRKSOMHET,
                label: '',
                kvartalsvisSykefraværsprosent: [
                    tapteDagsverk(2019, 1, 10.1),
                    tapteDagsverk(2019, 2, 20.1),
                    tapteDagsverk(2019, 3, 30.1),
                    tapteDagsverk(2019, 4, 40.1),
                ],
            },
        ]);
        expect(antall).toEqual(100);
    });

    test('getAntallTapteDagsverkSiste4Kvartaler skal returnere erMaskertEllerHarIkkeNokData hvis ett eller flere av de siste kvartalene er maskerte', () => {
        const antall = getAntallTapteDagsverkSiste4Kvartaler([
            {
                type: SykefraværshistorikkType.VIRKSOMHET,
                label: '',
                kvartalsvisSykefraværsprosent: [
                    maskertTapteDagsverk(2019, 1),
                    tapteDagsverk(2019, 2, 20),
                    tapteDagsverk(2019, 3, 30),
                    tapteDagsverk(2019, 4, 40),
                ],
            },
        ]);
        expect(antall).toEqual('erMaskertEllerHarIkkeNokData');
    });

    test('getAntallTapteDagsverkSiste4Kvartaler skal returnere erMaskertEllerHarIkkeNokData hvis det ikke finnes data for 4 kvartaler', () => {
        const antall = getAntallTapteDagsverkSiste4Kvartaler([
            {
                type: SykefraværshistorikkType.VIRKSOMHET,
                label: '',
                kvartalsvisSykefraværsprosent: [
                    tapteDagsverk(2019, 2, 20),
                    tapteDagsverk(2019, 3, 30),
                    tapteDagsverk(2019, 4, 40),
                ],
            },
        ]);
        expect(antall).toEqual('erMaskertEllerHarIkkeNokData');
    });

    test('getAntallTapteDagsverkSiste4Kvartaler skal ikke mutere innsendt data', () => {
        const historikkVirksomhet: KvartalsvisSykefraværshistorikk = {
            type: SykefraværshistorikkType.VIRKSOMHET,
            label: '',
            kvartalsvisSykefraværsprosent: [
                tapteDagsverk(2019, 1, 10),
                tapteDagsverk(2019, 2, 20),
                tapteDagsverk(2019, 3, 30),
                tapteDagsverk(2019, 4, 40),
            ],
        };
        getAntallTapteDagsverkSiste4Kvartaler([historikkVirksomhet]);
        expect(historikkVirksomhet.kvartalsvisSykefraværsprosent[0].kvartal).toEqual(1);
    });
});

const maskertTapteDagsverk = (årstall: number, kvartal: number): KvartalsvisSykefraværsprosent => {
    return {
        erMaskert: true,
        årstall,
        kvartal,
        tapteDagsverk: null,
        prosent: null,
        muligeDagsverk: null,
    };
};

const tapteDagsverk = (
    årstall: number,
    kvartal: number,
    antallTapteDagsverk: number
): KvartalsvisSykefraværsprosent => {
    return {
        årstall,
        kvartal,
        tapteDagsverk: antallTapteDagsverk,
        erMaskert: false,
        prosent: 10,
        muligeDagsverk: 1000,
    };
};
