import React, { createContext, FunctionComponent } from 'react';
import { RestStatus } from '../api/api-utils';
import { RestVirksomhetsdata } from '../api/virksomhetsdata-api';
import { useVirksomhetsdata } from '../hooks/useVirksomhetsdata';

export const virksomhetsdataContext = createContext<RestVirksomhetsdata>({
    status: RestStatus.IkkeLastet,
});

export const VirksomhetsdataProvider: FunctionComponent = (props) => {
    const restVirksomhetsdata = useVirksomhetsdata();

    const Provider = virksomhetsdataContext.Provider;
    return <Provider value={restVirksomhetsdata}>{props.children}</Provider>;
};
