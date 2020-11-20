import { Næringskode5Siffer } from '../../api/virksomhetMetadata';

export enum ArbeidstilsynetBransje {
    BARNEHAGER = 'BARNEHAGER',
    NÆRINGSMIDDELINDUSTRI = 'NÆRINGSMIDDELINDUSTRI',
    SYKEHUS = 'SYKEHUS',
    SYKEHJEM = 'SYKEHJEM',
    TRANSPORT = 'TRANSPORT',
    BYGG = 'BYGG',
    ANLEGG = 'ANLEGG',
    ANDRE_BRANSJER = 'ANDRE_BRANSJER',
}

export const getArbeidstilsynetBransje = (næring: Næringskode5Siffer): ArbeidstilsynetBransje => {
    const næringskode2siffer = næring.kode.slice(0, 2);

    switch (næringskode2siffer) {
        case '10':
            return ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI;
        case '41':
            return ArbeidstilsynetBransje.BYGG;
        case '42':
            return ArbeidstilsynetBransje.ANLEGG;
    }

    switch (næring.kode) {
        case '88911':
            return ArbeidstilsynetBransje.BARNEHAGER;
        case '86101':
        case '86102':
        case '86104':
        case '86105':
        case '86106':
        case '86107':
            return ArbeidstilsynetBransje.SYKEHUS;
        case '87101':
        case '87102':
            return ArbeidstilsynetBransje.SYKEHJEM;
        case '49100':
        case '49311':
        case '49391':
        case '49392':
            return ArbeidstilsynetBransje.TRANSPORT;
    }

    return ArbeidstilsynetBransje.ANDRE_BRANSJER;
};

export const getLenkeTilBransjensSideIArbeidsmiljøportalen = (
    bransje: ArbeidstilsynetBransje
): string => {
    switch (bransje) {
        case ArbeidstilsynetBransje.BARNEHAGER:
            return 'https://www.arbeidsmiljoportalen.no/bransje/barnehage';
        case ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI:
            return 'https://www.arbeidsmiljoportalen.no/bransje/naringsmiddelindustri';
        case ArbeidstilsynetBransje.TRANSPORT:
            return 'https://www.arbeidsmiljoportalen.no/bransje/rutebuss-og-persontrafikk';
        case ArbeidstilsynetBransje.SYKEHJEM:
            return 'https://www.arbeidsmiljoportalen.no/bransje/sykehjem';
        case ArbeidstilsynetBransje.SYKEHUS:
            return 'https://www.arbeidsmiljoportalen.no/bransje/sykehus';
        case ArbeidstilsynetBransje.BYGG:
            return 'https://www.arbeidsmiljoportalen.no/bransje/bygg';
        case ArbeidstilsynetBransje.ANLEGG:
            return 'https://www.arbeidsmiljoportalen.no/bransje/anlegg';
        default:
            return 'https://www.arbeidsmiljoportalen.no';
    }
};
