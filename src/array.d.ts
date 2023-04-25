// change-array-by-copy metodene er stage 4 proposal hos tc39.
// Frem til dette blir implementert er vi nødt til å definere typene lokalt
// TODO: slett når https://github.com/microsoft/TypeScript/pull/51367 blir merget
// sannsynligis TS 5.2 https://github.com/microsoft/TypeScript/pull/51367#pullrequestreview-1393002053
interface Array<T> {
    toReversed(): T[];
    toSorted(compareFn?: (a: T, b: T) => number): T[];
    toSpliced(start: number, deleteCount: number, ...items: T[]): T[];
    toSpliced(start: number, deleteCount?: number): T[];
    with(index: number, value: T): T[];
}
interface ReadonlyArray<T> {
    toReversed(): T[];
    toSorted(compareFn?: (a: T, b: T) => number): T[];
    toSpliced(start: number, deleteCount: number, ...items: T[]): T[];
    toSpliced(start: number, deleteCount?: number): T[];
    with(index: number, value: T): T[];
}
