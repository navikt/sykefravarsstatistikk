import {fetchMedFeilhåndtering, RestRessurs} from './api-utils';
import {BASE_PATH} from '../konstanter';
import {ArbeidsmiljøportalenBransje} from '../utils/bransje-utils';

export type Næringskode5Siffer = {
  kode: string;
  beskrivelse: string;
};

export interface Virksomhetsdata {
  næringskode5Siffer: Næringskode5Siffer;
  bransje?: ArbeidsmiljøportalenBransje;
  antallAnsatte: number;
}

export type RestVirksomhetsdata = RestRessurs<Virksomhetsdata>;

const virksomhetsdataPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/bedriftsmetrikker`;

export const hentRestvirksomhetsdata = async (
    orgnr: string,
): Promise<RestVirksomhetsdata> => {
  return await fetchMedFeilhåndtering<Virksomhetsdata>(virksomhetsdataPath(orgnr), {
    method: 'GET',
    credentials: 'include',
  });
};
