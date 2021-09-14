import { ÅrstallOgKvartal } from './sykefraværshistorikk-utils';

const sistOppdatert = new Date('2021.09.09');
const nesteOppdatering = new Date('2021.12.02');
export const periodeFra = new Date('2020.07.01');
export const periodeTil = new Date('2021.06.30');

// TODO Hardkodede tall
export const siste4PubliserteKvartaler: ÅrstallOgKvartal[] = [
    {
        årstall: 2021,
        kvartal: 2,
    },
    {
        årstall: 2021,
        kvartal: 1,
    },
    {
        årstall: 2020,
        kvartal: 4,
    },
    {
        årstall: 2020,
        kvartal: 3,
    },
];

const ANTALL_DAGER_HVOR_VI_VISER_SIST_OPPDATERT = 45;

export const getTekstForOppdateringsdato = (
    dagensDato: Date = new Date(),
    sistOppdatertDato: Date = sistOppdatert,
    nesteOppdateringDato: Date = nesteOppdatering,
    brukSomAriaLabel: boolean = false
): string => {
    let sistOppdatertPlussAntallDagerHvorViViserSistOppdatert = new Date(sistOppdatertDato);
    sistOppdatertPlussAntallDagerHvorViViserSistOppdatert.setDate(
        sistOppdatertPlussAntallDagerHvorViViserSistOppdatert.getDate() +
            ANTALL_DAGER_HVOR_VI_VISER_SIST_OPPDATERT
    );

    const erOver45Dager = dagensDato > sistOppdatertPlussAntallDagerHvorViViserSistOppdatert;

    if (erOver45Dager) {
        return `Neste oppdatering: ${
            brukSomAriaLabel
                ? formatterDatoMedMånedNavn(nesteOppdateringDato)
                : formatterDato(nesteOppdateringDato)
        }`;
    } else {
        return `Sist oppdatert: ${
            brukSomAriaLabel
                ? formatterDatoMedMånedNavn(sistOppdatertDato)
                : formatterDato(sistOppdatertDato)
        }`;
    }
};

export const getAriaLabelTekstForOppdateringsdato = () => {
    return getTekstForOppdateringsdato(new Date(), sistOppdatert, nesteOppdatering, true);
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

export const tilIsoDatoMedUtcTimezoneUtenMillis = (dato: Date): String => {
    return dato.toISOString().split('.')[0] + "Z";
}

const månedsnavn = [
    "januar",
    "februar",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "desember"
];

export const formatterDatoMedMånedNavn = (dato: Date): string => {
    const dag = dato.getDate();
    const måned = månedsnavn[dato.getMonth()];
    const year = dato.getFullYear();
    return `${dag}. ${måned}. ${year}`;
    //const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // @ts-ignore
    // Funker ikke alle broesere foreløpig, derfor hardkoder midlertidig
    //return dato.toLocaleDateString('nb', options);
};

export const periodeFraOgTil =
    'Periode: ' +
    formatterDatoMedMånedNavn(periodeFra) +
    ' til ' +
    formatterDatoMedMånedNavn(periodeTil);
