import { mapTilPrivatEllerOffentligSektor } from './sektorUtils';

describe('Tester for sektorUtils funksjoner', () => {
    test('mapTilPrivatElleOffentligSektor returnerer "offentlig" eller "private" avhengig av institusjonell sektor kode', () => {
        const resulatMedOffentligSektorkode = mapTilPrivatEllerOffentligSektor({
            kode: '6500',
            beskrivelse: 'Kommuneforvaltningen',
        });
        expect(resulatMedOffentligSektorkode).toBe('offentlig');

        const resulatMedPrivatSektorkode = mapTilPrivatEllerOffentligSektor({
            kode: '2100',
            beskrivelse: 'Private aksjeselskaper mv.',
        });
        expect(resulatMedPrivatSektorkode).toBe('privat');
    });
});
