import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react';
import {hentOrganisasjonerOgGenererOrganisasjonstre,} from './organisasjonstre-utils';
import {RestOrganisasjonstre, RestStatus} from './organisasjonstre-api';
import IkkeInnloggetSide from "../FeilSider/IkkeInnloggetSide/IkkeInnloggetSide";

const defaultOrganisasjonstre: RestOrganisasjonstre = {
    status: RestStatus.LasterInn,
};

export const OrganisasjonstreContext = React.createContext<RestOrganisasjonstre>(
    defaultOrganisasjonstre
);

export const OrganisasjonstreProvider: FunctionComponent = props => {
    const [organisasjonstre, setOrganisasjonstre] = useState<RestOrganisasjonstre>(
        defaultOrganisasjonstre
    );

    useEffect(() => {
        hentOrganisasjonerOgGenererOrganisasjonstre().then(organisasjonstre =>
            setOrganisasjonstre(organisasjonstre)
        );
    }, []);

    if (!organisasjonstre) {
        return null;
    }

    if (organisasjonstre.status === RestStatus.IkkeInnlogget) {
        return (
            <IkkeInnloggetSide/>
        );
    } else {
        return (
            <OrganisasjonstreContext.Provider value={organisasjonstre}>
                {props.children}
            </OrganisasjonstreContext.Provider>
        );
    }
};
