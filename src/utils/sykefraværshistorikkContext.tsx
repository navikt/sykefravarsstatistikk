import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { RestStatus } from '../api/api-utils';
import { useOrgnr } from './orgnr-hook';
import { hentRestSykefraværshistorikk } from '../api/api';

export const sykefraværshistorikkContext = createContext<RestSykefraværshistorikk>({
    status: RestStatus.IkkeLastet,
});

export const SykefraværshistorikkProvider: FunctionComponent = (props) => {
    const orgnr = useOrgnr();
    const [restSykefraværshistorikk, setRestSykefraværshistorikk] = useState<
        RestSykefraværshistorikk
    >({ status: RestStatus.IkkeLastet });

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
