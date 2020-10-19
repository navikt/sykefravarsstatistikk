const sistOppdatert = new Date('2020.09.02');
const nesteOppdatering = new Date('2020.12.02');
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