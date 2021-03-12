import React, { createContext, FunctionComponent, useState } from 'react';

export const iaTjenesterMetrikkerContext = createContext<{
    harSendtMetrikk: boolean;
    setHarSendtMetrikk: (sendt: boolean) => void;
}>({
    harSendtMetrikk: false,
    setHarSendtMetrikk: (sendt) => {},
});

export const IaTjenesterMetrikkerContextProvider: FunctionComponent = (props) => {
    const [harSendtMetrikk, setHarSendtMetrikk] = useState<boolean>(false);

    const Provider = iaTjenesterMetrikkerContext.Provider;
    return (
        <Provider
            value={{
                harSendtMetrikk,
                setHarSendtMetrikk,
            }}
        >
            {props.children}
        </Provider>
    );
};
