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
const sammenligningPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/sammenligning`;

export const SammenligningContext = React.createContext(defaultSammenligning);

const hentOrgnrFraUrl = (): string => {
    const bedriftQuery = window.location.search.substr(1)
        .split("&")
        .find(str => str.startsWith("bedrift"));
    if (bedriftQuery) {
        const orgnr = bedriftQuery.split("=")[1];
        return orgnr || "";
    }
    return "";
};

export const SammenligningProvider: FunctionComponent = props => {
    const [sammenligningState, setSammenligningState] = useState<Sammenligning>(
        defaultSammenligning
    );
    const orgnr = hentOrgnrFraUrl();

    useEffect(() => {
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
