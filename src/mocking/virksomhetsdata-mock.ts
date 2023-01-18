import {ArbeidsmiljøportalenBransje} from '../utils/bransje-utils';
import {Virksomhetsdata} from '../api/virksomhetsdata-api';


export const getvirksomhetsdataMock = (bransje: ArbeidsmiljøportalenBransje): Virksomhetsdata => {
  switch (bransje) {
    case ArbeidsmiljøportalenBransje.BARNEHAGER:
      return {
        antallAnsatte: 99,
        næringskode5Siffer: {
          kode: '88911',
          beskrivelse: 'Barnehager',
        },
        bransje: ArbeidsmiljøportalenBransje.BARNEHAGER,
      };
    case ArbeidsmiljøportalenBransje.NÆRINGSMIDDELINDUSTRI:
      return {
        antallAnsatte: 99,
        næringskode5Siffer: {
          kode: '10201',
          beskrivelse: 'Næringsmiddelindustrien',
        },
        bransje: ArbeidsmiljøportalenBransje.NÆRINGSMIDDELINDUSTRI,
      };
    case ArbeidsmiljøportalenBransje.SYKEHJEM:
      return {
        antallAnsatte: 99,
        næringskode5Siffer: {
          kode: '87101',
          beskrivelse: 'Sykehjem',
        },
        bransje: ArbeidsmiljøportalenBransje.SYKEHJEM,
      };
    case ArbeidsmiljøportalenBransje.SYKEHUS:
      return {
        antallAnsatte: 99,
        næringskode5Siffer: {
          kode: '86102',
          beskrivelse: 'Sykehus',
        },
        bransje: ArbeidsmiljøportalenBransje.SYKEHUS,
      };
    case ArbeidsmiljøportalenBransje.TRANSPORT:
      return {
        antallAnsatte: 99,
        næringskode5Siffer: {
          kode: '49311',
          beskrivelse: 'Rutebuss og persontrafikk (transport)',
        },
        bransje: ArbeidsmiljøportalenBransje.TRANSPORT,
      };
    case ArbeidsmiljøportalenBransje.BYGG:
      return {
        antallAnsatte: 99,
        næringskode5Siffer: {
          kode: '41101',
          beskrivelse: 'Boligbyggelag',
        },
      };
    case ArbeidsmiljøportalenBransje.ANLEGG:
      return {
        antallAnsatte: 99,
        næringskode5Siffer: {
          kode: '42110',
          beskrivelse: 'Bygging av veier og motorveier',
        },
      };
    case ArbeidsmiljøportalenBransje.ANDRE_BRANSJER:
      return {
        antallAnsatte: 99,
        næringskode5Siffer: {
          kode: '84300',
          beskrivelse: 'Trygdeordninger underlagt offentlig forvaltning',
        },
      };
  }
};
