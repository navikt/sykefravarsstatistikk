import {
    filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet,
    KvartalsvisSykefraværshistorikk,
    SykefraværshistorikkType,
} from './kvartalsvis-sykefraværshistorikk-api';

describe('Tester for utils funksjoner', () => {
    const historikkUnderenhet: KvartalsvisSykefraværshistorikk = {
        type: SykefraværshistorikkType.VIRKSOMHET,
        label: 'Underenhet AS',
        kvartalsvisSykefraværsprosent: [
            {
                årstall: 2019,
                kvartal: 4,
                erMaskert: false,
                prosent: 5.5,
                muligeDagsverk: 200,
                tapteDagsverk: 11,
            },
            {
                årstall: 2020,
                kvartal: 1,
                erMaskert: false,
                prosent: 6,
                muligeDagsverk: 200,
                tapteDagsverk: 12,
            },
        ],
    };
    const historikkOverordnetEnhet: KvartalsvisSykefraværshistorikk = {
        type: SykefraværshistorikkType.OVERORDNET_ENHET,
        label: 'Underenhet AS',
        kvartalsvisSykefraværsprosent: [
            {
                årstall: 2019,
                kvartal: 4,
                erMaskert: false,
                prosent: 5.5,
                muligeDagsverk: 200,
                tapteDagsverk: 10,
            },
            {
                årstall: 2020,
                kvartal: 1,
                erMaskert: false,
                prosent: 6,
                muligeDagsverk: 200,
                tapteDagsverk: 12,
            },
        ],
    };

    test('filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet håndterer tom historikk for overordnet enhet', () => {
        const result: KvartalsvisSykefraværshistorikk[] = filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet(
            [historikkUnderenhet]
        );
        expect(result.length).toBe(1);
    });

    test('filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet håndterer tom historikk for underenhet', () => {
        const result: KvartalsvisSykefraværshistorikk[] = filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet(
            [historikkOverordnetEnhet]
        );
        expect(result.length).toBe(1);
        expect(
            // @ts-ignore
            result.find(
                (sykefraværshistorikk) =>
                    sykefraværshistorikk.type === SykefraværshistorikkType.OVERORDNET_ENHET
            ).kvartalsvisSykefraværsprosent.length
        ).toBe(2);
    });

    test('filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet filtrerer bort historikk for overordnet enhet', () => {
        const result: KvartalsvisSykefraværshistorikk[] = filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet(
            [historikkUnderenhet, historikkOverordnetEnhet]
        );
        expect(result.length).toBe(2);
        expect(
            // @ts-ignore
            result.find(
                (sykefraværshistorikk) =>
                    sykefraværshistorikk.type === SykefraværshistorikkType.VIRKSOMHET
            ).kvartalsvisSykefraværsprosent.length
        ).toBe(2);
        expect(
            // @ts-ignore
            result.find(
                (sykefraværshistorikk) =>
                    sykefraværshistorikk.type === SykefraværshistorikkType.OVERORDNET_ENHET
            ).kvartalsvisSykefraværsprosent.length
        ).toBe(0);
    });
});
