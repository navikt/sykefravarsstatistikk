import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import { useOrgnr } from './orgnr-hook';
import {
    hentInformasjonOmOverordnetEnhet,
    hentInformasjonOmUnderenhet,
    RestOverordnetEnhet,
    RestUnderenhet,
} from '../api/enhetsregisteret-api';

interface EnhetsregisteretState {
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

type UnderenheterState = {
    orgnr: string;
    restUnderenhet: RestUnderenhet;
}[];

type OverordnetEnhetState = {
    orgnr: string;
    restOverordnetEnhet: RestOverordnetEnhet;
}[];

export const EnhetsregisteretProvider: FunctionComponent = (props) => {
    const orgnr = useOrgnr();

    const [gjeldendeUnderenhet, setGjeldendeUnderenhet] = useState<RestUnderenhet>({
        status: RestStatus.IkkeLastet,
    });

    const [underenheter, setUnderenheter] = useState<UnderenheterState>([]);

    const [gjeldendeOverordnetEnhet, setGjeldendeOverordnetEnhet] = useState<RestOverordnetEnhet>({
        status: RestStatus.IkkeLastet,
    });

    const [overordnedeEnheter, setOverordnedeEnheter] = useState<OverordnetEnhetState>([]);

    useEffect(() => {
        if (orgnr) {
            const infoOmUnderenhet = underenheter.find((enhet) => enhet.orgnr === orgnr);

            if (infoOmUnderenhet) {
                setGjeldendeUnderenhet(infoOmUnderenhet.restUnderenhet);
            } else {
                setGjeldendeUnderenhet({
                    status: RestStatus.IkkeLastet,
                });
                const hentRestUnderenhetOgSetState = async () => {
                    const restUnderenhet = await hentInformasjonOmUnderenhet(orgnr);
                    setGjeldendeUnderenhet(restUnderenhet);
                    setUnderenheter([
                        ...underenheter,
                        {
                            orgnr: orgnr,
                            restUnderenhet: restUnderenhet,
                        },
                    ]);
                };
                hentRestUnderenhetOgSetState();
            }
        }
    }, [orgnr, underenheter]);

    useEffect(() => {
        if (orgnr) {
            const infoOmOverordnetEnhet = overordnedeEnheter.find((enhet) => enhet.orgnr === orgnr);

            if (infoOmOverordnetEnhet) {
                setGjeldendeOverordnetEnhet(infoOmOverordnetEnhet.restOverordnetEnhet);
            } else {
                setGjeldendeOverordnetEnhet({
                    status: RestStatus.IkkeLastet,
                });
                const hentRestOverordnetEnhetOgSetState = async () => {
                    const restOverordnetEnhet = await hentInformasjonOmOverordnetEnhet(orgnr);
                    setGjeldendeOverordnetEnhet(restOverordnetEnhet);
                    setOverordnedeEnheter([
                        ...overordnedeEnheter,
                        {
                            orgnr: orgnr,
                            restOverordnetEnhet: restOverordnetEnhet,
                        },
                    ]);
                };
                hentRestOverordnetEnhetOgSetState();
            }
        }
    }, [orgnr, overordnedeEnheter]);

    const Provider = enhetsregisteretContext.Provider;

    const contextValue: EnhetsregisteretState = {
        restUnderenhet: gjeldendeUnderenhet,
        restOverordnetEnhet: gjeldendeOverordnetEnhet,
    };
    return <Provider value={contextValue}>{props.children}</Provider>;
};
