import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import BASE_PATH from './server/paths';

export type Sykefraværprosent = {
    land: number;
};

const defaultSykefraværprosent: Sykefraværprosent = {
    land: 0.0,
};
const SYKEFRAVARPROSENT_PATH = `${BASE_PATH}/api/sykefravarprosent`;

export const SykefraværprosentContext = React.createContext(defaultSykefraværprosent);

export const SykefraværprosentProvider: FunctionComponent = props => {
    const [sykefraværState, setSykefraværState] = useState<Sykefraværprosent>(
        defaultSykefraværprosent
    );

    useEffect(() => {
        fetch(SYKEFRAVARPROSENT_PATH)
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
