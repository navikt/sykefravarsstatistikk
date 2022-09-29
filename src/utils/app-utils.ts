import {ÅrstallOgKvartal} from './sykefraværshistorikk-utils';

const sistOppdatert = new Date('2022-09-08');
const nesteOppdatering = new Date('2022-12-01');
export const periodeFra = new Date('2021-07-01');
export const periodeTil = new Date('2022-06-30');

// TODO Hardkodede tall
export const siste4PubliserteKvartaler: ÅrstallOgKvartal[] = [
  {
    årstall: 2022,
    kvartal: 2,
  },
  {
    årstall: 2022,
    kvartal: 1,
  },
  {
    årstall: 2021,
    kvartal: 4,
  },
  {
    årstall: 2021,
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
  return dato.toISOString().split('.')[0] + 'Z';
};

const månedsnavn = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember',
];

export const getÅrstallOgKvartalTilPeriode = (årstallOgKvartal: ÅrstallOgKvartal): string => {
  if (årstallOgKvartal.kvartal === 1) {
    return `1. april ${årstallOgKvartal.årstall-1} til 31. mars ${årstallOgKvartal.årstall}`;
  } else if (årstallOgKvartal.kvartal === 2) {
    return `1. juli ${årstallOgKvartal.årstall-1} til 30. juni ${årstallOgKvartal.årstall}`;
  } else if (årstallOgKvartal.kvartal === 3) {
    return `1. oktober ${årstallOgKvartal.årstall-1} til 30. september ${årstallOgKvartal.årstall}`;
  } else if (årstallOgKvartal.kvartal === 4) {
    return `1. januar ${årstallOgKvartal.årstall} til 31. desember ${årstallOgKvartal.årstall}`;
  } else {
    return ``;
  }
}

export const formatterDatoMedMånedNavn = (dato: Date): string => {
  const dag = dato.getDate();
  const måned = månedsnavn[dato.getMonth()];
  const year = dato.getFullYear();
  return `${dag}. ${måned} ${year}`;
  //const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // @ts-ignore
  // Funker ikke alle broesere foreløpig, derfor hardkoder midlertidig
  //return dato.toLocaleDateString('nb', options);
};
