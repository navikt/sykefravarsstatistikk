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

export enum RestSammenligningStatus {
    'Suksess' ,
    'LasterInn',
    'HarIkkeRettigheterIAltinn',
    'IkkeInnlogget',
    'Error'
}

export type RestSammenligning = {
    status: RestSammenligningStatus,
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
    status: RestSammenligningStatus.LasterInn,
    sammenligning: defaultSammenligning
};

const sammenligningPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/sammenligning`;

export const RestSammenligningContext = React.createContext(defaultRestSammenligning);

function getRestSammenligningStatus(responseStatus: number) : RestSammenligningStatus {
    switch (responseStatus) {
        case 200 : {
            return RestSammenligningStatus.Suksess;
        }
        case 401 : {
            return RestSammenligningStatus.IkkeInnlogget;
        }
        case 403 : {
            return RestSammenligningStatus.HarIkkeRettigheterIAltinn;
        }
        default: {
            return RestSammenligningStatus.Error;
        }
    }
}


export const SammenligningProvider: FunctionComponent = props => {
    const [restSammenligningState, setRestSammenligningState] = useState<RestSammenligning>(
        defaultRestSammenligning
    );

    const orgnr = useOrgnr();

    useEffect(() => {
        if (!orgnr) {
            return;
        }
        fetch(sammenligningPath(orgnr), {credentials: 'include'})
            .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        const restSammenligningStatus = getRestSammenligningStatus(response.status);
                        setRestSammenligningState(
                            {
                                status: restSammenligningStatus,
                                sammenligning: defaultSammenligning
                            }
                        );
                        throw new Error(response.statusText);
                    }
                }
            )
            .then(response => response.json())
            .then(json => {
                setRestSammenligningState({
                    status: RestSammenligningStatus.Suksess,
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
