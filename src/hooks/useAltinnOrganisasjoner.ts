import { useEffect, useState } from 'react';
import { hentAltinnOrganisasjoner, RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { RestStatus } from '../api/api-utils';
import { BASE_PATH } from '../konstanter';

export function useAltinnOrganisasjoner() {
    const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] =
        useState<RestAltinnOrganisasjoner>({
            status: RestStatus.LasterInn,
        });

    useEffect(() => {
        hentAltinnOrganisasjoner(`${BASE_PATH}/api/organisasjoner`).then(
            setRestAltinnOrganisasjoner
        );
    }, []);
    return restAltinnOrganisasjoner;
}
