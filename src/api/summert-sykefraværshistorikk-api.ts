import {fetchMedFeilhåndtering, RestRessurs} from './api-utils';
import {ÅrstallOgKvartal} from '../utils/sykefraværshistorikk-utils';
import {BASE_PATH} from '../konstanter';

export enum Statistikkategori {
  LAND = 'LAND',
  SEKTOR = 'SEKTOR',
  NÆRING = 'NÆRING',
  BRANSJE = 'BRANSJE',
  VIRKSOMHET = 'VIRKSOMHET',
  OVERORDNET_ENHET = 'OVERORDNET_ENHET',
  NÆRING2SIFFER = 'NÆRING2SIFFER',
  NÆRING5SIFFER = 'NÆRING5SIFFER',
}

export interface SummertSykefraværshistorikk {
  type: Statistikkategori;
  label: string;
  summertKorttidsOgLangtidsfravær: SummertKorttidsOgLangtidsfravær;
  summertGradertFravær: SummertSykefravær;
}

export interface SummertSykefravær {
  prosent: number | null;
  tapteDagsverk: number | null;
  muligeDagsverk: number | null;
  kvartaler: ÅrstallOgKvartal[];
  erMaskert: boolean;
}

export interface SummertKorttidsOgLangtidsfravær {
  summertKorttidsfravær: SummertSykefravær;
  summertLangtidsfravær: SummertSykefravær;
}

export const erMaskert = (summertKorttidsOgLangtidsfravær: SummertKorttidsOgLangtidsfravær) => {
  return summertKorttidsOgLangtidsfravær.summertLangtidsfravær.erMaskert;
};

export type RestSummertSykefraværshistorikk = RestRessurs<SummertSykefraværshistorikk[]>;

const summertSykefraværshistorikkPath = (orgnr: string) =>
    `${BASE_PATH}/api/${orgnr}/sykefravarshistorikk/summert?antallKvartaler=4`;

export const hentRestSummertSykefraværshistorikk = async (
    orgnr: string,
): Promise<RestSummertSykefraværshistorikk> => {
  return await fetchMedFeilhåndtering<SummertSykefraværshistorikk[]>(summertSykefraværshistorikkPath(orgnr), {
    method: 'GET',
    credentials: 'include',
  });
};
