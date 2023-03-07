import { UnderenhetDto } from "../../enhetsregisteret/api/underenheter-api";

export const underenhetFiskOgFleskMock: UnderenhetDto = {
  organisasjonsnummer: '910969439',
  navn: 'FLESK OG FISK OSLO',
  organisasjonsform: {
    kode: 'BEDR',
    beskrivelse: 'Bedrift',
    _links: {
      self: {
        href: 'https://data.brreg.no/enhetsregisteret/api/organisasjonsformer/BEDR',
      },
    },
  },
  registreringsdatoEnhetsregisteret: '1990-01-01',
  registrertIMvaregisteret: false,
  naeringskode1: {
    beskrivelse: 'Hav- og kystfiske',
    kode: '03.111',
  },
  antallAnsatte: 38,
  overordnetEnhet: '111111111',
  oppstartsdato: '1990-01-01',
  beliggenhetsadresse: {
    land: 'Norge',
    landkode: 'NO',
    postnummer: '9392',
    poststed: 'STONGLANDSEIDET',
    adresse: ['testadresse AS'],
    kommune: 'SENJA',
    kommunenummer: '5421',
  },
  _links: {
    self: {
      href: 'https://data.brreg.no/enhetsregisteret/api/underenheter/910969439',
    },
    overordnetEnhet: {
      href: 'https://data.brreg.no/enhetsregisteret/api/enheter/111111111',
    },
  },
};
