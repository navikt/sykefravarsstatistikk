import { fetchMedFeilhåndtering, RestRessurs } from './api-utils';
import { BASE_PATH } from '../konstanter';
import { ÅrstallOgKvartal } from '../utils/sykefraværshistorikk-utils';

export type RestPubliseringsdatoer<T> = RestRessurs<T>;

export interface Publiseringsdatoer {
    sistePubliseringsdato: Date;
    nestePubliseringsdato: Date;
    gjeldendePeriode: ÅrstallOgKvartal;
}

const publiseringsdatoerPath = `${BASE_PATH}/api/publiseringsdato`;

export const hentPubliseringsdatoer = async <T>(): Promise<RestPubliseringsdatoer<T>> => {
    return await fetchMedFeilhåndtering(publiseringsdatoerPath);
};
