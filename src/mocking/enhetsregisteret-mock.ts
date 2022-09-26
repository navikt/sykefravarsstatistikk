import {UnderenhetDto} from '../api/enhetsregisteret-api';

export const underenhetMock: UnderenhetDto = {
  organisasjonsnummer: "999999999",
  navn: "HEI OG HÅ BARNEHAGE",
  organisasjonsform: {
    kode: "BEDR",
    beskrivelse: "Bedrift",
    _links: {
      self: {
        href: "https://data.brreg.no/enhetsregisteret/api/organisasjonsformer/BEDR"
      }
    }
  },
  registreringsdatoEnhetsregisteret: "1990-01-01",
  registrertIMvaregisteret: false,
  naeringskode1: {
    beskrivelse: "næring 1",
    kode: "88.992"
  },
  naeringskode2: {
    beskrivelse: "barnehage",
    kode: "77.777"
  },
  antallAnsatte: 62,
  overordnetEnhet: "999999991",
  oppstartsdato: "1990-01-01",
  beliggenhetsadresse: {
    land: "Norge",
    landkode: "NO",
    postnummer: "9999",
    poststed: "OSLO",
    adresse: [
      "testadresse AS"
    ],
    kommune: "OSLO",
    kommunenummer: "9999"
  },
  _links: {
    self: {
      href: "https://data.brreg.no/enhetsregisteret/api/underenheter/999999999"
    },
    overordnetEnhet: {
      href: "https://data.brreg.no/enhetsregisteret/api/enheter/999999991"
    }
  }
}
