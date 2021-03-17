import React, { createContext, FunctionComponent, useState } from 'react';

export const iaTjenesterMetrikkerContext = createContext<{
    bedrifterSomHarSendtMetrikker: [string];
    setBedrifterSomHarSendtMetrikker: (bedrifter: [string]) => void;
}>({
    bedrifterSomHarSendtMetrikker: [''],
    setBedrifterSomHarSendtMetrikker: (bedrifter) => {},
});

export const IaTjenesterMetrikkerContextProvider: FunctionComponent = (props) => {
    const [bedrifterSomHarSendtMetrikker, setBedrifterSomHarSendtMetrikker] = useState<[string]>(['']);

    const Provider = iaTjenesterMetrikkerContext.Provider;
    return (
        <Provider
            value={{
                bedrifterSomHarSendtMetrikker,
                setBedrifterSomHarSendtMetrikker,
            }}
        >
            {props.children}
        </Provider>
    );
};
