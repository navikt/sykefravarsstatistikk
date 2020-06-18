import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { hentAltinnOrganisasjoner, RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { RestStatus } from '../api/api-utils';
import { BASE_PATH } from '../konstanter';

export const altinnOrganisasjonerContext = createContext<RestAltinnOrganisasjoner>({
    status: RestStatus.IkkeLastet,
});

export const AltinnOrganisasjonerProvider: FunctionComponent = (props) => {
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

    const Provider = altinnOrganisasjonerContext.Provider;
    return <Provider value={restAltinnOrganisasjoner}>{props.children}</Provider>;
};


export const altinnOrganisasjonerMedTilgangTilStatistikkContext = createContext<RestAltinnOrganisasjoner>({
    status: RestStatus.IkkeLastet,
});

export const AltinnOrganisasjonerMedTilgangTilStatistikkProvider: FunctionComponent = (props) => {
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

    const Provider = altinnOrganisasjonerContext.Provider;
    return <Provider value={restAltinnOrganisasjoner}>{props.children}</Provider>;
};
