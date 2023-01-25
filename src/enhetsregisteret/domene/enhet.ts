export interface InstitusjonellSektorkode {
  kode: string;
  beskrivelse: string;
}

export interface OverordnetEnhet {
    orgnr: string;
    institusjonellSektorkode: InstitusjonellSektorkode;
}