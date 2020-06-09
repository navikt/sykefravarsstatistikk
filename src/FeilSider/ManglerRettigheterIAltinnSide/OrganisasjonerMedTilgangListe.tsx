import React, { FunctionComponent } from 'react';
import { RestAltinnOrganisasjoner } from '../../api/altinnorganisasjon-api';

interface Props {
    restOrganisasjonerForStatistikk?: RestAltinnOrganisasjoner;
}

export const OrganisasjonerMedTilgangListe: FunctionComponent<Props> = ({
    restOrganisasjonerForStatistikk,
}) => {
    return <div>hei</div>;
};
