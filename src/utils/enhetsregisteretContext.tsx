import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestRessurs, RestStatus } from '../api/api-utils';
import { useOrgnr } from './orgnr-hook';
import {
    hentInformasjonOmOverordnetEnhet,
    hentInformasjonOmUnderenhet,
    OverordnetEnhet,
    RestOverordnetEnhet,
    RestUnderenhet,
    Underenhet,
} from '../api/enhetsregisteret-api';

export interface EnhetsregisteretState {
    restUnderenhet: RestUnderenhet;
    restOverordnetEnhet: RestOverordnetEnhet;
}

export const enhetsregisteretContext = createContext<EnhetsregisteretState>({
    restUnderenhet: {
        status: RestStatus.IkkeLastet,
    },
    restOverordnetEnhet: {
        status: RestStatus.IkkeLastet,
    },
});

interface DataForVirksomhet<T> {
    orgnr: string;
    restData: RestRessurs<T>;
}

export const useRestDataForFlereVirksomheter = <T extends Object>(
    hentData: (orgnr: string) => Promise<RestRessurs<T>>,
    orgnr: string | undefined
): [RestRessurs<T>, DataForVirksomhet<T>[]] => {
    const [gjeldendeData, setGjeldendeData] = useState<RestRessurs<T>>({
        status: RestStatus.IkkeLastet,
    });

    const [dataForAlleVirksomheter, setDataForAlleVirksomheter] = useState<DataForVirksomhet<T>[]>(
        []
    );

    useEffect(() => {
        if (orgnr) {
            const dataOmGjeldendeVirksomhet = dataForAlleVirksomheter.find(
                (data) => data.orgnr === orgnr
            );

            if (dataOmGjeldendeVirksomhet) {
                setGjeldendeData(dataOmGjeldendeVirksomhet.restData);
            } else {
                setGjeldendeData({
                    status: RestStatus.IkkeLastet,
                });
                const hentRestDataOgSetState = async () => {
                    const restData = await hentData(orgnr);
                    setGjeldendeData(restData);
                    setDataForAlleVirksomheter([
                        ...dataForAlleVirksomheter,
                        {
                            orgnr: orgnr,
                            restData: restData,
                        },
                    ]);
                };
                hentRestDataOgSetState();
            }
        }
    }, [orgnr, dataForAlleVirksomheter, hentData]);

    return [gjeldendeData, dataForAlleVirksomheter];
};

export const EnhetsregisteretProvider: FunctionComponent = (props) => {
    const underenhetOrgnr = useOrgnr();

    const [gjeldendeUnderenhet] = useRestDataForFlereVirksomheter<Underenhet>(
        hentInformasjonOmUnderenhet,
        underenhetOrgnr
    );
    const [gjeldendeOverordnetEnhet] = useRestDataForFlereVirksomheter<OverordnetEnhet>(
        hentInformasjonOmOverordnetEnhet,
        gjeldendeUnderenhet.status === RestStatus.Suksess
            ? gjeldendeUnderenhet.data.overordnetEnhet
            : undefined
    );

    const Provider = enhetsregisteretContext.Provider;

    const contextValue: EnhetsregisteretState = {
        restUnderenhet: gjeldendeUnderenhet,
        restOverordnetEnhet: gjeldendeOverordnetEnhet,
    };

    return <Provider value={contextValue}>{props.children}</Provider>;
};
