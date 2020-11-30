import { Statistikkategori, SummertSykefraværshistorikk } from '../api/summertSykefraværshistorikk';

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

const summertSykefraværshistorikkBarnehager: SummertSykefraværshistorikk = {
    type: Statistikkategori.BRANSJE,
    label: 'Barnehager',

    summertKorttidsOgLangtidsfravær: {
        summertKorttidsfravær: {
            prosent: 1.2,
            tapteDagsverk: 12,
            muligeDagsverk: 1000,
            erMaskert: false,
            kvartaler: siste4Kvartaler,
        },
        summertLangtidsfravær: {
            prosent: 7.5,
            tapteDagsverk: 75,
            muligeDagsverk: 1000,
            erMaskert: false,
            kvartaler: siste4Kvartaler,
        },
    },
};

export const summertSykefraværshistorikkMockMaskert: SummertSykefraværshistorikk[] = [
    {
        type: Statistikkategori.VIRKSOMHET,
        label: 'En virksomhet',
        summertKorttidsOgLangtidsfravær: {
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
        },
    },
    summertSykefraværshistorikkBarnehager,
];

export const summertSykefraværshistorikkMockUtenData: SummertSykefraværshistorikk[] = [
    {
        type: Statistikkategori.VIRKSOMHET,
        label: 'En virksomhet',
        summertKorttidsOgLangtidsfravær: {
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
        },
    },
    summertSykefraværshistorikkBarnehager,
];

export const summertSykefraværshistorikkMockMedBare2Kvartaler: SummertSykefraværshistorikk[] = [
    {
        type: Statistikkategori.VIRKSOMHET,
        label: 'En virksomhet',
        summertKorttidsOgLangtidsfravær: {
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
        },
    },
    summertSykefraværshistorikkBarnehager,
];

export const getSummertSykefraværshistorikkMock = (
    type: Statistikkategori.BRANSJE | Statistikkategori.NÆRING,
    label: string
): SummertSykefraværshistorikk[] => [
    {
        type: Statistikkategori.VIRKSOMHET,
        label: 'En virksomhet',
        summertKorttidsOgLangtidsfravær: {
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
        },
    },
    { ...summertSykefraværshistorikkBarnehager, type, label },
];

export const summertSykefraværshistorikkMockMedSiste4Kvartaler: SummertSykefraværshistorikk[] = getSummertSykefraværshistorikkMock(
    Statistikkategori.BRANSJE,
    'Barnehager'
);

export const summertSykefraværshistorikkMockGrønn: SummertSykefraværshistorikk[] = [
    {
        type: Statistikkategori.VIRKSOMHET,
        label: 'En virksomhet',
        summertKorttidsOgLangtidsfravær: {
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
        },
    },
    summertSykefraværshistorikkBarnehager,
];

export const summertSykefraværshistorikkMockGul = [
    {
        type: Statistikkategori.VIRKSOMHET,
        label: 'En virksomhet',
        summertKorttidsOgLangtidsfravær: {
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
        },
    },
    summertSykefraværshistorikkBarnehager,
];

export const summertSykefraværshistorikkMockRød = [
    {
        type: Statistikkategori.VIRKSOMHET,
        label: 'En virksomhet',
        summertKorttidsOgLangtidsfravær: {
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
        },
    },
    summertSykefraværshistorikkBarnehager,
];
