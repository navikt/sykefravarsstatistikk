import React, { createContext, FunctionComponent, useState } from 'react';

export const tilbakemeldingContext = createContext<{
    harSendtTilbakemelding: boolean;
    setHarSendtTilbakemelding: (sendt: boolean) => void;
}>({
    harSendtTilbakemelding: false,
    setHarSendtTilbakemelding: (sendt) => {},
});

export const TilbakemeldingContextProvider: FunctionComponent = (props) => {
    const [harSendtTilbakemelding, setHarSendtTilbakemelding] = useState<boolean>(false);

    const Provider = tilbakemeldingContext.Provider;
    return (
        <Provider
            value={{
                harSendtTilbakemelding,
                setHarSendtTilbakemelding,
            }}
        >
            {props.children}
        </Provider>
    );
};
