import {getRestStatus, RestRessurs, RestStatus} from './api-utils';

const ENHETSREGISTERET_URL = 'https://data.brreg.no/enhetsregisteret/api/';

interface NæringDto {
  beskrivelse: string;
  kode: string;
}

interface Næring {
  beskrivelse: string;
  kode: string;
}

export interface UnderenhetDto {
  organisasjonsnummer: string;
  navn: string;
  organisasjonsform: {
    kode: string;
    beskrivelse: string;
    _links: {
      self: {
        href: string;
      };
    };
  };
  registreringsdatoEnhetsregisteret: string;
  registrertIMvaregisteret: boolean;
  naeringskode1?: NæringDto;
  naeringskode2?: NæringDto;
  naeringskode3?: NæringDto;
  naeringskode4?: NæringDto;
  antallAnsatte: number;
  overordnetEnhet: string;
  oppstartsdato: string;
  beliggenhetsadresse: {
    land: string;
    landkode: string;
    postnummer: string;
    poststed: string;
    adresse: string[];
    kommune: string;
    kommunenummer: string;
  };
  _links: {
    self: {
      href: string;
    };
    overordnetEnhet: {
      href: string;
    };
  };
}

export interface Underenhet {
  orgnr: string;
  overordnetEnhet: string;
  næringer: Næring[];
  beliggenhetsadresse: Beliggenhetsadresse;
}

export interface Beliggenhetsadresse {
  kommune: string;
  kommunenummer: string;
}

export interface InstitusjonellSektorkode {
  kode: string;
  beskrivelse: string;
}

export interface OverordnetEnhet {
  orgnr: string;
  institusjonellSektorkode: InstitusjonellSektorkode;
}

export type RestOverordnetEnhet = RestRessurs<OverordnetEnhet>;
export type RestUnderenhet = RestRessurs<Underenhet>;

export const mapTilUnderenhet = (underenhetDto: UnderenhetDto): Underenhet => {
  const næringer = [];
  if (underenhetDto.naeringskode1) næringer.push(underenhetDto.naeringskode1);
  if (underenhetDto.naeringskode2) næringer.push(underenhetDto.naeringskode2);
  if (underenhetDto.naeringskode3) næringer.push(underenhetDto.naeringskode3);
  if (underenhetDto.naeringskode4) næringer.push(underenhetDto.naeringskode4);

  return {
    orgnr: underenhetDto.organisasjonsnummer,
    overordnetEnhet: underenhetDto.overordnetEnhet,
    næringer,
    beliggenhetsadresse: {
      kommune: underenhetDto.beliggenhetsadresse.kommune,
      kommunenummer: underenhetDto.beliggenhetsadresse.kommunenummer
    }
  };
};

export const hentInformasjonOmUnderenhet = async (orgnr: string): Promise<RestUnderenhet> => {
  const response = await fetch(ENHETSREGISTERET_URL + 'underenheter/' + orgnr);
  const restStatus: RestStatus = getRestStatus(response.status);

  if (restStatus !== RestStatus.Suksess) {
    return {
      status: restStatus,
    };
  } else {
    const responseJson: UnderenhetDto = await response.json();
    return {
      status: restStatus,
      data: mapTilUnderenhet(responseJson),
    };
  }
};
export const hentInformasjonOmOverordnetEnhet = async (
    orgnr: string
): Promise<RestOverordnetEnhet> => {
  const response = await fetch(ENHETSREGISTERET_URL + 'enheter/' + orgnr);
  const restStatus: RestStatus = getRestStatus(response.status);

  if (restStatus !== RestStatus.Suksess) {
    return {
      status: restStatus,
    };
  } else {
    const responseJson = await response.json();
    return {
      status: restStatus,
      data: {
        orgnr: responseJson.organisasjonsnummer,
        institusjonellSektorkode: {
          kode: responseJson.institusjonellSektorkode?.kode,
          beskrivelse: responseJson.institusjonellSektorkode?.beskrivelse,
        },
      },
    };
  }
};
