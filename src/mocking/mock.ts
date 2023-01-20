import fetchMock, {
    MockMatcher,
    MockOptionsMethodGet,
    MockRequest,
    MockResponse,
    MockResponseFunction,
} from 'fetch-mock';
import { UnderenhetDto } from '../enhetsregisteret/api/underenheter-api';
import { underenheterResponseMock } from '../enhetsregisteret/api/mocks/underenheter-api-mocks';
import { getMockOrganisasjon } from './mockede-organisasjoner';
import { getOrganisasjonerBrukerHarTilgangTilMock, getOrganisasjonerMock } from './altinn-mock';
import { getMiljø } from '../utils/miljøUtils';
import { aggregertMockData } from './aggregert-mock';
import { getMockPubliseringsdatoer } from './mock-publiseringsdatoer';
import { OverordnetEnhet } from '../enhetsregisteret/domene/enhet';
import { lagMockHistorikkForNæring } from './sykefraværshistorikk-mock';

const mock = {
    minSideArbeidsgiver: true,
    sykefraværsstatistikkApi: true,
    enhetsregisteret: true,
    featureToggles: true,
    iatjenester: true,
    aggregertStatistikk: true,
};

let delayfaktor = 0;

if (getMiljø() === 'labs-gcp') {
    // Alt skal alltid mockes på labs
    Object.keys(mock).forEach((skalMockes) => ((mock as any)[skalMockes] = true));
    delayfaktor = 1;
}

const mockGetAndLog = (
    matcher: MockMatcher,
    response: MockResponse | MockResponseFunction,
    options?: MockOptionsMethodGet
): fetchMock.FetchMockStatic => {
    let responseFunction: MockResponseFunction;
    if (response instanceof Function) {
        responseFunction = (url: string, opts: MockRequest) => {
            const responseValue = response(url, opts);
            console.log(
                '%c' + url,
                'color:lightblue;font-weight:bold;',
                process.env.NODE_ENV === 'test'
                    ? ''
                    : {
                          response: responseValue,
                      }
            );
            return responseValue;
        };
    } else {
        responseFunction = (url) => {
            console.log(
                '%c' + url,
                'color:lightblue;font-weight:bold;',
                process.env.NODE_ENV === 'test' ? '' : { response }
            );
            return response;
        };
    }
    return fetchMock.get(matcher, responseFunction, options);
};

if (mock.minSideArbeidsgiver) {
    mockGetAndLog('/sykefravarsstatistikk/api/organisasjoner', getOrganisasjonerMock(), {
        delay: 1000 * delayfaktor,
    });
}

if (mock.sykefraværsstatistikkApi) {
    mockGetAndLog(
        'express:/sykefravarsstatistikk/api/:orgnr/sykefravarshistorikk/kvartalsvis',
        (url) => {
            const orgnr = url.match(/[0-9]{9}/)![0];

            return (
                getMockOrganisasjon(orgnr)?.sykefraværshistorikkKvartalsvis ||
                lagMockHistorikkForNæring()
            );
        },
        {
            delay: 1000 * delayfaktor,
        }
    );
    mockGetAndLog('express:/sykefravarsstatistikk/api/publiseringsdato', () => {
        return getMockPubliseringsdatoer();
    });

    mockGetAndLog(
        '/sykefravarsstatistikk/api/organisasjoner/statistikk',
        getOrganisasjonerBrukerHarTilgangTilMock(),
        {
            delay: 1000 * delayfaktor,
        }
    );
}

if (mock.enhetsregisteret) {
    mockGetAndLog('begin:https://data.brreg.no/enhetsregisteret/api/enheter/', (url) => {
        const orgnr = url.match(/[0-9]{9}/)![0];
        const defaultOverordnetEnhet: OverordnetEnhet = {
            orgnr: orgnr,
            institusjonellSektorkode: { kode: '6500', beskrivelse: 'Offentlig sektor' },
        };
        const overordnetEnhet = getMockOrganisasjon(orgnr)?.overordnetEnhet;
        console.log('MOCK ENHETREGISTERET / ENHETER, orgnr: ', orgnr);
        console.log('MOCK ENHETREGISTERE  / ENHETERT, overordnetenhet: ', overordnetEnhet);
        return overordnetEnhet || defaultOverordnetEnhet;
    });

    mockGetAndLog('begin:https://data.brreg.no/enhetsregisteret/api/underenheter/', (url) => {
        const orgnr = url.match(/[0-9]{9}/)![0];
        const defaultUnderenhetDto: UnderenhetDto = {
            ...underenheterResponseMock,
            organisasjonsnummer: orgnr,
        };
        const underenhetDto = getMockOrganisasjon(orgnr)?.underenhet;
        console.log('MOCK ENHETREGISTERET  / UNDERENHETER, underenhetDto: ', underenhetDto);
        return underenhetDto || defaultUnderenhetDto;
    });
}

if (mock.iatjenester) {
    fetchMock.post('end:/ia-tjenester-metrikker/innlogget/mottatt-iatjeneste', {
        body: {
            status: 'created',
        },
    });
}

if (mock.aggregertStatistikk) {
    mockGetAndLog(
        'express:/sykefravarsstatistikk/api/:orgnr/v1/sykefravarshistorikk/aggregert',
        (/*url*/) => {
            //const orgnr = url.match(/[0-9]{9}/)![0];
            return aggregertMockData;
        },
        {
            delay: 1000 * delayfaktor,
        }
    );
}

fetchMock.spy();
