import { TapteDagsverk } from '../api/tapteDagsverk';

const lagMockTapteDagsverk = (
    antall1: number,
    antall2: number,
    antall3: number,
    antall4: number
) => {
    return [
        {
            tapteDagsverk: antall1,
            årstall: 2018,
            kvartal: 3,
        },
        {
            tapteDagsverk: antall2,
            årstall: 2018,
            kvartal: 4,
        },
        {
            tapteDagsverk: antall3,
            årstall: 2019,
            kvartal: 1,
        },
        {
            tapteDagsverk: antall4,
            årstall: 2019,
            kvartal: 2,
        },
    ];
};

export const getTapteDagsverkMock = (orgnr: String): TapteDagsverk[] => {
    switch (orgnr) {
        case '910969439':
            return lagMockTapteDagsverk(263, 386, 174, 299);
        case '333333333':
            return lagMockTapteDagsverk(73, 50, 44, 23);
        case '444444444':
            return lagMockTapteDagsverk(2, 1, 0, 2);
        case '666666666':
            return lagMockTapteDagsverk(0, 0, 0, 0);
        case '888888888':
            return lagMockTapteDagsverk(43, 30, 32, 11);
        default:
            return lagMockTapteDagsverk(512, 733, 123, 123);
    }
};
