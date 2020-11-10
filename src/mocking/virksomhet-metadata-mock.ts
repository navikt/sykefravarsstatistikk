import { Bransjetype, VirksomhetMetadata } from '../api/virksomhetMetadata';
import { ArbeidstilsynetBransje } from '../Forside/ArbeidsmiljøportalPanel/bransje-utils';

export const defaultBedriftsmetrikker: VirksomhetMetadata = {
    antallAnsatte: 99,
    næringskode5Siffer: {
        kode: '84300',
        beskrivelse: 'Trygdeordninger underlagt offentlig forvaltning',
    },
};

export const getVirksomhetMetadataMock = (bransje: ArbeidstilsynetBransje): VirksomhetMetadata => {
    switch (bransje) {
        case ArbeidstilsynetBransje.BARNEHAGER:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '88911',
                    beskrivelse: 'Barnehager',
                },
                bransje: Bransjetype.BARNEHAGER,
            };
        case ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '10201',
                    beskrivelse: 'Næringsmiddelindustrien',
                },
                bransje: Bransjetype.NÆRINGSMIDDELINDUSTRI,
            };
        case ArbeidstilsynetBransje.SYKEHJEM:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '87101',
                    beskrivelse: 'Sykehjem',
                },
                bransje: Bransjetype.SYKEHJEM,
            };
        case ArbeidstilsynetBransje.SYKEHUS:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '86102',
                    beskrivelse: 'Sykehus',
                },
                bransje: Bransjetype.SYKEHUS,
            };
        case ArbeidstilsynetBransje.TRANSPORT:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '49311',
                    beskrivelse: 'Rutebuss og persontrafikk (transport)',
                },
                bransje: Bransjetype.TRANSPORT,
            };
        case ArbeidstilsynetBransje.BYGG:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '41101',
                    beskrivelse: 'Boligbyggelag',
                },
            };
        case ArbeidstilsynetBransje.ANLEGG:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '42110',
                    beskrivelse: 'Bygging av veier og motorveier',
                },
            };
        case ArbeidstilsynetBransje.ANDRE_BRANSJER:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '84300',
                    beskrivelse: 'Trygdeordninger underlagt offentlig forvaltning',
                },
            };
    }
};
