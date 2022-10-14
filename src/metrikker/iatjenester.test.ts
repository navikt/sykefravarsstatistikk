import { sendIaTjenesteMetrikkMottatt, sendteMetrikker } from './iatjenester';
import { iaMetrikkFeilet } from './handlers';
import { mswServer } from './msw-server';

beforeEach(() => {
    resetSendteMetrikker();
});

describe('Tester for utsendelse av ia-tjenester-metrikker', () => {
    test('nytt orgnr skal legges til i lista over sendte metrikker', async () => {
        const nyttOrgnr = '99999999';
        const leverteIaTjenester = await sendIaTjenesteMetrikkMottatt(nyttOrgnr);

        expect(leverteIaTjenester).toEqual([{ orgnr: '' }, { orgnr: '99999999' }]);
    });

    test('skal ikke sende levert ia-tjeneste to ganger for samme virksomhet', async () => {
        const nyttOrgnr = '888888888';
        await sendIaTjenesteMetrikkMottatt(nyttOrgnr);
        const leverteIaTjenester = await sendIaTjenesteMetrikkMottatt(nyttOrgnr);

        expect(leverteIaTjenester).toEqual([{ orgnr: '' }, { orgnr: '888888888' }]);
    });

    test('skal ikke legge til orgnummer i lista over sendte metrikker dersom kallet feiler', async () => {
        const nyttOrgnr = '99999999';

        mswServer.use(iaMetrikkFeilet);
        const leverteIaTjenester = await sendIaTjenesteMetrikkMottatt(nyttOrgnr);
        expect(leverteIaTjenester).toEqual([{ orgnr: '' }]);
    });
});

function resetSendteMetrikker() {
    sendteMetrikker.length = 0;
    sendteMetrikker.push({ orgnr: '' });
}
