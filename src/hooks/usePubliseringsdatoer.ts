import { useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import { hentPubliseringsdatoer, RestPubliseringsdatoer } from '../api/publiseringsdatoer-api';
import { ÅrstallOgKvartal } from '../utils/sykefraværshistorikk-utils';

export function usePubliseringsdatoer() {
    const [restPubliseringsdatoer, setRestPubliseringsdatoer] = useState<
        RestPubliseringsdatoer<{
            gjeldendePeriode: ÅrstallOgKvartal;
            sistePubliseringsdato: Date;
            nestePubliseringsdato: Date;
        }>
    >({
        status: RestStatus.LasterInn,
    });

    useEffect(() => {
        hentPubliseringsdatoer<{
            gjeldendePeriode: ÅrstallOgKvartal;
            sistePubliseringsdato: Date;
            nestePubliseringsdato: Date;
        }>().then(setRestPubliseringsdatoer);
    }, []);
    return restPubliseringsdatoer;
}
