import * as React from 'react';
import './Forside.less';
import Innloggingsside from '../Innloggingsside/Innloggingsside';
import { RestStatus } from '../api/api-utils';
import { ManglerRettighetRedirect } from '../utils/redirects';
import { AggregertStatistikkResponse } from '../hooks/useAggregertStatistikk';

interface Props {
    aggregertStatistikk: AggregertStatistikkResponse
}

const InnloggingssideWrapper: React.FunctionComponent<Props> = ({
    aggregertStatistikk,
    children,
}) => {
    switch (aggregertStatistikk.restStatus) {
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
