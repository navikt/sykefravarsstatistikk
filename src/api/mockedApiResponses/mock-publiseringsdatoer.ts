import { Publiseringsdatoer } from '../publiseringsdatoer-api';

export function getMockPubliseringsdatoer(): Publiseringsdatoer {
    return {
        gjeldendePeriode: {
            årstall: 2022,
            kvartal: 2,
        },
        nestePubliseringsdato: '2022-12-01',
        sistePubliseringsdato: '2022-09-08',
    };
}
