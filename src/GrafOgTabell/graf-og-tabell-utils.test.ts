import { konverterTilKvartalsvisSammenligning, ÅrstallOgKvartal } from './graf-og-tabell-utils';
import { Sykefraværshistorikk, SykefraværshistorikkType } from '../api/sykefraværshistorikk';

describe('Tester for graf-og-tabell-utils', () => {
    test('konverterTilKvartalsvisSammenligning skal sette riktig type historikk på riktig key i returobjekt', () => {
        const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
            lagHistorikkMedEttInnslag(SykefraværshistorikkType.VIRKSOMHET, 10),
            lagHistorikkMedEttInnslag(SykefraværshistorikkType.NÆRING, 20),
            lagHistorikkMedEttInnslag(SykefraværshistorikkType.SEKTOR, 30),
            lagHistorikkMedEttInnslag(SykefraværshistorikkType.LAND, 40),
        ]);

        expect(kvartalsvisSammenligning[0].virksomhet.prosent).toEqual(10);
        expect(kvartalsvisSammenligning[0].næringEllerBransje.prosent).toEqual(20);
        expect(kvartalsvisSammenligning[0].sektor.prosent).toEqual(30);
        expect(kvartalsvisSammenligning[0].land.prosent).toEqual(40);
    });

    test('konverterTilKvartalsvisSammenligning skal returnere data for nøyaktig de årstall og kvartal som landshistorikken har', () => {
        const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
            lagHistorikkMedÅrstallOgKvartal(SykefraværshistorikkType.VIRKSOMHET, [
                { årstall: 1999, kvartal: 4 },
                { årstall: 2000, kvartal: 1 },
            ]),
            lagHistorikkMedÅrstallOgKvartal(SykefraværshistorikkType.LAND, [
                { årstall: 2000, kvartal: 1 },
                { årstall: 2000, kvartal: 3 },
                { årstall: 2000, kvartal: 4 },
            ]),
        ]);

        const årstallOgKvartalerSomVises = kvartalsvisSammenligning.map(sammenligning => {
            return { årstall: sammenligning.årstall, kvartal: sammenligning.kvartal };
        });

        const resultatInneholder = (årstall: number, kvartal: number): boolean => {
            return !!årstallOgKvartalerSomVises.find(
                årstallOgKvartal =>
                    årstallOgKvartal.årstall === årstall && årstallOgKvartal.kvartal === kvartal
            );
        };

        expect(årstallOgKvartalerSomVises.length).toEqual(3);
        expect(resultatInneholder(2000, 1)).toBeTruthy();
        expect(resultatInneholder(2000, 3)).toBeTruthy();
        expect(resultatInneholder(2000, 4)).toBeTruthy();
    });

    test('konverterTilKvartalsvisSammenligning skal legge inn tom sykefraværsprosent hvis historikken ikke inneholder et gitt kvartal', () => {
        const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
            lagHistorikkMedÅrstallOgKvartal(SykefraværshistorikkType.VIRKSOMHET, []),
            lagHistorikkMedÅrstallOgKvartal(SykefraværshistorikkType.LAND, [
                { årstall: 2000, kvartal: 1 },
            ]),
        ]);

        const resultat = kvartalsvisSammenligning.find(
            sammenligning => sammenligning.årstall === 2000 && sammenligning.kvartal === 1
        )!.virksomhet;

        expect(resultat.erMaskert).toBeFalsy();
        expect(resultat.prosent).toEqual(undefined);
    });

    test('konverterTilKvartalsvisSammenligning skal sette feltet næringEllerBransje til næring hvis historikken ikke inneholder tall for bransje', () => {
        const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
            lagHistorikkMedEttInnslag(SykefraværshistorikkType.NÆRING, 20),
            lagHistorikkMedEttInnslag(SykefraværshistorikkType.LAND, 40),
        ]);

        expect(kvartalsvisSammenligning[0].næringEllerBransje.prosent).toEqual(20);
    });

    test('konverterTilKvartalsvisSammenligning skal sette feltet næringEllerBransje til bransje hvis historikken inneholder tall for bransje', () => {
        const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning([
            lagHistorikkMedEttInnslag(SykefraværshistorikkType.NÆRING, 20),
            lagHistorikkMedEttInnslag(SykefraværshistorikkType.BRANSJE, 30),
            lagHistorikkMedEttInnslag(SykefraværshistorikkType.LAND, 40),
        ]);

        expect(kvartalsvisSammenligning[0].næringEllerBransje.prosent).toEqual(30);
    });
});

const lagHistorikkMedEttInnslag = (
    type: SykefraværshistorikkType,
    prosent: number
): Sykefraværshistorikk => {
    return {
        type,
        label: '',
        kvartalsvisSykefraværsprosent: [
            {
                kvartal: 1,
                årstall: 2000,
                prosent: prosent,
                erMaskert: false,
            },
        ],
    };
};

const lagHistorikkMedÅrstallOgKvartal = (
    type: SykefraværshistorikkType,
    årstallOgKvartalListe: ÅrstallOgKvartal[]
): Sykefraværshistorikk => {
    return {
        type,
        label: '',
        kvartalsvisSykefraværsprosent: årstallOgKvartalListe.map(årstallOgKvartal => {
            return {
                ...årstallOgKvartal,
                prosent: 5,
                erMaskert: false,
            };
        }),
    };
};
