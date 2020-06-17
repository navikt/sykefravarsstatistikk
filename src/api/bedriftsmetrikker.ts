import { RestRessurs } from './api-utils';
import { Sykefraværsprosent } from './sykefraværshistorikk';

export type Næringskode5Siffer = {
    kode: string;
    beskrivelse: string;
};

export interface Bedriftsmetrikker {
    næringskode5Siffer: Næringskode5Siffer;
    bransje: string;
    antallAnsatte: number;
}

export type RestBedriftsmetrikker = RestRessurs<Bedriftsmetrikker>;
