import {mapTilUnderenhet, UnderenhetDto} from './enhetsregisteret-api';

describe('tester for enhetsregisteret-api', () => {
    test('Mapping fra UnderenhetDto skal håndtere flere næringer', () => {
        const underenhetDto = {
            ...getUnderenhetDto(),
            naeringskode2: {
                beskrivelse: 'barnehage',
                kode: '88.911',
            },
        };

        expect(mapTilUnderenhet(underenhetDto)).toEqual({
            orgnr: '999999999',
            overordnetEnhet: '999999991',
            næringer: [
                {
                    beskrivelse: 'næring 1',
                    kode: '88.992',
                },
                {
                    beskrivelse: 'barnehage',
                    kode: '88.911',
                },
            ],
            beliggenhetsadresse: {
                kommune: "OSLO",
                kommunenummer: "9999"
            },
        });
    });

    test('Mapping fra UnderenhetDto skal håndtere at virksomhet ikke har næring', () => {
        const underenhetDto = {
            ...getUnderenhetDto(),
            naeringskode1: undefined,
            naeringskode2: undefined,
        };
        expect(mapTilUnderenhet(underenhetDto).næringer.length).toBe(0);
    });
});

const getUnderenhetDto = (): UnderenhetDto => ({
    organisasjonsnummer: '999999999',
    navn: 'HEI OG HÅ BARNEHAGE',
    organisasjonsform: {
        kode: 'BEDR',
        beskrivelse: 'Bedrift',
        _links: {
            self: {
                href: 'https://data.brreg.no/enhetsregisteret/api/organisasjonsformer/BEDR',
            },
        },
    },
    registreringsdatoEnhetsregisteret: '1990-01-01',
    registrertIMvaregisteret: false,
    naeringskode1: {
        beskrivelse: 'næring 1',
        kode: '88.992',
    },
    antallAnsatte: 62,
    overordnetEnhet: '999999991',
    oppstartsdato: '1990-01-01',
    beliggenhetsadresse: {
        land: 'Norge',
        landkode: 'NO',
        postnummer: '9999',
        poststed: 'OSLO',
        adresse: ['testadresse AS'],
        kommune: 'OSLO',
        kommunenummer: '9999',
    },
    _links: {
        self: {
            href: 'https://data.brreg.no/enhetsregisteret/api/underenheter/999999999',
        },
        overordnetEnhet: {
            href: 'https://data.brreg.no/enhetsregisteret/api/enheter/999999991',
        },
    },
});
