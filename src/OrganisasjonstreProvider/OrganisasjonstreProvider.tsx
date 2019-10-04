import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import {
    hentOrganisasjonerOgGenererOrganisasjonstre,
    Organisasjonstre,
} from './organisasjonstre-utils';

const defaultOrganisasjonstre: Organisasjonstre = [];

export const OrganisasjonstreContext = React.createContext<Organisasjonstre>(
    defaultOrganisasjonstre
);

export const OrganisasjonstreProvider: FunctionComponent = props => {
    const [organisasjonstre, setOrganisasjonstre] = useState<Organisasjonstre>(
        defaultOrganisasjonstre
    );

    useEffect(() => {
        hentOrganisasjonerOgGenererOrganisasjonstre().then(organisasjonstre =>
        {setOrganisasjonstre(organisasjonstre); console.log(organisasjonstre)}
        );
    }, []);

    return (
        <OrganisasjonstreContext.Provider value={organisasjonstre}>
            {props.children}
        </OrganisasjonstreContext.Provider>
    );
};
