import {
    AltinnOrganisasjon,
    hentOrganisasjonerOgGenererOrganisasjonstre,
    Organisasjon,
    Organisasjonstre,
} from './organisasjonstre-utils';
import { getRestStatus, RestRessurs, RestStatus } from '../api-utils';
import { useEffect, useState } from 'react';

export type RestOrganisasjonstre = RestRessurs<Organisasjonstre>;

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

export const useRestOrganisasjonstre = (): RestOrganisasjonstre => {
    const [restOrganisasjonstre, setRestOrganisasjonstre] = useState<RestOrganisasjonstre>({
        status: RestStatus.LasterInn,
    });

    useEffect(() => {
        hentOrganisasjonerOgGenererOrganisasjonstre().then(organisasjonstre =>
            setRestOrganisasjonstre(organisasjonstre)
        );
    }, []);

    return restOrganisasjonstre;
};
