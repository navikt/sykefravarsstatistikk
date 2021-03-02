import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import { useOrgnr } from './orgnr-hook';
import { hentRestSummertSykefraværshistorikk, sendIATjenesteMetrikker } from '../api/api';
import { RestSummertSykefraværshistorikk } from '../api/summertSykefraværshistorikk';

export const summertSykefraværshistorikkContext = createContext<RestSummertSykefraværshistorikk>({
    status: RestStatus.IkkeLastet,
});

export const SummertSykefraværshistorikkProvider: FunctionComponent = (props) => {
    const orgnr = useOrgnr();
    const [
        restSummertSykefraværshistorikk,
        setRestSummertSykefraværshistorikk,
    ] = useState<RestSummertSykefraværshistorikk>({ status: RestStatus.IkkeLastet });

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

            console.log('status', sendIATjenesteMetrikker());
        }
    }, [orgnr]);
    const Provider = summertSykefraværshistorikkContext.Provider;
    return <Provider value={restSummertSykefraværshistorikk}>{props.children}</Provider>;
};
