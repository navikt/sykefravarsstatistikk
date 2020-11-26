import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import { useOrgnr } from './orgnr-hook';
import { hentRestSummertSykefraværshistorikk } from '../api/api';
import { RestSummertSykefraværshistorikk } from '../api/summertSykefravær';

export const summertSykefraværshistorikkContext = createContext<RestSummertSykefraværshistorikk>({
    status: RestStatus.IkkeLastet,
});

export const SummertSykefraværshistorikkProvider: FunctionComponent = (props) => {
    const orgnr = useOrgnr();
    const [restSummertSykefraværshistorikk, setRestSummertSykefraværshistorikk] = useState<
        RestSummertSykefraværshistorikk
    >({ status: RestStatus.IkkeLastet });

    // TODO La være å hente varighet hvis det ikke er en barnehage?
    useEffect(() => {
        if (orgnr) {
            setRestSummertSykefraværshistorikk({
                status: RestStatus.IkkeLastet,
            });
            const hentRestSykefraværsvarighetOgSettState = async () => {
                setRestSummertSykefraværshistorikk(
                    await hentRestSummertSykefraværshistorikk(orgnr)
                );
            };
            hentRestSykefraværsvarighetOgSettState();
        }
    }, [orgnr]);
    const Provider = summertSykefraværshistorikkContext.Provider;
    return <Provider value={restSummertSykefraværshistorikk}>{props.children}</Provider>;
};
