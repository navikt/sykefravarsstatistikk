import { createContext } from 'react';
import { RestStatus } from '../api/api-utils';
import { EnhetsregisteretState } from '../hooks/useEnheter';

export const enhetsregisteretContext = createContext<EnhetsregisteretState>({
    restUnderenhet: {
        status: RestStatus.IkkeLastet,
    },
    restOverordnetEnhet: {
        status: RestStatus.IkkeLastet,
    },
});
