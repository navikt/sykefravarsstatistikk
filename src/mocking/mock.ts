import fetchMock from 'fetch-mock';
import sykefravarsprosent from './sammenligning.json';
import organisasjoner from './organisasjoner.json';
import tapteDagsverk from './tapteDagsverk.json';

const MOCK_MIN_SIDE_ARBEIDSGIVER = true;
const MOCK_SYKEFRAVÆRSSTATISTIKK = true;
const MOCK_TAPTEDAGSVERK = true;

if (MOCK_MIN_SIDE_ARBEIDSGIVER) {
    fetchMock.get('/min-side-arbeidsgiver/api/organisasjoner', organisasjoner, {
        delay: 0,
    });
}

if (MOCK_SYKEFRAVÆRSSTATISTIKK) {
    fetchMock.get('express:/sykefravarsstatistikk/api/:orgnr/sammenligning', sykefravarsprosent, {
        delay: 0,
    });
}
if (MOCK_TAPTEDAGSVERK) {
    fetchMock.get('express:/sykefravarsstatistikk/api/:orgnr/tapteDagsverk', tapteDagsverk, {
        delay: 0,
    });
}

fetchMock.spy();
