import * as React from 'react';
import './Forside.less';
import ManglerRettigheterIAltinnSide from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import Innloggingsside from '../Innloggingsside/Innloggingsside';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { RestStatus } from '../api/api-utils';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
}

const Forside: React.FunctionComponent<Props> = props => {
    switch (props.restSykefraværshistorikk.status) {
        case RestStatus.IngenTilgang: {
            return <ManglerRettigheterIAltinnSide />;
        }
        case RestStatus.IkkeInnlogget: {
            return <Innloggingsside />;
        }
        default: {
            return (
                <div className="forside__wrapper">
                    <div className="forside">{props.children}</div>
                </div>
            );
        }
    }
};

export default Forside;
