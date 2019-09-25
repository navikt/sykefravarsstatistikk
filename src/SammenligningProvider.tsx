import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import BASE_PATH from './server/paths';

export type Sammenligning = {
    kvartal: number;
    år: number;
    land: Sykefraværprosent;
};

export type Sykefraværprosent = {
    label: string;
    prosent: number;
};

const defaultSammenligning: Sammenligning = {
    kvartal: 1,
    år: 2019,
    land: {
        label: 'Norge',
        prosent: 0.0,
    },
};
const SYKEFRAVARPROSENT_PATH = `${BASE_PATH}/api/sykefravarprosent`;

export const SammenligningContext = React.createContext(defaultSammenligning);

export const SammenligningProvider: FunctionComponent = props => {
    const [sammenligningState, setSammenligningState] = useState<Sammenligning>(
        defaultSammenligning
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
            .then(json => setSammenligningState(json))
            .catch(console.log);
    }, [setSammenligningState]);

    return (
        <SammenligningContext.Provider value={sammenligningState}>
            {props.children}
        </SammenligningContext.Provider>
    );
};
