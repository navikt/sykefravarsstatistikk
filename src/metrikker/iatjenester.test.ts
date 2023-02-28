import { sendIaTjenesteMetrikkMottatt, sendteMetrikker } from './iatjenester';
import { iaTjenestemetrikkFeiletHandler } from './testMswHandlers';
import { mswTestServer } from '../../jest/mswTestServer';

beforeEach(() => {
    resetSendteMetrikker();
});

describe('Tester vellykket utsendelse av ia-metrikk', () => {
    test('nytt orgnr skal legges til i lista over sendte metrikker', async () => {
        const nyttOrgnr = '99999999';
        const leverteIaTjenester = await sendIaTjenesteMetrikkMottatt(nyttOrgnr);

        expect(leverteIaTjenester).toEqual([{ orgnr: '' }, { orgnr: '99999999' }]);
    });

    test('skal ikke sende levert ia-tjeneste to ganger for samme virksomhet', async () => {
        const nyttOrgnr = '888888882';
        await sendIaTjenesteMetrikkMottatt(nyttOrgnr);
        const leverteIaTjenester = await sendIaTjenesteMetrikkMottatt(nyttOrgnr);

        expect(leverteIaTjenester).toEqual([{ orgnr: '' }, { orgnr: '888888882' }]);
    });
});

describe('Tester feilende utsendelse av IA-metrikk', () => {
    beforeEach(() => {
        mswTestServer.use(iaTjenestemetrikkFeiletHandler);
    });

    test('skal ikke legge til orgnummer i lista over sendte metrikker dersom kallet feiler', async () => {
        const nyttOrgnr = '99999999';

        const leverteIaTjenester = await sendIaTjenesteMetrikkMottatt(nyttOrgnr);
        expect(leverteIaTjenester).toEqual([{ orgnr: '' }]);
    });
});

function resetSendteMetrikker() {
    sendteMetrikker.length = 0;
    sendteMetrikker.push({ orgnr: '' });
}
