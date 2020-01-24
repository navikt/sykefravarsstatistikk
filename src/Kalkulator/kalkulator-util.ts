import { TapteDagsverk } from '../api/tapteDagsverk';

export const summerTapteDagsverk = (tapteDagsverkListe: TapteDagsverk[]): number => {
    let sum = 0;
    tapteDagsverkListe.forEach(tapteDagsverk => {
        sum = sum + tapteDagsverk.tapteDagsverk;
    });
    return Math.round(sum);
};
