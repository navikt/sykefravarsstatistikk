import React, { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import {
    hentRestSummertSykefraværshistorikk,
    RestSummertSykefraværshistorikk,
} from '../api/summert-sykefraværshistorikk-api';
import { orgnrContext } from '../App';

export const summertSykefraværshistorikkContext = createContext<RestSummertSykefraværshistorikk>({
    status: RestStatus.IkkeLastet,
});

export const SummertSykefraværshistorikkProvider: FunctionComponent = (props) => {
    const orgnr = useContext(orgnrContext);
    const [restSummertSykefraværshistorikk, setRestSummertSykefraværshistorikk] =
        useState<RestSummertSykefraværshistorikk>({ status: RestStatus.IkkeLastet });

    useEffect(() => {
        if (orgnr) {
            setRestSummertSykefraværshistorikk({
                status: RestStatus.IkkeLastet,
            });
            const hentRestSummertSykefraværshistorikkOgSettState = async () => {
                setRestSummertSykefraværshistorikk(
                    await hentRestSummertSykefraværshistorikk(orgnr)
                );
            };
            hentRestSummertSykefraværshistorikkOgSettState();
        }
    }, [orgnr]);
    const Provider = summertSykefraværshistorikkContext.Provider;
    return <Provider value={restSummertSykefraværshistorikk}>{props.children}</Provider>;
};
