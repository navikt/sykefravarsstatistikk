import { sendIaTjenesteMetrikkMottatt, sendteMetrikker } from './iatjenester';

beforeEach(() => {
    sendteMetrikker.length = 0;
    sendteMetrikker.push({ orgnr: '' });

    // pos)
});

describe('Tester for utsendelse av ia-tjenester-metrikker', () => {
    test('nytt orgnr skal legges til i lista over sendte metrikaer', () => {
        const nyttOrgnr = '99999999';
        sendIaTjenesteMetrikkMottatt(nyttOrgnr);

        // expect(sendteMetrikker).toEqual([{orgnr: ''}, {orgnr: nyttOrgnr}])
    });

    test('skal ikke sende levert ia-tjeneste to ganger for samme virksomhet', () => {
        // TODO
    });
});
