import React, { createContext, FunctionComponent } from 'react';
import { RestStatus } from '../api/api-utils';
import { EnhetsregisteretState, useEnheter } from '../hooks/useEnheter';

export const enhetsregisteretContext = createContext<EnhetsregisteretState>({
    restUnderenhet: {
        status: RestStatus.IkkeLastet,
    },
    restOverordnetEnhet: {
        status: RestStatus.IkkeLastet,
    },
});

export const EnhetsregisteretProvider: FunctionComponent = (props) => {
    const { restOverordnetEnhet, restUnderenhet } = useEnheter();

    const Provider = enhetsregisteretContext.Provider;

    const contextValue: EnhetsregisteretState = {
        restUnderenhet,
        restOverordnetEnhet,
    };

    return <Provider value={contextValue}>{props.children}</Provider>;
};
