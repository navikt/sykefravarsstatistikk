import React from 'react';
import './Banner.less';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { RestStatus } from '../api/api-utils';
import { AltinnOrganisasjon, RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useSendEvent } from '../amplitude/amplitude';

interface Props {
    tittel: string;
    restOrganisasjoner: RestAltinnOrganisasjoner;
}

const Banner: React.FunctionComponent<Props & RouteComponentProps> = (props) => {
    const sendEvent = useSendEvent();

    const { history, tittel, restOrganisasjoner } = props;
    let altinnOrganisasjoner: AltinnOrganisasjon[] =
        restOrganisasjoner.status === RestStatus.Suksess ? restOrganisasjoner.data : [];
    return (
        <Bedriftsmeny
            organisasjoner={altinnOrganisasjoner}
            sidetittel={tittel}
            history={history}
            onOrganisasjonChange={() => sendEvent('banner', 'bedrift valgt')}
        />
    );
};

export default withRouter(Banner);
