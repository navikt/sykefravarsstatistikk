import { AltinnOrganisasjon, Organisasjon, Organisasjonstre } from './organisasjonstre-utils';

export enum RestStatus {
    IkkeLastet = 'IkkeLastet',
    LasterInn = 'LasterInn',
    Suksess = 'Suksess',
    IkkeInnlogget = 'IkkeInnlogget',
    Feil = 'Feil',
}

interface IkkeLastet {
    status: RestStatus.IkkeLastet;
}

interface LasterInn {
    status: RestStatus.LasterInn;
}

interface IkkeInnlogget {
    status: RestStatus.IkkeInnlogget;
}

interface Suksess<T> {
    status: RestStatus.Suksess;
    data: T;
}

interface Feil {
    status: RestStatus.Feil;
    error: string;
}

export type RestRessurs<T> = IkkeLastet | LasterInn | Suksess<T> | IkkeInnlogget | Feil;

export type RestOrganisasjonstre = RestRessurs<Organisasjonstre>;

function getRestStatus(responseStatus: number) : RestStatus {
    switch (responseStatus) {
        case 200 : {
            return RestStatus.Suksess;
        }
        case 401 : {
            return RestStatus.IkkeInnlogget;
        }
        default: {
            return RestStatus.Feil;
        }
    }
}

export const hentAltinnOrganisasjonerBrukerHarTilgangTil = async (): Promise<
    AltinnOrganisasjon[]
> => {
    const respons = await fetch('/min-side-arbeidsgiver/api/organisasjoner');
    const restStatus: RestStatus = getRestStatus(respons.status);

    if (restStatus !== RestStatus.Suksess) {
        const error = {
            status: restStatus
        };

        return Promise.reject(error);
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

    const respons = await fetch(urlTilBrreg);

    if (!respons.ok) {
        throw new Error('Feil ved henting av organisasjoner fra Brønnøysundregistrene');
    }

    const responsJson = await respons.json();

    if (!responsJson._embedded) {
        return [];
    }

    return responsJson._embedded.enheter.map((juridiskEnhetFraBrreg: any) => {
        const organisasjon: Organisasjon = {
            navn: juridiskEnhetFraBrreg.navn,
            orgnr: juridiskEnhetFraBrreg.organisasjonsnummer,
        };
        return organisasjon;
    });
};
