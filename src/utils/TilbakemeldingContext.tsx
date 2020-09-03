import React, { createContext, FunctionComponent, useState } from 'react';
import { RestSykefraværsvarighet } from '../api/sykefraværsvarighet';
import { RestStatus } from '../api/api-utils';
import { sykefraværsvarighetContext } from './sykefraværsvarighetContext';

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
