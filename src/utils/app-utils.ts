import { ÅrstallOgKvartal } from './sykefraværshistorikk-utils';

export const formaterProsent = (prosent: number | null | undefined): string => {
    if (prosent === undefined || prosent === null) {
        return '';
    }
    return Number(prosent).toFixed(1).toString().replace('.', ',');
};

export const parseVerdi = (verdi: string) => {
    return parseFloat(verdi.replace(',', '.'));
};

const månedsnavn = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
];

export const getPeriodeMedDato = (årstallOgKvartal: ÅrstallOgKvartal): string => {
    if (årstallOgKvartal.kvartal === 1) {
        return `1. april ${årstallOgKvartal.årstall - 1} til 31. mars ${årstallOgKvartal.årstall}`;
    } else if (årstallOgKvartal.kvartal === 2) {
        return `1. juli ${årstallOgKvartal.årstall - 1} til 30. juni ${årstallOgKvartal.årstall}`;
    } else if (årstallOgKvartal.kvartal === 3) {
        return `1. oktober ${årstallOgKvartal.årstall - 1} til 30. september ${
            årstallOgKvartal.årstall
        }`;
    } else if (årstallOgKvartal.kvartal === 4) {
        return `1. januar ${årstallOgKvartal.årstall} til 31. desember ${årstallOgKvartal.årstall}`;
    } else {
        return ``;
    }
};

export const formatterDatoMedMånedNavn = (dato: Date): string => {
    const dag = dato.getDate();
    const måned = månedsnavn[dato.getMonth()];
    const year = dato.getFullYear();
    return `${dag}. ${måned} ${year}`;
};

export const isString = (maybeString: unknown): maybeString is string => {
    return typeof maybeString === 'string';
};
export const isDefined = <T>(element: T): element is NonNullable<T> => {
    return element !== undefined && element !== null;
};

// const filter = listFilterBuilder(liste: T[])
// const ufiltrertListe: KanskjeT[]
// const filtrertListe: T[] = ufiltrertListe.filter(filter)
export const listFilterBuilder = <T, U extends T>(
    list: U[] | readonly U[]
): ((element: T) => element is U) => {
    return (element: T): element is U => list.includes(element as U);
};

// const picker = pickBuilder(["a","c","e"])
// const picked: aVal|cVal|eVal[] = picker({a: aVal, b: bVal, c: cVal ...})
export const pickBuilder = <Key extends string | number | symbol>(keys: Key[] | readonly Key[]) => {
    return <T extends Record<Key, any>>(record: T) =>
        keys.map((key) => record[key]).filter(isDefined);
};

// Convenience funksjon så array metoder ikke slenger med currentIndex og array
// argumenter inn i Math.max
export const getMax = (a: number, b: number) => Math.max(a, b);

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
