import { createContext } from 'react';
import { RestStatus } from '../api/api-utils';
import { RestVirksomhetsdata } from '../api/virksomhetsdata-api';

export const virksomhetsdataContext = createContext<RestVirksomhetsdata>({
    status: RestStatus.IkkeLastet,
});
