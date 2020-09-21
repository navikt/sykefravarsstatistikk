import { getRestStatus, RestRessurs, RestStatus } from './api-utils';

const ENHETSREGISTERET_URL = 'https://data.brreg.no/enhetsregisteret/api/';

export interface Underenhet {
    organisasjonsnummer: string;
    overordnetEnhet: string;
}
export interface OverordnetEnhet {
    organisasjonsnummer: string;
    institusjonellSektorkode: { kode: string; beskrivelse: string };
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
        return {
            status: restStatus,
            data: await response.json().then((data) => ({
                organisasjonsnummer: data.organisasjonsnummer,
                overordnetEnhet: data.overordnetEnhet,
            })),
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
        return {
            status: restStatus,
            data: await response.json().then((data) => ({
                organisasjonsnummer: data.organisasjonsnummer,
                institusjonellSektorkode: data.institusjonellSektorkode,
            })),
        };
    }
};
