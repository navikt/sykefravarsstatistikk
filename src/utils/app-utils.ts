import {ÅrstallOgKvartal} from './sykefraværshistorikk-utils';

export const formaterProsent = (prosent: number | null | undefined): string => {
  if (prosent === undefined || prosent === null) {
    return '';
  }
  return Number(prosent).toFixed(1).toString().replace('.', ',');
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

export const getPeriodeMedDato = (årstallOgKvartal: ÅrstallOgKvartal): string => {
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
