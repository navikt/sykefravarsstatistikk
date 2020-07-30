import * as React from 'react';
import { useEffect } from 'react';
import './Forside.less';
import ManglerRettigheterIAltinnSide from '../FeilSider/ManglerRettigheterIAltinnSide/ManglerRettigheterIAltinnSide';
import Innloggingsside from '../Innloggingsside/Innloggingsside';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { RestStatus } from '../api/api-utils';
import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { useOrgnr } from '../utils/orgnr-hook';
import { useSendEvent } from '../amplitude/amplitude';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

interface Props {
    restSykefraværshistorikk: RestSykefraværshistorikk;
    restOrganisasjonerMedStatistikk: RestAltinnOrganisasjoner;
}

const Forside: React.FunctionComponent<Props> = ({
    restSykefraværshistorikk,
    restOrganisasjonerMedStatistikk,
    children,
}) => {
    const orgnr = useOrgnr();
    const status = restSykefraværshistorikk.status;
    const sendEvent = useSendEvent();

    useEffect(() => {
        if (status === RestStatus.Suksess) {
            sendEvent('forside', 'vist');
        } else if (status === RestStatus.IngenTilgang) {
            sendEvent('forside', 'vist', {
                ingenTilgang: true,
            });
        }
    }, [orgnr, status, sendEvent]);
    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'My chart'
        },
        series: [
            {
                data: [1, 2, 1, 4, 3, 6]
            }
        ]
    };

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
            return (
                <div className="forside__wrapper">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                    <div className="forside">{children}</div>
                </div>
            );
        }
    }
};

export default Forside;
