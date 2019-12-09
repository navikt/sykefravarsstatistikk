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

export enum Status {
    'Suksess' ,
    'LasterInn',
    'Feil'
}

export type RestSammenligning = {
    status: Status,
    kode: number,
    sammenligning: Sammenligning
}

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

const defaultRestSammenligning: RestSammenligning = {
    status: Status.LasterInn,
    kode: 0,
    sammenligning: defaultSammenligning
};

const sammenligningPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/sammenligning`;

export const SammenligningContext = React.createContext(defaultSammenligning);
export const RestSammenligningContext = React.createContext(defaultRestSammenligning);

export const SammenligningProvider: FunctionComponent = props => {
    const [restSammenligningState, setRestSammenligningState] = useState<RestSammenligning>(
        defaultRestSammenligning
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
                    setRestSammenligningState(
                        {
                            status: Status.Feil,
                            kode: response.status,
                            sammenligning: defaultSammenligning
                        }
                    );
                    throw new Error(response.statusText);
                }
            })
            .then(response => response.json())
            .then(json => {
                setRestSammenligningState({
                    status: Status.Suksess,
                    kode: 200,
                    sammenligning: json
                })
            })
            .catch( (error) => {
                console.log(error);
            });
    }, [setRestSammenligningState, orgnr]);

    return (
        <RestSammenligningContext.Provider value={restSammenligningState}>
            {props.children}
        </RestSammenligningContext.Provider>
    );
};
