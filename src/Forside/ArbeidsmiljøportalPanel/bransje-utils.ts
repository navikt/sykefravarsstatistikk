import { Næringskode5Siffer } from '../../api/virksomhetMetadata';

export enum ArbeidstilsynetBransje {
    BARNEHAGER = 'BARNEHAGER',
    NÆRINGSMIDDELINDUSTRI = 'NÆRINGSMIDDELINDUSTRI',
    SYKEHUS = 'SYKEHUS',
    SYKEHJEM = 'SYKEHJEM',
    TRANSPORT = 'TRANSPORT',
    INGEN_BRANSJE = 'INGEN_BRANSJE',
}

export const getArbeidstilsynetBransje = (næring: Næringskode5Siffer): ArbeidstilsynetBransje => {
    const næringskode2siffer = næring.kode.split('.')[0];

    if (næringskode2siffer === '10') {
        return ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI;
    }

    switch (næring.kode) {
        case '88.911':
            return ArbeidstilsynetBransje.BARNEHAGER;
        case '86.101':
        case '86.102':
        case '86.104':
        case '86.105':
        case '86.106':
        case '86.107':
            return ArbeidstilsynetBransje.SYKEHUS;
        case '87.101':
        case '87.102':
            return ArbeidstilsynetBransje.SYKEHJEM;
        case '49.100':
        case '49.311':
        case '49.391':
        case '49.392':
            return ArbeidstilsynetBransje.TRANSPORT;
    }

    return ArbeidstilsynetBransje.INGEN_BRANSJE;
};

export const getBransjenavn = (bransje: ArbeidstilsynetBransje): string => {
    switch (bransje) {
        case ArbeidstilsynetBransje.BARNEHAGER:
            return 'barnehagebransjen';
        case ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI:
            return 'næringsmiddelindustrien';
        case ArbeidstilsynetBransje.TRANSPORT:
            return 'transportbransjen';
        case ArbeidstilsynetBransje.SYKEHJEM:
            return 'sykehjemsbransjen';
        case ArbeidstilsynetBransje.SYKEHUS:
            return 'sykehusbransjen';
        default:
            return '';
    }
};

export const getLenkeTilBransjensSideIArbeidsmiljøportalen = (
    bransje: ArbeidstilsynetBransje
): string => {
    // TODO Disse lenkene er ikke riktige.
    switch (bransje) {
        case ArbeidstilsynetBransje.BARNEHAGER:
            return 'https://www.arbeidstilsynet.no/?bransje=barnehager';
        case ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI:
            return 'https://www.arbeidstilsynet.no/?bransje=næringsmiddelindustri';
        case ArbeidstilsynetBransje.TRANSPORT:
            return 'https://www.arbeidstilsynet.no/?bransje=transport';
        case ArbeidstilsynetBransje.SYKEHJEM:
            return 'https://www.arbeidstilsynet.no/?bransje=sykehjem';
        case ArbeidstilsynetBransje.SYKEHUS:
            return 'https://www.arbeidstilsynet.no/?bransje=sykehus';
        default:
            return 'https://www.arbeidstilsynet.no/?bransje=ingen';
    }
};
