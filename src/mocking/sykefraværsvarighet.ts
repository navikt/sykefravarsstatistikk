import {Sykefraværsvarighet} from "../api/sykefraværsvarighet";

const sykefraværsvarighetMockMaskert = {
    korttidsfraværSiste4Kvartaler: {
        prosent: null,
        tapteDagsverk: null,
        muligeDagsverk: null,
        erMaskert: true,
        kvartaler: [],
    },
    langtidsfraværSiste4Kvartaler: {
        prosent: null,
        tapteDagsverk: null,
        muligeDagsverk: null,
        erMaskert: true,
        kvartaler: [],
    },
};

const sykefraværsvarighetMockUtenData = {
    korttidsfraværSiste4Kvartaler: {
        prosent: null,
        tapteDagsverk: null,
        muligeDagsverk: null,
        erMaskert: false,
        kvartaler: [],
    },
    langtidsfraværSiste4Kvartaler: {
        prosent: null,
        tapteDagsverk: null,
        muligeDagsverk: null,
        erMaskert: false,
        kvartaler: [],
    },
};

const sykefraværsvarighetMockMedBare2AvKvartaller = {
    korttidsfraværSiste4Kvartaler: {
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
    langtidsfraværSiste4Kvartaler: {
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

const sykefraværsvarighetMockMedSiste4Kvartaller = {
    korttidsfraværSiste4Kvartaler: {
        prosent: 2.3,
        tapteDagsverk: 140.6,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: [
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
        ],
    },
    langtidsfraværSiste4Kvartaler: {
        prosent: 6.1,
        tapteDagsverk: 116.7,
        muligeDagsverk: 3990.4,
        erMaskert: false,
        kvartaler: [
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
        ],
    },
};

export const sykefraværsvarighetMock = (orgnr: String): Sykefraværsvarighet => {
    switch (orgnr) {
        case '888888888':
            return sykefraværsvarighetMockMedSiste4Kvartaller;
        case '888888887':
            return sykefraværsvarighetMockMaskert;
        case '888888886':
            return sykefraværsvarighetMockMedBare2AvKvartaller;
        default:
            return sykefraværsvarighetMockUtenData;
    }
};