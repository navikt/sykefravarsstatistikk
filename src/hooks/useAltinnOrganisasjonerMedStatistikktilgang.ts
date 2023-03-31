import { useEffect, useState } from 'react';
import { hentAltinnOrganisasjoner, RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { RestStatus } from '../api/api-utils';
import { BASE_PATH } from '../konstanter';

export function useAltinnOrganisasjonerMedStatistikktilgang() {
    const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] =
        useState<RestAltinnOrganisasjoner>({
            status: RestStatus.LasterInn,
        });

    useEffect(() => {
        hentAltinnOrganisasjoner(`${BASE_PATH}/api/organisasjoner/statistikk`).then(
            (altinnOrganisasjoner) => setRestAltinnOrganisasjoner(altinnOrganisasjoner)
        );
    }, []);
    return restAltinnOrganisasjoner;
}
