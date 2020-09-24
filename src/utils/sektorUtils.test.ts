import { mapTilPrivatElleOffentligSektor } from './sektorUtils';

describe('Tester for sektorUtils funksjoner', () => {
    test('mapTilPrivatElleOffentligSektor returnerer "offentlig" eller "private" avhengig av institusjonell sektor kode', () => {
        const resulatMedOffentligSektorkode = mapTilPrivatElleOffentligSektor({
            verdi: '6500',
            beskrivelse: 'Kommuneforvaltningen',
        });
        expect(resulatMedOffentligSektorkode).toBe('offentlig');

        const resulatMedPrivatSektorkode = mapTilPrivatElleOffentligSektor({
            verdi: '2100',
            beskrivelse: 'Private aksjeselskaper mv.',
        });
        expect(resulatMedPrivatSektorkode).toBe('privat');
    });
});
