import { RestRessurs } from './api-utils';

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
