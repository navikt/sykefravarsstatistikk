import * as React from 'react';
import './Forside.less';
import ManglerRettigheterIAltinnSide from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import Innloggingsside from '../Innloggingsside/Innloggingsside';
import { RestSykefraværshistorikk } from '../api/kvartalsvisSykefraværshistorikk';
import { RestStatus } from '../api/api-utils';
import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
    restOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
    redirectPath?: string;
}

const InnloggingssideWrapper: React.FunctionComponent<Props> = ({
    restSykefraværshistorikk,
    restOrganisasjonerMedStatistikk,
    redirectPath,
    children,
}) => {
    const status = restSykefraværshistorikk.status;
    switch (status) {
        case RestStatus.IngenTilgang: {
            return (
                <ManglerRettigheterIAltinnSide
                    restOrganisasjonerMedStatistikk={restOrganisasjonerMedStatistikk}
                />
            );
        }
        case RestStatus.IkkeInnlogget: {
            console.log('inside innlogginssidewrapper:');
            return <Innloggingsside redirectPath={redirectPath} />;
        }
        default: {
            return <>{children}</>;
        }
    }
};

export default InnloggingssideWrapper;
