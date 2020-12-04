import { ÅrstallOgKvartal } from './sykefraværshistorikk-utils';

const sistOppdatert = new Date('2020.12.02');
const nesteOppdatering = new Date('2021.03.02');
export const periodeFraOgTil = '01.10.2019 til 30.09.2020';

// TODO Hardkodede tall
export const siste4PubliserteKvartaler: ÅrstallOgKvartal[] = [
    {
        årstall: 2020,
        kvartal: 3,
    },
    {
        årstall: 2020,
        kvartal: 2,
    },
    {
        årstall: 2020,
        kvartal: 1,
    },
    {
        årstall: 2019,
        kvartal: 4,
    },
];

const ANTALL_DAGER_HVOR_VI_VISER_SIST_OPPDATERT = 45;

export const getTekstForOppdateringsdato = (
    dagensDato: Date = new Date(),
    sistOppdatertDato: Date = sistOppdatert,
    nesteOppdateringDato: Date = nesteOppdatering
): string => {
    let sistOppdatertPlussAntallDagerHvorViViserSistOppdatert = new Date(sistOppdatertDato);
    sistOppdatertPlussAntallDagerHvorViViserSistOppdatert.setDate(
        sistOppdatertPlussAntallDagerHvorViViserSistOppdatert.getDate() +
            ANTALL_DAGER_HVOR_VI_VISER_SIST_OPPDATERT
    );

    const erOver45Dager = dagensDato > sistOppdatertPlussAntallDagerHvorViViserSistOppdatert;

    if (erOver45Dager) {
        return `Neste oppdatering: ${formatterDato(nesteOppdateringDato)}`;
    } else {
        return `Sist oppdatert: ${formatterDato(sistOppdatertDato)}`;
    }
};

export const formaterProsent = (prosent: number | null | undefined): string => {
    if (prosent === undefined || prosent === null) {
        return '';
    }
    return Number(prosent).toFixed(1).toString().replace('.', ',');
};

const formatterDato = (dato: Date): string => {
    const days = dato.getDate();
    const month = dato.getMonth() + 1;
    const year = dato.getFullYear();

    return `${days.toLocaleString('nb', {
        minimumIntegerDigits: 2,
    })}.${month.toLocaleString('nb', {
        minimumIntegerDigits: 2,
    })}.${year}`;
};
