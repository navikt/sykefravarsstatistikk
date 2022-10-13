import { registrerLevertMetrikkForBedrift } from './iatjenester';
import { Virksomhet } from './IaTjenesterMetrikkerContext';

describe('Tester for utsendelse av ia-tjenester-metrikker', () => {
    test('nytt orgnr skal legges til i lista over sendte metrikker', () => {
        const listeOverSendteMetrikker: [Virksomhet] = [{ orgnr: '' }];

        const oppdatertListe = registrerLevertMetrikkForBedrift(
            listeOverSendteMetrikker,
            '999999999'
        );

        expect(oppdatertListe).toEqual([{ orgnr: '' }, { orgnr: '999999999' }]);
    });

    test('samme orgnr skal ikke legges til i lista over sendte metrikker', () => {
        const listeOverSendteMetrikker: [Virksomhet] = [{ orgnr: '999999999' }];

        const oppdatertListe = registrerLevertMetrikkForBedrift(
            listeOverSendteMetrikker,
            '999999999'
        );

        expect(oppdatertListe).toEqual(listeOverSendteMetrikker);
    });
});
