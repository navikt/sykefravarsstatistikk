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
    if (næring.kode.startsWith('10')) {
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
