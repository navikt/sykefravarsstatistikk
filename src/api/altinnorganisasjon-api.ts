import { getRestStatus, RestRessurs, RestStatus } from './api-utils';
import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/browser';
import { BASE_PATH } from '../server/konstanter';

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

const hentAltinnOrganisasjoner = async (
    url: string
): Promise<RestRessurs<AltinnOrganisasjon[]>> => {
    try {
        const altinnOrganisasjoner = await hentAltinnOrganisasjonerBrukerHarTilgangTil(url);
        return {
            status: RestStatus.Suksess,
            data: altinnOrganisasjoner,
        };
    } catch (error) {
        Sentry.captureException(error);
        return { status: error.status || RestStatus.Feil };
    }
};

export const useRestOrganisasjoner = (): RestAltinnOrganisasjoner => {
    const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] = useState<
        RestAltinnOrganisasjoner
    >({
        status: RestStatus.LasterInn,
    });

    useEffect(() => {
        hentAltinnOrganisasjoner(
            '/min-side-arbeidsgiver/api/organisasjoner'
        ).then((altinnOrganisasjoner) => setRestAltinnOrganisasjoner(altinnOrganisasjoner));
    }, []);

    return restAltinnOrganisasjoner;
};

export const useRestOrganisasjonerMedTilgangTilStatistikk = (): RestAltinnOrganisasjoner => {
    const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] = useState<
        RestAltinnOrganisasjoner
    >({
        status: RestStatus.LasterInn,
    });

    useEffect(() => {
        hentAltinnOrganisasjoner(
            `${BASE_PATH}/api/organisasjoner/statistikk`
        ).then((altinnOrganisasjoner) => setRestAltinnOrganisasjoner(altinnOrganisasjoner));
    }, []);

    return restAltinnOrganisasjoner;
};
