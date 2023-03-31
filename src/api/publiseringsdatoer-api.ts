import { fetchMedFeilhåndtering, RestRessurs } from './api-utils';
import { BASE_PATH } from '../konstanter';
import { ÅrstallOgKvartal } from '../utils/sykefraværshistorikk-utils';

export type RestPubliseringsdatoer = RestRessurs<any>;

export interface Publiseringsdatoer {
    sistePubliseringsdato: string;
    nestePubliseringsdato: string;
    gjeldendePeriode: ÅrstallOgKvartal;
}

const publiseringsdatoerPath = `${BASE_PATH}/api/publiseringsdato`;

export const hentPubliseringsdatoer = async (): Promise<RestPubliseringsdatoer> => {
    return await fetchMedFeilhåndtering(publiseringsdatoerPath);
};
