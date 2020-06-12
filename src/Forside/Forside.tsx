import * as React from 'react';
import './Forside.less';
import ManglerRettigheterIAltinnSide from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import Innloggingsside from '../Innloggingsside/Innloggingsside';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { RestStatus } from '../api/api-utils';
import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { sendEvent } from '../utils/amplitude';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
    restOrganisasjonerForStatistikk: RestAltinnOrganisasjoner;
}

const Forside: React.FunctionComponent<Props> = (props) => {
    switch (props.restSykefraværshistorikk.status) {
        case RestStatus.IngenTilgang: {
            sendEvent('forside', 'vist', {
                ingenTilgang: true,
            });
            return (
                <ManglerRettigheterIAltinnSide
                    restOrganisasjonerForStatistikk={props.restOrganisasjonerForStatistikk}
                />
            );
        }
        case RestStatus.IkkeInnlogget: {
            return <Innloggingsside />;
        }
        default: {
            sendEvent('forside', 'vist');
            return (
                <div className="forside__wrapper">
                    <div className="forside">{props.children}</div>
                </div>
            );
        }
    }
};

export default Forside;
