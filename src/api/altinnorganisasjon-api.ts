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

export const hentAltinnOrganisasjonerBrukerHarTilgangTil = async (): Promise<AltinnOrganisasjon[]> => {
    const respons = await fetch('/min-side-arbeidsgiver/api/organisasjoner');
    const restStatus: RestStatus = getRestStatus(respons.status);

    if (restStatus !== RestStatus.Suksess) {
        const error = {
            status: restStatus,
        };

        return Promise.reject(error);
    }
    return await respons.json();
};

export const hentAltinnOrganisasjonerDerBrukerHarTilgangTilStatistikk = async (): Promise<AltinnOrganisasjon[]> => {
    const respons = await fetch(`${BASE_PATH}/api/organisasjoner/statistikk`);
    const restStatus: RestStatus = getRestStatus(respons.status);

    if (restStatus !== RestStatus.Suksess) {
        const error = {
            status: restStatus,
        };

        return Promise.reject(error);
    }
    return await respons.json();
};

export const useRestOrganisasjoner = (): RestAltinnOrganisasjoner => {
    const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] = useState<
        RestAltinnOrganisasjoner
    >({
        status: RestStatus.LasterInn,
    });

    useEffect(() => {
        hentAltinnOrganisasjoner(
            hentAltinnOrganisasjonerBrukerHarTilgangTil
        ).then(altinnOrganisasjoner => setRestAltinnOrganisasjoner(altinnOrganisasjoner));
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
            hentAltinnOrganisasjonerDerBrukerHarTilgangTilStatistikk
        ).then(altinnOrganisasjoner => setRestAltinnOrganisasjoner(altinnOrganisasjoner));
    }, []);

    return restAltinnOrganisasjoner;
};

const hentAltinnOrganisasjoner = async (
    hentOrganisasjoner: () => Promise<AltinnOrganisasjon[]>
): Promise<RestRessurs<AltinnOrganisasjon[]>> => {
    try {
        const altinnOrganisasjoner = await hentOrganisasjoner();
        return {
            status: RestStatus.Suksess,
            data: altinnOrganisasjoner,
        };
    } catch (error) {
        Sentry.captureException(error);
        return { status: error.status || RestStatus.Feil };
    }
};
