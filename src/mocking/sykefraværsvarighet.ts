import { Sykefraværsvarighet } from '../api/sykefraværsvarighet';

const sykefraværsvarighetMockMaskert = {
    summertKorttidsfravær: {
        prosent: null,
        tapteDagsverk: null,
        muligeDagsverk: null,
        erMaskert: true,
        kvartaler: [],
    },
    summertLangtidsfravær: {
        prosent: null,
        tapteDagsverk: null,
        muligeDagsverk: null,
        erMaskert: true,
        kvartaler: [],
    },
};

const sykefraværsvarighetMockUtenData = {
    summertKorttidsfravær: {
        prosent: null,
        tapteDagsverk: null,
        muligeDagsverk: null,
        erMaskert: false,
        kvartaler: [],
    },
    summertLangtidsfravær: {
        prosent: null,
        tapteDagsverk: null,
        muligeDagsverk: null,
        erMaskert: false,
        kvartaler: [],
    },
};

const sykefraværsvarighetMockMedBare2AvKvartaler = {
    summertKorttidsfravær: {
        prosent: 2.3,
        tapteDagsverk: 140.6,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: [
            {
                årstall: 2019,
                kvartal: 4,
            },
            {
                årstall: 2020,
                kvartal: 1,
            },
        ],
    },
    summertLangtidsfravær: {
        prosent: 6.1,
        tapteDagsverk: 116.7,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: [
            {
                årstall: 2019,
                kvartal: 4,
            },
            {
                årstall: 2020,
                kvartal: 1,
            },
        ],
    },
};
const siste4Kvartaler = [
    {
        årstall: 2019,
        kvartal: 2,
    },
    {
        årstall: 2019,
        kvartal: 3,
    },
    {
        årstall: 2019,
        kvartal: 4,
    },
    {
        årstall: 2020,
        kvartal: 1,
    },
];

const sykefraværsvarighetMockMedSiste4Kvartaler = {
    summertKorttidsfravær: {
        prosent: 2.3,
        tapteDagsverk: 140.6,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: siste4Kvartaler,
    },
    summertLangtidsfravær: {
        prosent: 6.1,
        tapteDagsverk: 116.7,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: siste4Kvartaler,
    },
};
const sykefraværsvarighetMockGrønn = {
    summertKorttidsfravær: {
        prosent: 0.8,
        tapteDagsverk: 140.6,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: siste4Kvartaler,
    },
    summertLangtidsfravær: {
        prosent: 5.9,
        tapteDagsverk: 116.7,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: siste4Kvartaler,
    },
};
const sykefraværsvarighetMockGul = {
    summertKorttidsfravær: {
        prosent: 1.2,
        tapteDagsverk: 140.6,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: siste4Kvartaler,
    },
    summertLangtidsfravær: {
        prosent: 7.3,
        tapteDagsverk: 116.7,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: siste4Kvartaler,
    },
};
const sykefraværsvarighetMockRød = {
    summertKorttidsfravær: {
        prosent: 1.8,
        tapteDagsverk: 140.6,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: siste4Kvartaler,
    },
    summertLangtidsfravær: {
        prosent: 10.4,
        tapteDagsverk: 116.7,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: siste4Kvartaler,
    },
};

export const sykefraværsvarighetMock = (orgnr: String): Sykefraværsvarighet => {
    switch (orgnr) {
        case '888888888':
            return sykefraværsvarighetMockMedSiste4Kvartaler;
        case '888888887':
            return sykefraværsvarighetMockMaskert;
        case '888888886':
            return sykefraværsvarighetMockMedBare2AvKvartaler;
        case '888888883':
            return sykefraværsvarighetMockGrønn;
        case '888888882':
            return sykefraværsvarighetMockGul;
        case '888888881':
            return sykefraværsvarighetMockRød;
        default:
            return sykefraværsvarighetMockUtenData;
    }
};
