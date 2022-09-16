import {getRestStatus, RestRessurs, RestStatus} from './api-utils';
import * as Sentry from '@sentry/browser';

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
  } catch (error: any) {
    if (error.status === RestStatus.Feil || !error.status) {
      Sentry.captureException(new Error('Feil ved kall til ' + url));
      return {status: RestStatus.Feil};
    }
    return {status: error.status};
  }
};
