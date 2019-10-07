import { AltinnOrganisasjon, Organisasjon, Organisasjonstre } from './organisasjonstre-utils';

export enum RestStatus {
    IkkeLastet = 'IkkeLastet',
    LasterInn = 'LasterInn',
    Suksess = 'Suksess',
    Feil = 'Feil',
}

interface IkkeLastet {
    status: RestStatus.IkkeLastet;
}

interface LasterInn {
    status: RestStatus.LasterInn;
}

interface Suksess<T> {
    status: RestStatus.Suksess;
    data: T;
}

interface Feil {
    status: RestStatus.Feil;
    error: string;
}

export type RestRessurs<T> = IkkeLastet | LasterInn | Suksess<T> | Feil;

export type RestOrganisasjonstre = RestRessurs<Organisasjonstre>;

export const hentAltinnOrganisasjonerBrukerHarTilgangTil = async (): Promise<
    AltinnOrganisasjon[]
> => {
    const respons = await fetch('/min-side-arbeidsgiver/api/organisasjoner');
    if (!respons.ok) {
        throw new Error('Feil ved henting av organisasjoner fra Altinn');
    }
    return await respons.json();
};

export const hentJuridiskeEnheter = async (orgnumre: string[]): Promise<Organisasjon[]> => {
    if (!orgnumre || orgnumre.length === 0) {
        return [];
    }

    const urlTilBrreg =
        'https://data.brreg.no/enhetsregisteret/api/enheter/?organisasjonsnummer=' +
        orgnumre.join(',');

    const respons = await fetch(urlTilBrreg).then(res => res.json());

    if (!respons.ok) {
        throw new Error('Feil ved henting av organisasjoner fra Brønnøysundregistrene');
    }

    if (!respons._embedded) {
        return [];
    }

    return respons._embedded.enheter.map((juridiskEnhetFraBrreg: any) => {
        const organisasjon: Organisasjon = {
            navn: juridiskEnhetFraBrreg.navn,
            orgnr: juridiskEnhetFraBrreg.organisasjonsnummer,
        };
        return organisasjon;
    });
};
