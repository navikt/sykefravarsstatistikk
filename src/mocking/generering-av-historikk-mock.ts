import { ÅrstallOgKvartal } from '../utils/sykefraværshistorikk-utils';
import { KvartalsvisSykefraværsprosent } from '../api/kvartalsvis-sykefraværshistorikk-api';

const neste = (årstallOgKvartal: ÅrstallOgKvartal): ÅrstallOgKvartal => {
    const { årstall, kvartal } = årstallOgKvartal;
    if (kvartal === 4) {
        return {
            årstall: årstall + 1,
            kvartal: 1,
        };
    } else {
        return {
            årstall,
            kvartal: kvartal + 1,
        };
    }
};

const randomNumber = (min: number, max: number): number => Math.random() * (max - min) + min;

export const genererHistorikk = (
    startÅrstallOgKvartal: ÅrstallOgKvartal,
    antallKvartaler: number,
    startprosent: number,
    variasjon: number,
    randomness: number,
    vekst: number
): KvartalsvisSykefraværsprosent[] => {
    let historikk: KvartalsvisSykefraværsprosent[] = [];

    let årstallOgKvartal = { ...startÅrstallOgKvartal };
    let prosent = startprosent;

    for (let i = 0; i < antallKvartaler; i += 1) {
        historikk.push({
            ...årstallOgKvartal,
            erMaskert: false,
            prosent: prosent,
            tapteDagsverk: prosent * 10,
            muligeDagsverk: prosent * 1000,
        });
        årstallOgKvartal = neste(årstallOgKvartal);
        prosent =
            prosent +
            variasjon * Math.sin(0.5 + (Math.PI * i) / 2) +
            randomNumber(vekst - randomness, vekst + randomness);
        prosent = Math.max(0, prosent);
        prosent = parseFloat(prosent.toFixed(1));
    }

    return historikk;
};

export const genererMaskertHistorikk = (
    startÅrstallOgKvartal: ÅrstallOgKvartal,
    antallKvartaler: number
): KvartalsvisSykefraværsprosent[] => {
    let historikk: KvartalsvisSykefraværsprosent[] = [];
    let årstallOgKvartal = { ...startÅrstallOgKvartal };

    for (let i = 0; i < antallKvartaler; i += 1) {
        historikk.push({
            ...årstallOgKvartal,
            erMaskert: true,
            prosent: null,
            tapteDagsverk: null,
            muligeDagsverk: null,
        });
        årstallOgKvartal = neste(årstallOgKvartal);
    }
    return historikk;
};
