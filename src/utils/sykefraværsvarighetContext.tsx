import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import { useOrgnr } from './orgnr-hook';
import { hentRestSummertSykefraværshistorikk } from '../api/api';
import { RestSummertSykefraværshistorikk } from '../api/sykefraværsvarighet';

export const sykefraværsvarighetContext = createContext<RestSummertSykefraværshistorikk>({
    status: RestStatus.IkkeLastet,
});

export const SykefraværsvarighetProvider: FunctionComponent = (props) => {
    const orgnr = useOrgnr();
    const [restSykefraværsvarighet, setRestSykefraværsvarighet] = useState<
        RestSummertSykefraværshistorikk
    >({ status: RestStatus.IkkeLastet });

    // TODO La være å hente varighet hvis det ikke er en barnehage?
    useEffect(() => {
        if (orgnr) {
            setRestSykefraværsvarighet({
                status: RestStatus.IkkeLastet,
            });
            const hentRestSykefraværsvarighetOgSettState = async () => {
                setRestSykefraværsvarighet(await hentRestSummertSykefraværshistorikk(orgnr));
            };
            hentRestSykefraværsvarighetOgSettState();
        }
    }, [orgnr]);
    const Provider = sykefraværsvarighetContext.Provider;
    return <Provider value={restSykefraværsvarighet}>{props.children}</Provider>;
};
