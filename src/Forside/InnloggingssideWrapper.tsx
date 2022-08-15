import * as React from 'react';
import './Forside.less';
import Innloggingsside from '../Innloggingsside/Innloggingsside';
import { RestSykefraværshistorikk } from '../api/kvartalsvis-sykefraværshistorikk-api';
import { RestStatus } from '../api/api-utils';
import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { ManglerRettighetRedirect } from '../utils/redirects';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
    restOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
}

const InnloggingssideWrapper: React.FunctionComponent<Props> = ({
    restSykefraværshistorikk,
    children,
}) => {
    const status = restSykefraværshistorikk.status;
    switch (status) {
        case RestStatus.IngenTilgang: {
            return (
                <ManglerRettighetRedirect/>
            );
        }
        case RestStatus.IkkeInnlogget: {
            return <Innloggingsside redirectUrl={window.location.href} />;        }
        default: {
            return <>{children}</>;
        }
    }
};

export default InnloggingssideWrapper;
