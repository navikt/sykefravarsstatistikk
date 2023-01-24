import { mapTilUnderenhet } from './underenheter-api';
import { underenheterResponseMock } from './mocks/underenheter-api-mocks';

describe('tester for enhetsregisteret-api', () => {
    test('Mapping fra UnderenhetDto skal mappe alle felter', () => {
        expect(mapTilUnderenhet(underenheterResponseMock)).toEqual({
            orgnr: '999999999',
            overordnetEnhet: '999999991',
            næringskode: {
                beskrivelse: 'næring 1',
                kode: '88.992',
            },
            antallAnsatte: 62,
            beliggenhetsadresse: {
                kommune: 'OSLO',
                kommunenummer: '9999',
            },
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
