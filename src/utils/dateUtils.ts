export type Kvartal = 1 | 2 | 3 | 4;
export type KvartalÅrstall = { kvartal: number; årstall: number };

export const toKvartalPeriode = (
    fra: { kvartal: Kvartal; årstall: number },
    til: { kvartal: Kvartal; årstall: number }
) => {
    return `${kvartalStartDato(fra.kvartal)} ${fra.årstall} til ${kvartalSluttDato(til.kvartal)} ${
        til.årstall
    }`;
};

const kvartalStartDato = (kvartal: Kvartal) => {
    switch (kvartal) {
        case 1:
            return '1. januar.';
        case 2:
            return '1. april.';
        case 3:
            return '1. juli.';
        case 4:
            return '1. oktober.';
    }
};

const kvartalSluttDato = (kvartal: Kvartal) => {
    switch (kvartal) {
        case 1:
            return '31. mars.';
        case 2:
            return '30. juni.';
        case 3:
            return '30. september.';
        case 4:
            return '31. desember.';
    }
};

export const sorterKvartaler = (kvartaler: KvartalÅrstall[]) => {
    return kvartaler.sort((a, b) => {
        if (a.årstall === b.årstall) return a.kvartal - b.kvartal;
        return a.årstall - b.årstall;
    });
};

export const getFørsteSisteKvartal = (
    kvartaler: KvartalÅrstall[]
): { fra?: KvartalÅrstall; til?: KvartalÅrstall } => {
    const periode = sorterKvartaler(kvartaler);
    if (periode.length === 0) return { fra: undefined, til: undefined };
    return { fra: periode[0], til: periode[periode.length - 1] };
};
