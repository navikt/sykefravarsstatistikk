import React from 'react';
import './Banner.less';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { JuridiskEnhetMedUnderEnheterArray } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { AltinnOrganisasjon, Organisasjon, Organisasjonstre } from '../api/organisasjonstre/organisasjonstre-utils';
import { RestStatus } from '../api/api-utils';
import { RestOrganisasjonstre } from '../api/organisasjonstre/organisasjonstre-api';

interface Props {
    tittel: string;
    restOrganisasjonstre: RestOrganisasjonstre;
}

const mapTilAltinnOrganisasjon = (organisasjon: Organisasjon): AltinnOrganisasjon => {
    return {
        Name: organisasjon.navn,
        Type: 'UNKNOWN_TYPE',
        OrganizationNumber: organisasjon.orgnr,
        OrganizationForm: 'UNKNOWN_FORM',
        Status: 'UNKNOWN_STATUS',
        ParentOrganizationNumber: 'UNKNOWN NUMBER',
    };
};

const mapTilJuridiskEnhetMedUnderEnheterArray = (
    organisasjonstre: Organisasjonstre
): JuridiskEnhetMedUnderEnheterArray[] => {
    return organisasjonstre.map(juridiskEnhetMedUnderenheter => {
        return {
            JuridiskEnhet: mapTilAltinnOrganisasjon(juridiskEnhetMedUnderenheter.juridiskEnhet),
            Underenheter: juridiskEnhetMedUnderenheter.underenheter.map(org =>
                mapTilAltinnOrganisasjon(org)
            ),
        } as JuridiskEnhetMedUnderEnheterArray;
    });
};

const Banner: React.FunctionComponent<Props & RouteComponentProps> = props => {
    const { history, restOrganisasjonstre, tittel } = props;
    let organisasjonstre: Organisasjonstre =
        restOrganisasjonstre.status === RestStatus.Suksess ? restOrganisasjonstre.data : [];
    return (
        <Bedriftsmeny
            sidetittel={tittel}
            history={history}
            onOrganisasjonChange={() => {}}
            organisasjonstre={mapTilJuridiskEnhetMedUnderEnheterArray(organisasjonstre)}
        />
    );
};

export default withRouter(Banner);
