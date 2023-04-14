import { AggregertStatistikkResponse, Statistikk } from '../../hooks/useAggregertStatistikk';
import { ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import { Statistikkategori } from '../../domene/statistikkategori';

const tomAggregertStatistikk: Partial<AggregertStatistikkResponse> = {
    prosentSiste4KvartalerTotalt: [],
    prosentSiste4KvartalerGradert: [],
    prosentSiste4KvartalerKorttid: [],
    prosentSiste4KvartalerLangtid: [],
    trendTotalt: [],
};

export const siste4KvartalerMock: ÅrstallOgKvartal[] = [
    { årstall: 2021, kvartal: 3 },
    { årstall: 2021, kvartal: 4 },
    { årstall: 2022, kvartal: 1 },
    { årstall: 2022, kvartal: 2 },
];

export const siste2KvartalerMock: ÅrstallOgKvartal[] = [
    { årstall: 2022, kvartal: 1 },
    { årstall: 2022, kvartal: 2 },
];

export function lagStatistikkMock(
    statistikkategori: Statistikkategori,
    label: string,
    verdi: string,
    kvartaler: ÅrstallOgKvartal[]
): Statistikk {
    return {
        statistikkategori: statistikkategori,
        label: label,
        verdi: verdi,
        antallPersonerIBeregningen: 15,
        kvartalerIBeregningen: kvartaler,
    };
}

const statistikkBarnehage = lagStatistikkMock(
    Statistikkategori.BRANSJE,
    'Barnehager',
    '10.0',
    siste4KvartalerMock
);

function aggregertStatistikkBarnehage(
    statistikkVirksomhet: Statistikk,
    gradertVerdi: string = '10.0'
): Partial<AggregertStatistikkResponse> {
    return {
        prosentSiste4KvartalerTotalt: [statistikkVirksomhet, statistikkBarnehage],
        prosentSiste4KvartalerKorttid: [statistikkVirksomhet, statistikkBarnehage],
        prosentSiste4KvartalerLangtid: [statistikkVirksomhet, statistikkBarnehage],
        prosentSiste4KvartalerGradert: [
            statistikkVirksomhet,
            {
                ...statistikkBarnehage,
                verdi: gradertVerdi,
            },
        ],
        trendTotalt: [],
    };
}

export const aggregertStatistikkMockMaskert: Partial<AggregertStatistikkResponse> = {
    prosentSiste4KvartalerTotalt: [statistikkBarnehage],
    prosentSiste4KvartalerKorttid: [statistikkBarnehage],
    prosentSiste4KvartalerLangtid: [statistikkBarnehage],
    prosentSiste4KvartalerGradert: [statistikkBarnehage],
    trendTotalt: [],
};

export const aggregertStatistikkMockUtenData: Partial<AggregertStatistikkResponse> =
    tomAggregertStatistikk;

export function aggregertStatistikkMockMedBare2Kvartaler(): Partial<AggregertStatistikkResponse> {
    const statistikkVirksomhet = lagStatistikkMock(
        Statistikkategori.VIRKSOMHET,
        'Virksomhetens navn',
        '10.0',
        siste2KvartalerMock
    );
    return aggregertStatistikkBarnehage(statistikkVirksomhet);
}

export const lagAggregertStatistikkMockGul = (
    type: Statistikkategori.BRANSJE | Statistikkategori.NÆRING,
    label: string
): Partial<AggregertStatistikkResponse> => {
    const statistikkBransjeEllerNæring = { ...statistikkBarnehage, type, label };
    const statistikkVirksomhet = lagStatistikkMock(
        Statistikkategori.VIRKSOMHET,
        'Virksomhetens navn',
        '10.5',
        siste4KvartalerMock
    );
    return {
        prosentSiste4KvartalerTotalt: [statistikkVirksomhet, statistikkBransjeEllerNæring],
        prosentSiste4KvartalerKorttid: [statistikkVirksomhet, statistikkBransjeEllerNæring],
        prosentSiste4KvartalerLangtid: [statistikkVirksomhet, statistikkBransjeEllerNæring],
        prosentSiste4KvartalerGradert: [statistikkVirksomhet, statistikkBransjeEllerNæring],
        trendTotalt: [],
    };
};

export const aggregertStatistikkMockGulBarnehage: Partial<AggregertStatistikkResponse> =
    lagAggregertStatistikkMockGul(Statistikkategori.BRANSJE, 'Barnehager');

export const aggregertStatistikkMockGrønnBarnehage: Partial<AggregertStatistikkResponse> =
    aggregertStatistikkBarnehage(
        lagStatistikkMock(
            Statistikkategori.VIRKSOMHET,
            'Virksomhetens navn',
            '8.0',
            siste4KvartalerMock
        ),
        '12.0'
    );

export const aggregertStatistikkMockRødBarnehage: Partial<AggregertStatistikkResponse> =
    aggregertStatistikkBarnehage(
        lagStatistikkMock(
            Statistikkategori.VIRKSOMHET,
            'Virksomhetens navn',
            '12.0',
            siste4KvartalerMock
        ),
        '8.0'
    );
