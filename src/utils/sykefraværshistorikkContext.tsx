import { createContext } from 'react';
import { RestSykefraværshistorikk } from '../api/kvartalsvis-sykefraværshistorikk-api';
import { RestStatus } from '../api/api-utils';

export const sykefraværshistorikkContext = createContext<RestSykefraværshistorikk>({
    status: RestStatus.IkkeLastet,
});
