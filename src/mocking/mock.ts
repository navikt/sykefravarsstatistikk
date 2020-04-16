import fetchMock from 'fetch-mock';
import { enhetsregisteretMockRespons } from './enhetsregisteret';
import { getOrganisasjonerMock } from './organisasjoner';
import { getSykefraværshistorikkMock } from './sykefraværshistorikk';

const MOCK_MIN_SIDE_ARBEIDSGIVER = true;
const MOCK_SYKEFRAVÆRSSTATISTIKK_API = false;
const MOCK_ENHETSREGISTERET = true;
const MOCK_FEATURE_TOGGLES = true;

if (MOCK_MIN_SIDE_ARBEIDSGIVER) {
    fetchMock.get('/min-side-arbeidsgiver/api/organisasjoner', getOrganisasjonerMock(), {
        delay: 1000,
    });
}

if (MOCK_SYKEFRAVÆRSSTATISTIKK_API) {
    fetchMock.get(
        'express:/sykefravarsstatistikk/api/:orgnr/sykefravarshistorikk',
        url => {
            const orgnr = url.match(/[0-9]{9}/)![0];
            if (orgnr === '101010101') {
                return 500;
            }
            return getSykefraværshistorikkMock(orgnr);
        },
        {
            delay: 1000,
        }
    );
    fetchMock.get(
        'express:/sykefravarsstatistikk/api/:orgnr/bedriftsmetrikker',
        url => {
            const orgnr = url.match(/[0-9]{9}/)![0];
            if (orgnr === '101010101') {
                return 500;
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
            delay: 500,
        }
    );
}

if (MOCK_ENHETSREGISTERET) {
    fetchMock.get(
        'begin:https://data.brreg.no/enhetsregisteret/api/enheter/?organisasjonsnummer=',
        url => {
            const query = new URLSearchParams(url.split('?')[1]);

            return enhetsregisteretMockRespons(
                query.get('organisasjonsnummer')!,
                'test AS',
                '999999999'
            );
        }
    );
}

if (MOCK_FEATURE_TOGGLES) {
    fetchMock.get(
        'begin:/sykefravarsstatistikk/api/feature',
        {
            'arbeidsgiver.lanser-graf': true,
        },
        {
            delay: 1000,
        }
    );
}

fetchMock.spy();
