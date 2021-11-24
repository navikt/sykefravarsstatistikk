import React from 'react';
import './Banner.less';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { RestStatus } from '../api/api-utils';
import { AltinnOrganisasjon, RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';

interface Props {
    tittel: string;
    restOrganisasjoner: RestAltinnOrganisasjoner;
}

const Banner: React.FunctionComponent<Props & RouteComponentProps> = (props) => {
    const { history, tittel, restOrganisasjoner } = props;
    let altinnOrganisasjoner: AltinnOrganisasjon[] =
        restOrganisasjoner.status === RestStatus.Suksess ? restOrganisasjoner.data : [];
    return (
        <Bedriftsmeny
            organisasjoner={altinnOrganisasjoner}
            sidetittel={tittel}
            history={history}
            onOrganisasjonChange={() => {}} // TODO: Lag en sendBedriftValgtEvent-metode
        />
    );
};

export default withRouter(Banner);
