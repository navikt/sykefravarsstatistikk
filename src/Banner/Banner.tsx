import React from 'react';
import './Banner.less';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { AltinnOrganisasjon } from '../api/organisasjonstre/organisasjonstre-utils';
import { RestStatus } from '../api/api-utils';
import { RestAltinnOrganisasjoner } from '../api/organisasjonstre/organisasjonstre-api';

interface Props {
    tittel: string;
    restOrganisasjoner: RestAltinnOrganisasjoner;
}

const Banner: React.FunctionComponent<Props & RouteComponentProps> = props => {
    const { history, tittel, restOrganisasjoner } = props;
    let altinnOrganisasjoner: AltinnOrganisasjon[] =
        restOrganisasjoner.status === RestStatus.Suksess ? restOrganisasjoner.data : [];
    console.log(altinnOrganisasjoner);
    return (
        <Bedriftsmeny
            organisasjoner={altinnOrganisasjoner}
            sidetittel={tittel}
            history={history}
            onOrganisasjonChange={() => {}}
        />
    );
};

export default withRouter(Banner);
