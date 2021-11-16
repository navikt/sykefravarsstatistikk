import { Næringskode5Siffer } from '../api/virksomhetsdata-api';

export enum ArbeidsmiljøportalenBransje {
    BARNEHAGER = 'BARNEHAGER',
    NÆRINGSMIDDELINDUSTRI = 'NÆRINGSMIDDELINDUSTRI',
    SYKEHUS = 'SYKEHUS',
    SYKEHJEM = 'SYKEHJEM',
    TRANSPORT = 'TRANSPORT',
    BYGG = 'BYGG',
    ANLEGG = 'ANLEGG',
    ANDRE_BRANSJER = 'ANDRE_BRANSJER',
}

export const getArbeidsmiljøportalenBransje = (næring: Næringskode5Siffer): ArbeidsmiljøportalenBransje => {
    const næringskode2siffer = næring.kode.slice(0, 2);

    switch (næringskode2siffer) {
        case '10':
            return ArbeidsmiljøportalenBransje.NÆRINGSMIDDELINDUSTRI;
        case '41':
            return ArbeidsmiljøportalenBransje.BYGG;
        case '42':
            return ArbeidsmiljøportalenBransje.ANLEGG;
    }

    switch (næring.kode) {
        case '88911':
            return ArbeidsmiljøportalenBransje.BARNEHAGER;
        case '86101':
        case '86102':
        case '86104':
        case '86105':
        case '86106':
        case '86107':
            return ArbeidsmiljøportalenBransje.SYKEHUS;
        case '87101':
        case '87102':
            return ArbeidsmiljøportalenBransje.SYKEHJEM;
        case '49100':
        case '49311':
        case '49391':
        case '49392':
            return ArbeidsmiljøportalenBransje.TRANSPORT;
    }

    return ArbeidsmiljøportalenBransje.ANDRE_BRANSJER;
};

export const getLenkeTilBransjensSideIArbeidsmiljøportalen = (
    bransje: ArbeidsmiljøportalenBransje,
): string => {
    switch (bransje) {
        case ArbeidsmiljøportalenBransje.BARNEHAGER:
            return 'https://www.arbeidsmiljoportalen.no/bransje/barnehage';
        case ArbeidsmiljøportalenBransje.NÆRINGSMIDDELINDUSTRI:
            return 'https://www.arbeidsmiljoportalen.no/bransje/naringsmiddelindustri';
        case ArbeidsmiljøportalenBransje.TRANSPORT:
            return 'https://www.arbeidsmiljoportalen.no/bransje/rutebuss-og-persontrafikk';
        case ArbeidsmiljøportalenBransje.SYKEHJEM:
            return 'https://www.arbeidsmiljoportalen.no/bransje/sykehjem';
        case ArbeidsmiljøportalenBransje.SYKEHUS:
            return 'https://www.arbeidsmiljoportalen.no/bransje/sykehus';
        case ArbeidsmiljøportalenBransje.BYGG:
            return 'https://www.arbeidsmiljoportalen.no/bransje/bygg';
        case ArbeidsmiljøportalenBransje.ANLEGG:
            return 'https://www.arbeidsmiljoportalen.no/bransje/anlegg';
        default:
            return 'https://www.arbeidsmiljoportalen.no';
    }
};
