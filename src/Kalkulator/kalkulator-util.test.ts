import { TapteDagsverk } from '../api/tapteDagsverk';
import { summerTapteDagsverk } from './kalkulator-util';

describe('test for summerTapteDagsverk', () => {
    test('sjekk at funksjonen summerer rikitg', () => {
        const sum = summerTapteDagsverk([
            lagTapteDagsverk(5),
            lagTapteDagsverk(99),
            lagTapteDagsverk(6),
        ]);
        expect(sum).toBe(110);
    });

    test('sjekk at funksjonen avrunder rikitg', () => {
        expect(summerTapteDagsverk([lagTapteDagsverk(5.4)])).toBe(5);
        expect(summerTapteDagsverk([lagTapteDagsverk(5.5)])).toBe(6);
    });
});

const lagTapteDagsverk = (tapteDagsverk: number): TapteDagsverk => {
    return {
        årstall: 2019,
        kvartal: 4,
        tapteDagsverk,
    };
};
