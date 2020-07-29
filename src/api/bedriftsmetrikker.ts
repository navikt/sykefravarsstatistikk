import { RestRessurs } from './api-utils';

export type Næringskode5Siffer = {
    kode: string;
    beskrivelse: string;
};

export enum Bransjetype {
    BARNEHAGER = 'BARNEHAGER',
    NÆRINGSMIDDELINDUSTRI = 'NÆRINGSMIDDELINDUSTRI',
    SYKEHUS = 'SYKEHUS',
    SYKEHJEM = 'SYKEHJEM',
    TRANSPORT = 'TRANSPORT',
}

// TODO Rename til VirksomhetMetadata?
export interface Bedriftsmetrikker {
    næringskode5Siffer: Næringskode5Siffer;
    bransje: Bransjetype;
    antallAnsatte: number;
}

export type RestBedriftsmetrikker = RestRessurs<Bedriftsmetrikker>;
