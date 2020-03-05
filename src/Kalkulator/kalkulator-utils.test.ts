import { getAntallTapteDagsverkSiste4Kvartaler } from './kalkulator-utils';
import { Sykefraværshistorikk, SykefraværshistorikkType } from '../api/sykefraværshistorikk';

describe('Tester for kalkulator-utils', () => {
    test('getAntallTapteDagsverkSiste4Kvartaler skal returnere antall tapte dagsverk for virksomhet de siste 4 kvartaler', () => {
        const antall = getAntallTapteDagsverkSiste4Kvartaler([
            {
                type: SykefraværshistorikkType.VIRKSOMHET,
                label: '',
                kvartalsvisSykefraværsprosent: [
                    { årstall: 2018, kvartal: 3, prosent: 1, erMaskert: false },
                    { årstall: 2018, kvartal: 4, prosent: 2, erMaskert: false },
                    { årstall: 2019, kvartal: 1, prosent: 10, erMaskert: false },
                    { årstall: 2019, kvartal: 2, prosent: 20, erMaskert: false },
                    { årstall: 2019, kvartal: 3, prosent: 30, erMaskert: false },
                    { årstall: 2019, kvartal: 4, prosent: 40, erMaskert: false },
                ],
            },
        ]);
        expect(antall).toEqual(100);
    });

    test('getAntallTapteDagsverkSiste4Kvartaler skal runde', () => {
        const antall = getAntallTapteDagsverkSiste4Kvartaler([
            {
                type: SykefraværshistorikkType.VIRKSOMHET,
                label: '',
                kvartalsvisSykefraværsprosent: [
                    { årstall: 2019, kvartal: 1, prosent: 10.1, erMaskert: false },
                    { årstall: 2019, kvartal: 2, prosent: 20.1, erMaskert: false },
                    { årstall: 2019, kvartal: 3, prosent: 30.1, erMaskert: false },
                    { årstall: 2019, kvartal: 4, prosent: 40.1, erMaskert: false },
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
                    { årstall: 2019, kvartal: 1, prosent: null, erMaskert: true },
                    { årstall: 2019, kvartal: 2, prosent: 20, erMaskert: false },
                    { årstall: 2019, kvartal: 3, prosent: 30, erMaskert: false },
                    { årstall: 2019, kvartal: 4, prosent: 40, erMaskert: false },
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
                    { årstall: 2019, kvartal: 2, prosent: 20, erMaskert: false },
                    { årstall: 2019, kvartal: 3, prosent: 30, erMaskert: false },
                    { årstall: 2019, kvartal: 4, prosent: 40, erMaskert: false },
                ],
            },
        ]);
        expect(antall).toEqual('erMaskertEllerHarIkkeNokData');
    });

    test('getAntallTapteDagsverkSiste4Kvartaler skal ikke mutere innsendt data', () => {
        const historikkVirksomhet: Sykefraværshistorikk = {
            type: SykefraværshistorikkType.VIRKSOMHET,
            label: '',
            kvartalsvisSykefraværsprosent: [
                { årstall: 2019, kvartal: 1, prosent: 10, erMaskert: false },
                { årstall: 2019, kvartal: 2, prosent: 20, erMaskert: false },
                { årstall: 2019, kvartal: 3, prosent: 30, erMaskert: false },
                { årstall: 2019, kvartal: 4, prosent: 40, erMaskert: false },
            ],
        };
        const antall = getAntallTapteDagsverkSiste4Kvartaler([historikkVirksomhet]);
        expect(historikkVirksomhet.kvartalsvisSykefraværsprosent[0].kvartal).toEqual(1);
    });
});
