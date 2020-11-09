import { Bransjetype, VirksomhetMetadata } from '../api/virksomhetMetadata';

export const defaultBedriftsmetrikker: VirksomhetMetadata = {
    antallAnsatte: 99,
    næringskode5Siffer: {
        kode: '84300',
        beskrivelse: 'Trygdeordninger underlagt offentlig forvaltning',
    },
};

export const getVirksomhetMetadataMock = (bransje?: Bransjetype): VirksomhetMetadata => {
    if (!bransje) return defaultBedriftsmetrikker;

    switch (bransje) {
        case Bransjetype.BARNEHAGER:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '88911',
                    beskrivelse: 'Barnehager',
                },
                bransje: Bransjetype.BARNEHAGER,
            };
        case Bransjetype.NÆRINGSMIDDELINDUSTRI:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '10201',
                    beskrivelse: 'Næringsmiddelindustrien',
                },
                bransje: Bransjetype.NÆRINGSMIDDELINDUSTRI,
            };
        case Bransjetype.SYKEHJEM:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '87101',
                    beskrivelse: 'Sykehjem',
                },
                bransje: Bransjetype.SYKEHJEM,
            };
        case Bransjetype.SYKEHUS:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '86102',
                    beskrivelse: 'Sykehus',
                },
                bransje: Bransjetype.SYKEHUS,
            };
        case Bransjetype.TRANSPORT:
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '49311',
                    beskrivelse: 'Rutebuss og persontrafikk (transport)',
                },
                bransje: Bransjetype.TRANSPORT,
            };
    }
};
