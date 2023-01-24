import { mapTilUnderenhet } from './underenheter-api';
import { underenheterResponseMock } from './mocks/underenheter-api-mocks';

describe('tester for enhetsregisteret-api', () => {
    test('Mapping fra UnderenhetDto skal mappe alle felter', () => {
        expect(mapTilUnderenhet(underenheterResponseMock)).toEqual({
            orgnr: '999999999',
            overordnetEnhet: '999999991',
            beliggenhetsadresse: {
                kommune: 'OSLO',
                kommunenummer: '9999',
            },
            næringskode: {
                beskrivelse: 'næringskoden til barnehage',
                kode: '88911',
            },
            næring: {
                beskrivelse: 'Sosiale omsorgstjenester uten botilbud',
                kode: '88',
            },
            bransje: "BARNEHAGER",
            antallAnsatte: 62,
        });
    });

    test('Mapping fra UnderenhetDto skal håndtere at virksomhet ikke har næring', () => {
        const underenhetDto = {
            ...underenheterResponseMock,
            naeringskode1: undefined,
            naeringskode2: undefined,
        };
        expect(mapTilUnderenhet(underenhetDto).næringskode).toBeUndefined();
    });
});
