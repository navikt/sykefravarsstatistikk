import { getRestStatus, RestRessurs, RestStatus } from '../../api/api-utils';
import { Underenhet } from '../domene/underenhet';
import { næringskodeTilNæring } from '../../amplitude/næringsbeskrivelser';
import { getArbeidsmiljøportalenBransje } from '../../utils/bransje-utils';

interface NæringskodeDto {
    beskrivelse: string;
    kode: string;
}

interface OrganisasjonsformDto {
    kode: string;
    beskrivelse: string;
    _links: {
        self: {
            href: string;
        };
    };
}

interface AdresseDto {
    land: string;
    landkode: string;
    postnummer: string;
    poststed: string;
    adresse: string[];
    kommune: string;
    kommunenummer: string;
}

export interface UnderenhetDto {
    organisasjonsnummer: string;
    navn: string;
    organisasjonsform: OrganisasjonsformDto;
    registreringsdatoEnhetsregisteret: string;
    registrertIMvaregisteret: boolean;
    naeringskode1?: NæringskodeDto;
    antallAnsatte: number;
    overordnetEnhet: string;
    oppstartsdato: string;
    beliggenhetsadresse: AdresseDto;
    _links: {
        self: {
            href: string;
        };
        overordnetEnhet: {
            href: string;
        };
    };
}

export type RestUnderenhet = RestRessurs<Underenhet>;

export const mapTilUnderenhet = (underenhetDto: UnderenhetDto): Underenhet => {
    const orgnr = underenhetDto.organisasjonsnummer;
    const overordnetEnhet = underenhetDto.overordnetEnhet;
    const næringskode = underenhetDto.naeringskode1
        ? {
              kode: underenhetDto.naeringskode1.kode.replace('.', ''),
              beskrivelse: underenhetDto.naeringskode1.beskrivelse,
          }
        : undefined;
    const antallAnsatte = underenhetDto.antallAnsatte;
    const næring = næringskodeTilNæring(næringskode);
    const bransje = getArbeidsmiljøportalenBransje(næringskode);
    const beliggenhetsadresse = {
        kommune: underenhetDto.beliggenhetsadresse.kommune,
        kommunenummer: underenhetDto.beliggenhetsadresse.kommunenummer,
    };
    return {
        orgnr,
        overordnetEnhet,
        antallAnsatte,
        beliggenhetsadresse,
        bransje,
        næring,
        næringskode,
    };
};

export const hentInformasjonOmUnderenhet = async (orgnr: string): Promise<RestUnderenhet> => {
    const response = await fetch(
        `https://data.brreg.no/enhetsregisteret/api/underenheter/${orgnr}`
    );
    const restStatus: RestStatus = getRestStatus(response.status);

    if (restStatus !== RestStatus.Suksess) {
        return {
            status: restStatus,
        };
    }
    const responseJson: UnderenhetDto = await response.json();
    return {
        status: RestStatus.Suksess,
        data: mapTilUnderenhet(responseJson),
    };
};
