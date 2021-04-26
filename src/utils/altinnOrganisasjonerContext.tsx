import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { hentAltinnOrganisasjoner, RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { RestStatus } from '../api/api-utils';
import { BASE_PATH } from '../konstanter';
import {getMiljø} from "./miljøUtils";

export const altinnOrganisasjonerContext = createContext<RestAltinnOrganisasjoner>({
    status: RestStatus.IkkeLastet,
});

export const AltinnOrganisasjonerProvider: FunctionComponent = (props) => {
    const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] = useState<
        RestAltinnOrganisasjoner
    >({
        status: RestStatus.LasterInn,
    });

    const host = 'dev-sbs' === getMiljø() ? 'https://min-side-arbeidsgiver.dev.nav.no' : '';

    useEffect(() => {
        hentAltinnOrganisasjoner(
            host+'/min-side-arbeidsgiver/api/organisasjoner'
        ).then((altinnOrganisasjoner) => setRestAltinnOrganisasjoner(altinnOrganisasjoner));
    }, []);

    const Provider = altinnOrganisasjonerContext.Provider;
    return <Provider value={restAltinnOrganisasjoner}>{props.children}</Provider>;
};

export const altinnOrganisasjonerMedTilgangTilStatistikkContext = createContext<
    RestAltinnOrganisasjoner
>({
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

    const Provider = altinnOrganisasjonerMedTilgangTilStatistikkContext.Provider;
    return <Provider value={restAltinnOrganisasjoner}>{props.children}</Provider>;
};
