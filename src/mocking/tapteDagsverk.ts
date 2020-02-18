import { TapteDagsverk } from '../api/tapteDagsverk';

const lagMockTapteDagsverk = (antallTapteDagsverk: number, erMaskert: boolean) => {
    const tapteDagsverk: TapteDagsverk = {
        tapteDagsverk: antallTapteDagsverk,
        erMaskert: erMaskert,
    };
    return tapteDagsverk;
};

export const getTapteDagsverkMock = (orgnr: String): TapteDagsverk => {
    switch (orgnr) {
        case '910969439':
            return lagMockTapteDagsverk(100, false);
        case '333333333':
            return lagMockTapteDagsverk(73, false);
        case '444444444':
            return lagMockTapteDagsverk(2, false);
        case '666666666':
            return lagMockTapteDagsverk(0, false);
        case '888888888':
            return lagMockTapteDagsverk(43, false);
        default:
            return lagMockTapteDagsverk(512, false);
    }
};
