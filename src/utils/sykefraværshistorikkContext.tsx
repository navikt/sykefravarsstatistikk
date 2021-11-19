import React, { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import {
    hentRestSykefraværshistorikk,
    RestSykefraværshistorikk,
} from '../api/kvartalsvis-sykefraværshistorikk-api';
import { RestStatus } from '../api/api-utils';
import { orgnrContext } from '../App';

export const sykefraværshistorikkContext = createContext<RestSykefraværshistorikk>({
    status: RestStatus.IkkeLastet,
});

export const SykefraværshistorikkProvider: FunctionComponent = (props) => {
    const orgnr = useContext(orgnrContext);
    const [restSykefraværshistorikk, setRestSykefraværshistorikk] =
        useState<RestSykefraværshistorikk>({ status: RestStatus.IkkeLastet });

    useEffect(() => {
        if (orgnr) {
            setRestSykefraværshistorikk({
                status: RestStatus.IkkeLastet,
            });
            const hentRestSykefraværshistorikkOgSettState = async () => {
                setRestSykefraværshistorikk(await hentRestSykefraværshistorikk(orgnr));
            };
            hentRestSykefraværshistorikkOgSettState();
        }
    }, [orgnr]);
    const Provider = sykefraværshistorikkContext.Provider;
    return <Provider value={restSykefraværshistorikk}>{props.children}</Provider>;
};
