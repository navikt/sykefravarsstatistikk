import {
    isSykefraværshistorikkType,
    KvartalsvisSykefraværshistorikk,
    SykefraværshistorikkType,
    Sykefraværsprosent,
} from '../api/kvartalsvis-sykefraværshistorikk-api';
import { isString } from './app-utils';

export const HistorikkLabels = {
    virksomhet: 'virksomhet',
    overordnetEnhet: 'overordnetEnhet',
    næringEllerBransje: 'næringEllerBransje',
    sektor: 'sektor',
    land: 'land',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type HistorikkLabels = Record<keyof typeof HistorikkLabels, string>;

export type HistorikkLabel = keyof HistorikkLabels;

export type ÅrstallOgKvartal = {
    årstall: number;
    kvartal: number;
};

export type KvartalsvisSammenligning = ÅrstallOgKvartal & {
    [Property in HistorikkLabel]: Sykefraværsprosent;
};

const TOM_PROSENT: Sykefraværsprosent = {
    erMaskert: false,
    prosent: undefined,
    tapteDagsverk: undefined,
    muligeDagsverk: undefined,
};
export const finnProsent = (
    historikkListe: KvartalsvisSykefraværshistorikk[],
    årstallOgKvartal: ÅrstallOgKvartal,
    type: SykefraværshistorikkType
): Sykefraværsprosent => {
    const historikk = historikkListe.find((historikk) => historikk.type === type);
    if (!historikk) {
        return TOM_PROSENT;
    }
    const prosent = historikk.kvartalsvisSykefraværsprosent.find(
        (prosent) =>
            prosent.årstall === årstallOgKvartal.årstall &&
            prosent.kvartal === årstallOgKvartal.kvartal
    );
    return prosent || TOM_PROSENT;
};
const mapTilKvartalsvisSammenligning = (
    historikkListe: KvartalsvisSykefraværshistorikk[],
    årstallOgKvartalerSomSkalVises: ÅrstallOgKvartal[]
): KvartalsvisSammenligning[] => {
    const harBransje = !!historikkListe.find(
        (historikk) => historikk.type === SykefraværshistorikkType.BRANSJE
    );

    return årstallOgKvartalerSomSkalVises.map((årstallOgKvartal) => {
        const getProsent = (type: SykefraværshistorikkType): Sykefraværsprosent =>
            finnProsent(historikkListe, årstallOgKvartal, type);

        return {
            ...årstallOgKvartal,
            virksomhet: getProsent(SykefraværshistorikkType.VIRKSOMHET),
            overordnetEnhet: getProsent(SykefraværshistorikkType.OVERORDNET_ENHET),
            næringEllerBransje: getProsent(
                harBransje ? SykefraværshistorikkType.BRANSJE : SykefraværshistorikkType.NÆRING
            ),
            sektor: getProsent(SykefraværshistorikkType.SEKTOR),
            land: getProsent(SykefraværshistorikkType.LAND),
        };
    });
};
export const beregnHvilkeÅrstallOgKvartalerSomSkalVises = (
    historikkListe: KvartalsvisSykefraværshistorikk[]
): ÅrstallOgKvartal[] => {
    if (historikkListe.length === 0) return [];

    const historikk = historikkListe.find(
        (historikk) => historikk.type === SykefraværshistorikkType.LAND
    );

    if (historikk === undefined) return [];

    return historikk.kvartalsvisSykefraværsprosent.map((prosent) => {
        return { årstall: prosent.årstall, kvartal: prosent.kvartal };
    });
};
export const konverterTilKvartalsvisSammenligning = (
    historikkListe: KvartalsvisSykefraværshistorikk[]
): KvartalsvisSammenligning[] => {
    const årstallOgKvartalerSomSkalVises =
        beregnHvilkeÅrstallOgKvartalerSomSkalVises(historikkListe);
    return mapTilKvartalsvisSammenligning(historikkListe, årstallOgKvartalerSomSkalVises);
};

export const historikkHarBransje = (historikkListe: KvartalsvisSykefraværshistorikk[]): boolean =>
    !!historikkListe.find((historikk) => historikk.type === SykefraværshistorikkType.BRANSJE);

export type BransjeEllerNæringLabel = 'Bransje' | 'Næring';
export const getBransjeEllerNæringLabel = (
    historikkListe: KvartalsvisSykefraværshistorikk[]
): BransjeEllerNæringLabel => {
    if (historikkListe.find((historikk) => historikk.type === SykefraværshistorikkType.BRANSJE)) {
        return 'Bransje';
    }
    return 'Næring';
};

export const historikkHarOverordnetEnhet = (
    historikkListe: KvartalsvisSykefraværshistorikk[]
): boolean =>
    !!historikkListe.find(
        (historikk) =>
            historikk.type === SykefraværshistorikkType.OVERORDNET_ENHET &&
            historikk.kvartalsvisSykefraværsprosent.length > 0
    );

const emptyHistorikkLabels = Object.fromEntries(
    Object.keys(HistorikkLabels).map((key) => [key, 'Ingen tilgjengelig data'])
) as HistorikkLabels;

export const isHistorikkLabel = (maybeLabel: unknown): maybeLabel is HistorikkLabel => {
    if (!isString(maybeLabel)) return false;
    return HistorikkLabels.hasOwnProperty(maybeLabel);
};

const historikkTypeToLabel = (type: SykefraværshistorikkType): HistorikkLabel => {
    switch (type) {
        case SykefraværshistorikkType.VIRKSOMHET:
            return HistorikkLabels.virksomhet;
        case SykefraværshistorikkType.LAND:
            return HistorikkLabels.land;
        case SykefraværshistorikkType.SEKTOR:
            return HistorikkLabels.sektor;
        case SykefraværshistorikkType.NÆRING:
            return HistorikkLabels.næringEllerBransje;
        case SykefraværshistorikkType.BRANSJE:
            return HistorikkLabels.næringEllerBransje;
        case SykefraværshistorikkType.OVERORDNET_ENHET:
            return HistorikkLabels.overordnetEnhet;
    }
};

export const getHistorikkLabels = (
    historikkListe: KvartalsvisSykefraværshistorikk[]
): HistorikkLabels => {
    const labels: Partial<HistorikkLabels> = {};
    for (const historikk of historikkListe) {
        if (isSykefraværshistorikkType(historikk.type)) {
            labels[historikkTypeToLabel(historikk.type)] = historikk.label;
        }
    }

    return { ...emptyHistorikkLabels, ...labels };
};
