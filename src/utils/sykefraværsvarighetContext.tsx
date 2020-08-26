import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import { useOrgnr } from './orgnr-hook';
import { hentRestSykefraværsvarighet } from '../api/api';
import { RestSykefraværsvarighet } from '../api/sykefraværsvarighet';

export const sykefraværsvarighetContext = createContext<RestSykefraværsvarighet>({
    status: RestStatus.IkkeLastet,
});

export const SykefraværsvarighetProvider: FunctionComponent = (props) => {
    const orgnr = useOrgnr();
    const [restSykefraværsvarighet, setRestSykefraværsvarighet] = useState<RestSykefraværsvarighet>(
        { status: RestStatus.IkkeLastet }
    );

    useEffect(() => {
        if (orgnr) {
            setRestSykefraværsvarighet({
                status: RestStatus.IkkeLastet,
            });
            const hentRestSykefraværsvarighetOgSettState = async () => {
                setRestSykefraværsvarighet(await hentRestSykefraværsvarighet(orgnr));
            };
            hentRestSykefraværsvarighetOgSettState();
        }
    }, [orgnr]);
    const Provider = sykefraværsvarighetContext.Provider;
    return <Provider value={restSykefraværsvarighet}>{props.children}</Provider>;
};
