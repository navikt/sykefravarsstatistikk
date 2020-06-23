import { RestRessurs, RestStatus } from './api-utils';
import { useEffect, useState } from 'react';
import { hentRestSykefraværshistorikk } from './api';

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

export type RestSykefraværshistorikk = RestRessurs<Sykefraværshistorikk[]>;
