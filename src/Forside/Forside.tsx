import * as React from 'react';
import { useEffect } from 'react';
import './Forside.less';
import ManglerRettigheterIAltinnSide from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import Innloggingsside from '../Innloggingsside/Innloggingsside';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { RestStatus } from '../api/api-utils';
import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useOrgnr } from '../utils/orgnr-hook';
import { useSendEvent } from '../utils/amplitude';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
    restOrganisasjonerForStatistikk: RestAltinnOrganisasjoner;
}

const Forside: React.FunctionComponent<Props> = ({
    restSykefraværshistorikk,
    restOrganisasjonerForStatistikk,
    children,
}) => {
    const orgnr = useOrgnr();
    const status = restSykefraværshistorikk.status;
    const sendEvent = useSendEvent();

    useEffect(() => {
        if (status === RestStatus.Suksess) {
            console.log('sender event');
            sendEvent('forside', 'vist');
        } else if (status === RestStatus.IngenTilgang) {
            sendEvent('forside', 'vist', {
                ingenTilgang: true,
            });
        }
    }, [orgnr, status]);

    switch (status) {
        case RestStatus.IngenTilgang: {
            return (
                <ManglerRettigheterIAltinnSide
                    restOrganisasjonerForStatistikk={restOrganisasjonerForStatistikk}
                />
            );
        }
        case RestStatus.IkkeInnlogget: {
            return <Innloggingsside />;
        }
        default: {
            return (
                <div className="forside__wrapper">
                    <div className="forside">{children}</div>
                </div>
            );
        }
    }
};

export default Forside;
