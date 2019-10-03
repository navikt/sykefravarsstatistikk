import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import BASE_PATH from './server/paths';

export type Sammenligning = {
    kvartal: number;
    år: number;
    land: Sykefraværprosent;
    sektor: Sykefraværprosent;
    næring: Sykefraværprosent;
    virksomhet: Sykefraværprosent;
};

export type Sykefraværprosent = {
    label: string;
    prosent: number;
};

const defaultSykefraværprosent: Sykefraværprosent = {
    label: '', prosent: 0.0
};
const defaultSammenligning: Sammenligning = {
    kvartal: 1,
    år: 2019,
    land: {
        label: 'Norge',
        prosent: 0.0,
    },
    sektor: defaultSykefraværprosent,
    næring: defaultSykefraværprosent,
    virksomhet: defaultSykefraværprosent
};
const SAMMENLIGNING_PATH = `${BASE_PATH}/api/sammenligning`;

export const SammenligningContext = React.createContext(defaultSammenligning);

export const SammenligningProvider: FunctionComponent = props => {
    const [sammenligningState, setSammenligningState] = useState<Sammenligning>(
        defaultSammenligning
    );

    useEffect(() => {
        fetch(SAMMENLIGNING_PATH)
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
