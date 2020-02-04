import fetchMock from 'fetch-mock';
import { enhetsregisteretMockRespons } from './enhetsregisteret';
import { getOrganisasjonerMock } from './organisasjoner';
import { getSammenligningMock } from './sammenligning';
import { getTapteDagsverkMock } from './tapteDagsverk';

const MOCK_MIN_SIDE_ARBEIDSGIVER = true;
const MOCK_SYKEFRAVÆRSSTATISTIKK = true;
const MOCK_TAPTEDAGSVERK = true;
const MOCK_ENHETSREGISTERET = true;

if (MOCK_MIN_SIDE_ARBEIDSGIVER) {
    fetchMock.get('/min-side-arbeidsgiver/api/organisasjoner', getOrganisasjonerMock(), {
        delay: 1000,
    });
}

if (MOCK_SYKEFRAVÆRSSTATISTIKK) {
    fetchMock.get('express:/sykefravarsstatistikk/api/:orgnr/sammenligning', (url => {
        const orgnr = url.match(/[0-9]{9}/)![0];
        if (orgnr === '101010101') {
            return 500;
        }
        return getSammenligningMock(orgnr);
    }), {
        delay: 2000,
    });
}

if (MOCK_TAPTEDAGSVERK) {
    fetchMock.get('express:/sykefravarsstatistikk/api/:orgnr/tapteDagsverk', url => {
        const orgnr = url.match(/[0-9]{9}/)![0];
        if (orgnr === '101010101') {
            return 500;
        }
        return getTapteDagsverkMock(orgnr);
    }, {
        delay: 1000,
    });
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

fetchMock.spy();
