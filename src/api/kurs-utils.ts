import { Kurs } from './kurs-api';

export const getNesteIANettkurs = (kursliste: Kurs[]): Kurs | undefined => {
    return kursliste
        .filter((kurs) => kurs.tema === 'Inkluderende arbeidsliv (IA)')
        .filter((kurs) => kurs.type === 'Webinar')
        .sort(
            (kurs1, kurs2) => new Date(kurs1.start).getTime() - new Date(kurs2.start).getTime()
        )[0];
};
