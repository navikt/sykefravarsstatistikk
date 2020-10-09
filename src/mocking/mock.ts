import fetchMock, {
    MockMatcher,
    MockOptionsMethodGet,
    MockRequest,
    MockResponse,
    MockResponseFunction,
} from 'fetch-mock';
import { getOrganisasjonerBrukerHarTilgangTilMock, getOrganisasjonerMock } from './organisasjoner';
import { getSykefraværshistorikkMock } from './sykefraværshistorikk';
import { Bransjetype } from '../api/virksomhetMetadata';
import { sykefraværsvarighetMock } from './sykefraværsvarighet';
import { OverordnetEnhet, Underenhet } from '../api/enhetsregisteret-api';

const mock = {
    minSideArbeidsgiver: true,
    sykefraværsstatistikkApi: true,
    enhetsregisteret: true,
    featureToggles: true,
};

let delayfaktor = 0;

if (process.env.REACT_APP_HEROKU) {
    // Alt skal alltid mockes på Heroku
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
            console.log('%c' + url, 'color:lightblue;font-weight:bold;', {
                response: responseValue,
            });
            return responseValue;
        };
    } else {
        responseFunction = (url) => {
            console.log('%c' + url, 'color:lightblue;font-weight:bold;', { response });
            return response;
        };
    }
    return fetchMock.get(matcher, responseFunction, options);
};

if (mock.minSideArbeidsgiver) {
    mockGetAndLog('/min-side-arbeidsgiver/api/organisasjoner', getOrganisasjonerMock(), {
        delay: 1000 * delayfaktor,
    });
}

if (mock.sykefraværsstatistikkApi) {
    mockGetAndLog(
        'express:/sykefravarsstatistikk/api/:orgnr/sykefravarshistorikk/kvartalsvis',
        (url) => {
            const orgnr = url.match(/[0-9]{9}/)![0];
            if (orgnr === '101010101') {
                return 500;
            }
            if (orgnr === '100100100') {
                return 403;
            }
            return getSykefraværshistorikkMock(orgnr);
        },
        {
            delay: 1000 * delayfaktor,
        }
    );
    mockGetAndLog(
        'express:/sykefravarsstatistikk/api/:orgnr/sykefravarshistorikk/summert',
        (url) => {
            const orgnr = url.match(/[0-9]{9}/)![0];
            if (['101010101', '888888884'].includes(orgnr)) {
                return 500;
            }
            if (orgnr === '100100100') {
                return 403;
            }
            return sykefraværsvarighetMock(orgnr);
        },
        {
            delay: 1000 * delayfaktor,
        }
    );

    mockGetAndLog(
        'express:/sykefravarsstatistikk/api/:orgnr/bedriftsmetrikker',
        (url) => {
            const orgnr = url.match(/[0-9]{9}/)![0];
            if (orgnr === '101010101') {
                return 500;
            }
            if (orgnr === '100100100') {
                return 500;
            }
            if (orgnr.match('88888888.')) {
                return {
                    antallAnsatte: 99,
                    næringskode5Siffer: {
                        kode: '88911',
                        beskrivelse: 'Barnehager',
                    },
                    bransje: Bransjetype.BARNEHAGER,
                };
            }
            return {
                antallAnsatte: 99,
                næringskode5Siffer: {
                    kode: '10300',
                    beskrivelse: 'Trygdeordninger underlagt offentlig forvaltning',
                },
            };
        },
        {
            delay: 1000 * delayfaktor,
        }
    );
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

        const overordnetEnhet: OverordnetEnhet = {
            orgnr: orgnr,
            institusjonellSektorkode: { kode: '6500', beskrivelse: 'Offentlig sektor' },
        };
        return overordnetEnhet;
    });
    mockGetAndLog('begin:https://data.brreg.no/enhetsregisteret/api/underenheter/', (url) => {
        const orgnr = url.match(/[0-9]{9}/)![0];

        const underenhet: Underenhet = {
            orgnr: orgnr,
            overordnetEnhet: '777777777',
        };
        return underenhet;
    });
}

if (mock.featureToggles) {
    mockGetAndLog(
        'begin:/sykefravarsstatistikk/api/feature',
        {
            'sykefravarsstatistikk.ab-test.tips': false,
            'sykefravarsstatistikk.barnehage-ny-sammenligning': true,
        },
        {
            delay: 1000 * delayfaktor,
        }
    );
}

fetchMock.spy();
