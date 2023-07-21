import { useEffect, useState } from 'react';
import { RestStatus } from '../api/api-utils';
import {
    hentPubliseringsdatoer,
    Publiseringsdatoer,
    RestPubliseringsdatoer,
} from '../api/publiseringsdatoer-api';

export function usePubliseringsdatoer() {
    const [restPubliseringsdatoer, setRestPubliseringsdatoer] = useState<
        RestPubliseringsdatoer<Publiseringsdatoer>
    >({
        status: RestStatus.LasterInn,
    });

    useEffect(() => {
        hentPubliseringsdatoer<Publiseringsdatoer>().then(setRestPubliseringsdatoer);
    }, []);
    return restPubliseringsdatoer;
}
