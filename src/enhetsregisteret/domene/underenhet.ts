import { ArbeidsmiljøportalenBransje } from '../../utils/bransje-utils';

export interface Beliggenhetsadresse {
    kommune: string;
    kommunenummer: string;
}

export type Næringskode5Siffer = {
    kode: string;
    beskrivelse: string;
};

export interface Næring {
    kode: string;
    beskrivelse?: string;
}

export interface Underenhet {
    orgnr: string;
    overordnetEnhet: string;
    beliggenhetsadresse: Beliggenhetsadresse;
    næringskode?: Næringskode5Siffer;
    næring?: Næring;
    bransje?: ArbeidsmiljøportalenBransje;
    antallAnsatte: number;
}
