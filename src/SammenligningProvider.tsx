import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import BASE_PATH from './server/paths';
import { useOrgnr } from './orgnr-hook';

export type Sammenligning = {
    kvartal: number;
    år: number;
    land: Sykefraværprosent | null;
    sektor: Sykefraværprosent | null;
    næring: Sykefraværprosent | null;
    virksomhet: Sykefraværprosent | null;
};

export type Sykefraværprosent = {
    label: string;
    prosent: number | null;
    erMaskert?: boolean;
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
const sammenligningPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/sammenligning`;

export const SammenligningContext = React.createContext(defaultSammenligning);

export const SammenligningProvider: FunctionComponent = props => {
    const [sammenligningState, setSammenligningState] = useState<Sammenligning>(
        defaultSammenligning
    );
    const orgnr = useOrgnr();

    useEffect(() => {
        if (!orgnr) {
            return;
        }
        fetch(sammenligningPath(orgnr), { credentials: 'include' })
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
    }, [setSammenligningState, orgnr]);

    return (
        <SammenligningContext.Provider value={sammenligningState}>
            {props.children}
        </SammenligningContext.Provider>
    );
};
