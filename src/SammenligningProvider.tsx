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

// TODO: opprett type Sammenligning???
export interface SammenligningInterface {
    kvartal: number;
    årstall: number;
    land: Sykefraværprosent;
    sektor: Sykefraværprosent;
    næring: Sykefraværprosent;
    virksomhet: Sykefraværprosent;
};


export enum Status {
    'Suksess' ,
    'LasterInn',
    'Feil'
}

interface Suksess<T> {
    status: Status.Suksess;
    data: T;
}

interface Feil<T> {
    status: Status.Feil;
    kode: Number;
    data: T;
}

interface LasterInn<T> {
    status: Status.LasterInn;
    data: T;
}

type Nettressurs<T> = LasterInn<T> | Feil<T> | Suksess<T>;
//export type RestSammenligning = Nettressurs<Sammenligning>;
export type RestSammenligning = {
    status: Status,
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
const defaultRestSammenligning: RestSammenligning = {status: Status.LasterInn, sammenligning: defaultSammenligning};

const sammenligningPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/sammenligning`;

export const SammenligningContext = React.createContext(defaultSammenligning);
export const RestSammenligningContext = React.createContext(defaultRestSammenligning);

export const SammenligningProvider: FunctionComponent = props => {
    const [sammenligningState, setSammenligningState] = useState<Sammenligning>(
        defaultSammenligning
    );
    const [restSammenligningState, setRestSammenligningState] = useState<RestSammenligning>(
        {
            status: Status.LasterInn,
            sammenligning: defaultSammenligning
        }
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
                    setRestSammenligningState(
                        {
                            status: Status.Feil,
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
                    sammenligning: json
                })
                setSammenligningState(json);
            })
            .catch( (error) => {
                console.log(error);
            });
    }, [setSammenligningState, orgnr]);

    return (
        /*
        <SammenligningContext.Provider value={sammenligningState}>
            {props.children}
        </SammenligningContext.Provider>*/
        <RestSammenligningContext.Provider value={restSammenligningState}>
            {props.children}
        </RestSammenligningContext.Provider>
    );
};
