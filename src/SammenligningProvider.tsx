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
                    console.log('Status=', response.status);
                    const errorSammenligning: Sammenligning = {
                        kvartal: 4,
                        årstall: 2018,
                        land: {
                            label: 'NOT AVAILABLE',
                            prosent: 0.0,
                        },
                        sektor: defaultSykefraværprosent,
                        næring: defaultSykefraværprosent,
                        virksomhet: defaultSykefraværprosent,
                    };
                    setSammenligningState(errorSammenligning);
                    throw new Error(response.statusText);
                }
            })
            .then(response => response.json())
            .then(json => setSammenligningState(json))
            .catch( (error) => {
                console.log(error);
            });
    }, [setSammenligningState, orgnr]);

    return (
        <SammenligningContext.Provider value={sammenligningState}>
            {props.children}
        </SammenligningContext.Provider>
    );
};
