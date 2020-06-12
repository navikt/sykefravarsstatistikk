import { Sykefraværshistorikk, SykefraværshistorikkType } from '../api/sykefraværshistorikk';
import { genererHistorikk, genererMaskertHistorikk } from './generering-av-historikk';

const lagHistorikkMedLandOgSektor = (): Sykefraværshistorikk[] => {
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

const historikkNæring = () => ({
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
});

const lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet = (): Sykefraværshistorikk[] => {
    return [
        ...lagHistorikkMedLandOgSektor(),
        historikkNæring(),
        {
            type: SykefraværshistorikkType.VIRKSOMHET,
            label: 'FLESK OG FISK AS',
            kvartalsvisSykefraværsprosent: [],
        },
        {
            type: SykefraværshistorikkType.OVERORDNET_ENHET,
            label: 'THE FISHING GROUP',
            kvartalsvisSykefraværsprosent: [],
        },
    ];
};

const lagMaskertHistorikk = (): Sykefraværshistorikk[] => [
    ...lagHistorikkMedLandOgSektor(),
    historikkNæring(),
    {
        type: SykefraværshistorikkType.VIRKSOMHET,
        label: 'FLESK OG FISK AS',
        kvartalsvisSykefraværsprosent: genererMaskertHistorikk({ årstall: 2014, kvartal: 2 }, 20),
    },
];

const lagHistorikkUtenBransjeOgNæring = (): Sykefraværshistorikk[] => [
    ...lagHistorikkMedLandOgSektor(),
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
        ...lagHistorikkMedLandOgSektor(),
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
        case '333333333':
            return lagHistorikkMedLandSektorOgNæringMenIngenDataForOverordnetEnhetEllerUnderenhet();
        case '444444444':
            return lagMaskertHistorikk();
        case '666666666':
            return lagHistorikkMedLikHistorikkForUnderenhetOgOverordnetEnhet();
        case '888888888':
            return lagHistorikkBransje();
        default:
            return lagHistorikkNæring();
    }
};
