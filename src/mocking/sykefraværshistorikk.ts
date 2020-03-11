import {
    KvartalsvisSykefraværsprosent,
    Sykefraværshistorikk,
    SykefraværshistorikkType,
} from '../api/sykefraværshistorikk';
import { ÅrstallOgKvartal } from '../utils/sykefraværshistorikk-utils';

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

const lagHistorikkMedLandSektor = (): Sykefraværshistorikk[] => {
    return [
        {
            type: SykefraværshistorikkType.LAND,
            label: 'Norge',
            kvartalsvisSykefraværsprosent: genererHistorikk(
                { årstall: 2014, kvartal: 2 },
                20,
                5.5,
                1,
                0.1,
                0
            ),
        },
        {
            type: SykefraværshistorikkType.SEKTOR,
            label: 'Statlig forvaltning',
            kvartalsvisSykefraværsprosent: genererHistorikk(
                { årstall: 2014, kvartal: 2 },
                20,
                4,
                2,
                0.2,
                0
            ),
        },
    ];
};

const lagHistorikkUtenBransjeOgNæring = (): Sykefraværshistorikk[] => [
    ...lagHistorikkMedLandSektor(),
    {
        type: SykefraværshistorikkType.VIRKSOMHET,
        label: 'FLESK OG FISK AS',
        kvartalsvisSykefraværsprosent: genererHistorikk(
            { årstall: 2016, kvartal: 2 },
            20,
            8.3,
            5,
            3,
            0.1
        ),
    },
    {
        type: SykefraværshistorikkType.OVERORDNET_ENHET,
        label: 'THE FISHING GROUP',
        kvartalsvisSykefraværsprosent: genererHistorikk(
            { årstall: 2015, kvartal: 2 },
            20,
            7.1,
            3,
            0.5,
            0.1
        ),
    },
];

const lagHistorikkNæring = () => [
    ...lagHistorikkUtenBransjeOgNæring(),
    {
        type: SykefraværshistorikkType.NÆRING,
        label: 'Produksjon av nærings- og nytelsesmidler',
        kvartalsvisSykefraværsprosent: genererHistorikk(
            { årstall: 2014, kvartal: 2 },
            20,
            6.7,
            2,
            0.4,
            0
        ),
    },
];

const lagHistorikkBransje = () => [
    ...lagHistorikkUtenBransjeOgNæring(),
    {
        type: SykefraværshistorikkType.BRANSJE,
        label: 'Barnehager',
        kvartalsvisSykefraværsprosent: genererHistorikk(
            { årstall: 2014, kvartal: 2 },
            20,
            6.7,
            2,
            0.4,
            0
        ),
    },
];

const lagHistorikkMedLikHistorikkForUnderenhetOgOverordnetEnhet = () => {
    const kvartalsvisSykefraværsprosentForBådeVirksomhetOgOverordnetEnhet = genererHistorikk(
        { årstall: 2016, kvartal: 2 },
        20,
        8.3,
        5,
        3,
        0.1
    );
    return [
        ...lagHistorikkMedLandSektor(),
        {
            type: SykefraværshistorikkType.NÆRING,
            label: 'Produksjon av nærings- og nytelsesmidler',
            kvartalsvisSykefraværsprosent: genererHistorikk(
                { årstall: 2014, kvartal: 2 },
                20,
                6.7,
                2,
                0.4,
                0
            ),
        },
        {
            type: SykefraværshistorikkType.VIRKSOMHET,
            label: 'FLESK OG FISK AS',
            kvartalsvisSykefraværsprosent: kvartalsvisSykefraværsprosentForBådeVirksomhetOgOverordnetEnhet,
        },
        {
            type: SykefraværshistorikkType.OVERORDNET_ENHET,
            label: 'THE FISHING GROUP',
            kvartalsvisSykefraværsprosent: kvartalsvisSykefraværsprosentForBådeVirksomhetOgOverordnetEnhet,
        },
    ];
};

export const getSykefraværshistorikkMock = (orgnr: String): Sykefraværshistorikk[] => {
    switch (orgnr) {
        case '666666666':
            console.log('Lage historikk for: 666666666')
            return lagHistorikkMedLikHistorikkForUnderenhetOgOverordnetEnhet();
        case '888888888':
            return lagHistorikkBransje();
        default:
            return lagHistorikkNæring();
    }
};
