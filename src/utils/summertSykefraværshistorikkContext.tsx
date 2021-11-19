import { createContext } from 'react';
import { RestStatus } from '../api/api-utils';
import { RestSummertSykefraværshistorikk } from '../api/summert-sykefraværshistorikk-api';

export const summertSykefraværshistorikkContext = createContext<RestSummertSykefraværshistorikk>({
    status: RestStatus.IkkeLastet,
});
