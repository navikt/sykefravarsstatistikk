import { createContext } from 'react';
import { RestStatus } from '../api/api-utils';
import { Enhetsregisterdata } from '../hooks/useEnheter';

export const enhetsregisteretContext = createContext<Enhetsregisterdata>({
    restUnderenhet: {
        status: RestStatus.IkkeLastet,
    },
    restOverordnetEnhet: {
        status: RestStatus.IkkeLastet,
    },
});
