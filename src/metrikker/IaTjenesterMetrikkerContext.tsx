import React, { createContext, FunctionComponent, useState } from 'react';

export interface Virksomhet {
    orgnr: string;
}

export const iaTjenesterMetrikkerContext = createContext<{
    bedrifterSomHarSendtMetrikker: [Virksomhet];
    setBedrifterSomHarSendtMetrikker: (bedrifter: [Virksomhet]) => void;
}>({
    bedrifterSomHarSendtMetrikker: [{ orgnr: '' }],
    setBedrifterSomHarSendtMetrikker: () => {},
});

export const IaTjenesterMetrikkerContextProvider: FunctionComponent = (props) => {
    const [bedrifterSomHarSendtMetrikker, setBedrifterSomHarSendtMetrikker] = useState<
        [Virksomhet]
    >([{ orgnr: '' }]);

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
