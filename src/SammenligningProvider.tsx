import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useOrgnr } from './orgnr-hook';
import { BASE_PATH } from './server/konstanter';

export type Sammenligning = {
    kvartal: number;
    årstall: number;
    land: Sykefraværprosent;
    sektor: Sykefraværprosent;
    næring: Sykefraværprosent;
    virksomhet: Sykefraværprosent;
};

export type Sykefraværprosent = {
    label: string;
    prosent: number | null;
    erMaskert?: boolean;
};

const defaultSykefraværprosent: Sykefraværprosent = {
    label: '',
    prosent: 0.0,
};
const defaultSammenligning: Sammenligning = {
    kvartal: 1,
    årstall: 2019,
    land: {
        label: 'Norge',
        prosent: 0.0,
    },
    sektor: defaultSykefraværprosent,
    næring: defaultSykefraværprosent,
    virksomhet: defaultSykefraværprosent,
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
