import * as React from 'react';
import './Forside.less';
import ManglerRettigheterIAltinnSide from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import Innloggingsside from '../Innloggingsside/Innloggingsside';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { RestStatus } from '../api/api-utils';
import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { Forside } from './Forside';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
    restOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
}

const ForsideWrapper: React.FunctionComponent<Props> = ({
    restSykefraværshistorikk,
    restOrganisasjonerMedStatistikk,
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
            return <Innloggingsside />;
        }
        default: {
            return <Forside>{children}</Forside>;
        }
    }
};

export default ForsideWrapper;
