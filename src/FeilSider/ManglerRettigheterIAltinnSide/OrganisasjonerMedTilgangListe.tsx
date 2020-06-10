import React, { FunctionComponent } from 'react';
import { RestAltinnOrganisasjoner } from '../../api/altinnorganisasjon-api';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
    restOrganisasjonerForStatistikk: RestAltinnOrganisasjoner;
}

export const OrganisasjonerMedTilgangListe: FunctionComponent<Props> = ({
    restOrganisasjonerForStatistikk,
}) => {
    return (
        <Ekspanderbartpanel border tittel="Disse virksomhetene har tilgang til Sykefraværsstatistikk">
            hei
        </Ekspanderbartpanel>
    );
};
