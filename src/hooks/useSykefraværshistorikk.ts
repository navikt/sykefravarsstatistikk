import { useContext, useEffect, useState } from 'react';
import { orgnrContext } from '../App';
import {
    hentRestSykefraværshistorikk,
    RestSykefraværshistorikk,
} from '../api/kvartalsvis-sykefraværshistorikk-api';
import { RestStatus } from '../api/api-utils';

export function useSykefraværshistorikk() {
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
    return restSykefraværshistorikk;
}
