import { RestRessurs, RestStatus } from './api-utils';

export enum SykefraværshistorikkType {
    LAND = 'LAND',
    SEKTOR = 'SEKTOR',
    NÆRING = 'NÆRING',
    BRANSJE = 'BRANSJE',
    VIRKSOMHET = 'VIRKSOMHET',
    OVERORDNET_ENHET = 'OVERORDNET_ENHET',
}

export type KvartalsvisSykefraværsprosent = {
    kvartal: number;
    årstall: number;
} & Sykefraværsprosent;

export type Sykefraværsprosent =
    | {
          erMaskert: true;
          prosent: null;
          tapteDagsverk: null;
          muligeDagsverk: null;
      }
    | {
          erMaskert: false;
          prosent: number | undefined;
          tapteDagsverk: number | undefined;
          muligeDagsverk: number | undefined;
      };

export interface Sykefraværshistorikk {
    type: SykefraværshistorikkType;
    label: string;
    kvartalsvisSykefraværsprosent: KvartalsvisSykefraværsprosent[];
}

export enum SykefraværshistorikkFeil {
    FeilPgaIngenNæring = 'FeilPgaIngenNæring',
}

export type RestSykefraværshistorikkStatus = RestStatus | SykefraværshistorikkFeil;

export type RestSykefraværshistorikk =
    | RestRessurs<Sykefraværshistorikk[]>
    | {
          status: SykefraværshistorikkFeil.FeilPgaIngenNæring;
      };
