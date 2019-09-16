import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';

export type Sykefraværprosent = {
    land: number;
};

const defaultSykefraværprosent: Sykefraværprosent = {
    land: 0.0,
};

export const SykefraværprosentContext = React.createContext(defaultSykefraværprosent);

export const SykefraværprosentProvider: FunctionComponent = props => {
    const [sykefraværState, setSykefraværState] = useState<Sykefraværprosent>(
        defaultSykefraværprosent
    );

    useEffect(() => {
        fetch('/api/sykefravarprosent')
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(response => response.json())
            .then(json => setSykefraværState(json))
            .catch(console.log);
    }, [setSykefraværState]);

    return (
        <SykefraværprosentContext.Provider value={sykefraværState}>
            {props.children}
        </SykefraværprosentContext.Provider>
    );
};
