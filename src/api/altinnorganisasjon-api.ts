import { getRestStatus, RestRessurs, RestStatus } from './api-utils';
import { faro, LogLevel } from '@grafana/faro-web-sdk';

export type RestAltinnOrganisasjoner = RestRessurs<AltinnOrganisasjon[]>;

export interface AltinnOrganisasjon {
    Name: string;
    Type: string;
    OrganizationNumber: string;
    OrganizationForm: string;
    Status: string;
    ParentOrganizationNumber: string;
}

const hentAltinnOrganisasjonerBrukerHarTilgangTil = async (
    url: string
): Promise<AltinnOrganisasjon[]> => {
    const respons = await fetch(url);
    const restStatus: RestStatus = getRestStatus(respons.status);

    if (restStatus !== RestStatus.Suksess) {
        const error = {
            status: restStatus,
        };

        return Promise.reject(error);
    }
    return await respons.json();
};

export const hentAltinnOrganisasjoner = async (
    url: string
): Promise<RestRessurs<AltinnOrganisasjon[]>> => {
    try {
        const altinnOrganisasjoner = await hentAltinnOrganisasjonerBrukerHarTilgangTil(url);
        return {
            status: RestStatus.Suksess,
            data: altinnOrganisasjoner,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.status === RestStatus.Feil || !error.status) {
            faro.api?.pushLog(['Feil ved kall til Altinn for henting av organisasjoner'], {
                level: LogLevel.ERROR,
            });
            return { status: RestStatus.Feil };
        }
        return { status: error.status };
    }
};
