import React, { FunctionComponent } from 'react';
import { RestAltinnOrganisasjoner } from '../../../api/altinnorganisasjon-api';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { RestStatus } from '../../../api/api-utils';
import './OrganisasjonerMedTilgangListe.less';

interface Props {
    restOrganisasjonerForStatistikk: RestAltinnOrganisasjoner;
}

export const OrganisasjonerMedTilgangListe: FunctionComponent<Props> = ({
    restOrganisasjonerForStatistikk,
}) => {
    if (restOrganisasjonerForStatistikk.status !== RestStatus.Suksess) {
        return null;
    }
    return (
        <Ekspanderbartpanel
            border
            tittel="Disse virksomhetene har tilgang til Sykefraværsstatistikk"
            className="organisasjoner-med-tilgang-liste"
        >
            <ul
                className="organisasjoner-med-tilgang-liste__liste"
            >
                {restOrganisasjonerForStatistikk.data.map(org => (
                    <li
                        className="organisasjoner-med-tilgang-liste__listelement"

                        key={org.OrganizationNumber}
                    >{`${org.Name} (${org.OrganizationNumber})`}</li>
                ))}
            </ul>
        </Ekspanderbartpanel>
    );
};
