import { useContext, useEffect, useState } from 'react';
import { orgnrContext } from '../App';
import {
    hentRestSummertSykefraværshistorikk,
    RestSummertSykefraværshistorikk,
} from '../api/summert-sykefraværshistorikk-api';
import { RestStatus } from '../api/api-utils';

export function useSummertSykefravær() {
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
    return restSummertSykefraværshistorikk;
}
