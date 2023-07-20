import { Publiseringsdatoer } from '../publiseringsdatoer-api';

export function getMockPubliseringsdatoer(): Publiseringsdatoer {
    return {
        gjeldendePeriode: {
            årstall: 2022,
            kvartal: 2,
        },
        nestePubliseringsdato: new Date('2022-12-01'),
        sistePubliseringsdato: new Date('2022-09-08'),
    };
}
