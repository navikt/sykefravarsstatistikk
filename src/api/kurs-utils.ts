import { Kurs } from './kurs-api';

export const getNesteNettkurs = (kursliste: Kurs[]): Kurs | undefined => {
    return kursliste
        .filter((kurs) => kurs.tema === 'Inkluderende arbeidsliv (IA)')
        .filter((kurs) => kurs.type === 'Webinar')
        .sort(
            (kurs1, kurs2) => new Date(kurs1.start).getTime() - new Date(kurs2.start).getTime()
        )[0];
};

const måneder = [
    'jan',
    'feb',
    'mar',
    'apr',
    'mai',
    'jun',
    'jul',
    'aug',
    'sep',
    'okt',
    'nov',
    'des',
];

export const formatterKursdato = (kursdato: Date | undefined): string => {
    if (kursdato) {
        return `${kursdato.getDate()}. ${
            måneder[kursdato.getMonth()]
        } ${kursdato.getFullYear()} kl. ${kursdato.getHours().toLocaleString('nb', {
            minimumIntegerDigits: 2,
        })}.${kursdato.getMinutes().toLocaleString('nb', { minimumIntegerDigits: 2 })}`;
    } else {
        return '';
    }
};
