import { Sammenligning } from '../api/sammenligning';

const defaultSammenlingning = {
    kvartal: 2,
    årstall: 2019,
    land: {
        label: 'Norge',
        prosent: 5.5,
    },
    sektor: {
        label: 'Privat og offentlig næringsvirksomhet',
        prosent: 4.1,
    },
    virksomhet: {
        label: 'defaultbedrift (hvis du vil endre denne, kan du legge til ditt orgnr i mockingen)',
        prosent: 1.1,
    },
};

const lagSammenligningVirksomhet = (
    orgNavn: string,
    orgProsent: number | null,
    erMaskert?: boolean
) => {
    return {
        ...defaultSammenlingning,
        virksomhet: {
            label: orgNavn,
            prosent: orgProsent,
            erMaskert: erMaskert,
        },
    };
};

const lagSammenligningNæring = (
    orgNavn: string,
    orgProsent: number | null,
    næringNavn: string,
    næringProsent: number,
    erMaskert?: boolean
): Sammenligning => {
    return {
        ...lagSammenligningVirksomhet(orgNavn, orgProsent, erMaskert),
        næring: {
            label: næringNavn,
            prosent: næringProsent,
        },
    };
};
const lagSammenligningBransje = (
    orgNavn: string,
    orgProsent: number | null,
    bransjeNavn: string,
    bransjeProsent: number,
    erMaskert?: boolean
): Sammenligning => {
    return {
        ...lagSammenligningVirksomhet(orgNavn, orgProsent, erMaskert),
        bransje: {
            label: bransjeNavn,
            prosent: bransjeProsent,
        },
    };
};

export const getSammenligningMock = (orgnr: String): Sammenligning => {
    switch (orgnr) {
        case '910969439':
            return lagSammenligningNæring(
                'FLESK OG FISK OSLO',
                4.4,
                'Jordbruk og tjenester tilknyttet jordbruk, jakt og viltstell',
                6.3
            );
        case '333333333':
            return lagSammenligningNæring(
                'FLESK OG FISK HAMAR',
                3.6,
                'Jordbruk og tjenester tilknyttet jordbruk, jakt og viltstell',
                6.3
            );
        case '444444444':
            return lagSammenligningNæring(
                'FLESK OG FISK GULEN',
                36.5,
                'Jordbruk og tjenester tilknyttet jordbruk, jakt og viltstell',
                6.3
            );
        case '666666666':
            return lagSammenligningNæring(
                'OLA NORDMANN ENK',
                null,
                'Annen personlig tjenesteyting',
                2.3,
                true
            );
        case '888888888':
            return lagSammenligningBransje('HEI OG HÅ BARNEHAGE', 18.2, 'Barnehager', 15.4);
        default:
            return defaultSammenlingning;
    }
};
