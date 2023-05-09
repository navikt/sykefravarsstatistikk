import React, { FunctionComponent } from 'react';
import { RestAltinnOrganisasjoner } from '../../../api/altinnorganisasjon-api';
import { RestStatus } from '../../../api/api-utils';
import './OrganisasjonerMedTilgangListe.less';
import { Accordion } from '@navikt/ds-react';

interface Props {
    restOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
}

export const OrganisasjonerMedTilgangListe: FunctionComponent<Props> = ({
    restOrganisasjonerMedStatistikk,
}) => {
    if (restOrganisasjonerMedStatistikk.status !== RestStatus.Suksess) {
        return null;
    }
    return (
        <Accordion className="organisasjoner-med-tilgang-liste">
            <Accordion.Item>
                <Accordion.Header>
                    Disse virksomhetene har tilgang til sykefraværsstatistikk
                </Accordion.Header>
                <Accordion.Content>
                    <ul className="organisasjoner-med-tilgang-liste__liste">
                        {restOrganisasjonerMedStatistikk.data.map((org) => (
                            <li
                                className="organisasjoner-med-tilgang-liste__listeelement"
                                key={org.OrganizationNumber}
                            >
                                {`${org.Name} (${org.OrganizationNumber})`}
                            </li>
                        ))}
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
