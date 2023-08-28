import { sendIaTjenesteMetrikk } from './iatjenester';
import { iaTjenestemetrikkFeiletHandler } from './testMswHandlers';
import { mswTestServer } from '../../jest/mswTestServer';

describe('Tester vellykket utsendelse av ia-metrikk', () => {
    test('nytt orgnr skal legges til i lista over sendte metrikker', async () => {
        const nyttOrgnr = '99999999';
        const leverteIaTjenester = await sendIaTjenesteMetrikk(nyttOrgnr);

        expect(leverteIaTjenester).toEqual([{ orgnr: '99999999' }]);
    });

    test('skal ikke sende levert ia-tjeneste to ganger for samme virksomhet', async () => {
        const nyttOrgnr = '888888882';
        await sendIaTjenesteMetrikk(nyttOrgnr);
        const leverteIaTjenester = await sendIaTjenesteMetrikk(nyttOrgnr);

        expect(leverteIaTjenester.filter(({ orgnr }) => orgnr === nyttOrgnr)?.length).toEqual(1);
    });
});

describe('Tester feilende utsendelse av IA-metrikk', () => {
    beforeEach(() => {
        mswTestServer.use(iaTjenestemetrikkFeiletHandler);
    });

    test('skal ikke legge til orgnummer i lista over sendte metrikker dersom kallet feiler', async () => {
        const nyttOrgnr = '99999997';

        const startArray = [...(await sendIaTjenesteMetrikk(''))];

        const leverteIaTjenester = await sendIaTjenesteMetrikk(nyttOrgnr);
        expect(leverteIaTjenester).toEqual(startArray);
    });
});
