import { Næringskode5Siffer } from "../enhetsregisteret/domene/underenhet";

export enum ArbeidsmiljøportalenBransje {
  BARNEHAGER = 'BARNEHAGER',
  NÆRINGSMIDDELINDUSTRI = 'NÆRINGSMIDDELINDUSTRI',
  SYKEHUS = 'SYKEHUS',
  SYKEHJEM = 'SYKEHJEM',
  TRANSPORT = 'TRANSPORT',
  BYGG = 'BYGG',
  ANLEGG = 'ANLEGG',
  ANDRE_BRANSJER = 'ANDRE_BRANSJER',
}

export const getArbeidsmiljøportalenBransje = (næringskode?: Næringskode5Siffer): ArbeidsmiljøportalenBransje => {
  if (næringskode === undefined || næringskode.kode.length < 2) {
    return ArbeidsmiljøportalenBransje.ANDRE_BRANSJER;
  }

  const næringskode2siffer = næringskode.kode.slice(0, 2);

  switch (næringskode2siffer) {
    case '10':
      return ArbeidsmiljøportalenBransje.NÆRINGSMIDDELINDUSTRI;
    case '41':
      return ArbeidsmiljøportalenBransje.BYGG;
    case '42':
      return ArbeidsmiljøportalenBransje.ANLEGG;
  }

  switch (næringskode.kode) {
    case '88911':
      return ArbeidsmiljøportalenBransje.BARNEHAGER;
    case '86101':
    case '86102':
    case '86104':
    case '86105':
    case '86106':
    case '86107':
      return ArbeidsmiljøportalenBransje.SYKEHUS;
    case '87101':
    case '87102':
      return ArbeidsmiljøportalenBransje.SYKEHJEM;
    case '49100':
    case '49311':
    case '49391':
    case '49392':
      return ArbeidsmiljøportalenBransje.TRANSPORT;
  }

  return ArbeidsmiljøportalenBransje.ANDRE_BRANSJER;
};

