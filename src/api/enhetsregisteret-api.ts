import { getRestStatus, RestRessurs, RestStatus } from './api-utils';

const ENHETSREGISTERET_URL = 'https://data.brreg.no/enhetsregisteret/api/';

export interface Underenhet {
    orgnr: string;
    overordnetEnhet: string;
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

export const hentInformasjonOmUnderenhet = async (orgnr: string): Promise<RestUnderenhet> => {
    const response = await fetch(ENHETSREGISTERET_URL + 'underenheter/' + orgnr);
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
                overordnetEnhet: responseJson.overordnetEnhet,
            },
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
