import {
    JuridiskEnhetMedUnderenheter,
    Organisasjonstre,
} from '../api/organisasjonstre/organisasjonstre-utils';

const fleskOgFisk: JuridiskEnhetMedUnderenheter = {
    juridiskEnhet: {
        navn: 'FLESK OG FISK AS',
        orgnr: '111111111',
        harTilgang: true,
    },
    underenheter: [
        {
            navn: 'FLESK OG FISK OSLO',
            orgnr: '910969439',
            harTilgang: true,
        },
        {
            navn: 'FLESK OG FISK HAMAR',
            orgnr: '333333333',
            harTilgang: true,
        },
        {
            navn: 'FLESK OG FISK GULEN',
            orgnr: '444444444',
            harTilgang: true,
        },
    ],
};

const olaNordmann: JuridiskEnhetMedUnderenheter = {
    juridiskEnhet: {
        navn: 'OLA NORDMANN ENK',
        orgnr: '555555555',
        harTilgang: true,
    },
    underenheter: [
        {
            navn: 'OLA NORDMANN ENK',
            orgnr: '666666666',
            harTilgang: true,
        },
    ],
};

const heiOgHåBarnehage: JuridiskEnhetMedUnderenheter = {
    juridiskEnhet: {
        navn: 'HEI OG HÅ BARNEHAGE',
        orgnr: '777777777',
        harTilgang: true,
    },
    underenheter: [
        {
            navn: 'HEI OG HÅ BARNEHAGE',
            orgnr: '888888888',
            harTilgang: true,
        },
    ],
};

const feil: JuridiskEnhetMedUnderenheter = {
    juridiskEnhet: {
        navn: 'FEIL AS',
        orgnr: '999999999',
        harTilgang: true,
    },
    underenheter: [
        {
            navn: 'FEIL',
            orgnr: '101010101',
            harTilgang: true,
        },
    ],
};

export const organisasjonstreMock: Organisasjonstre = [
    fleskOgFisk,
    olaNordmann,
    heiOgHåBarnehage,
    feil,
];
