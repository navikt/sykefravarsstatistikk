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

    if (næringskode2siffer === '10') {
        return ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI;
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

export const getBransjenavn = (bransje: ArbeidstilsynetBransje): string => {
    switch (bransje) {
        case ArbeidstilsynetBransje.BARNEHAGER:
            return 'barnehagebransjen';
        case ArbeidstilsynetBransje.NÆRINGSMIDDELINDUSTRI:
            return 'næringsmiddelindustrien';
        case ArbeidstilsynetBransje.TRANSPORT:
            return 'transportbransjen';
        case ArbeidstilsynetBransje.SYKEHJEM:
            return 'sykehjem';
        case ArbeidstilsynetBransje.SYKEHUS:
            return 'sykehus';
        case ArbeidstilsynetBransje.BYGG:
            return 'byggebransjen';
        case ArbeidstilsynetBransje.ANLEGG:
            return 'anleggsbransjen';
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
