import fetchMock from 'fetch-mock';
import sykefravarsprosent from './sammenligning.json';
import organisasjoner from './organisasjoner.json';

const MOCK_MIN_SIDE_ARBEIDSGIVER = true;
const MOCK_SYKEFRAVÆRSSTATISTIKK = true;

if (MOCK_MIN_SIDE_ARBEIDSGIVER) {
    fetchMock.get('/min-side-arbeidsgiver/api/organisasjoner', organisasjoner, { delay: 1000 });
}

if (MOCK_SYKEFRAVÆRSSTATISTIKK) {
    fetchMock.get('express:/sykefravarsstatistikk/api/:orgnr/sammenligning', sykefravarsprosent, {
        delay: 2000,
    });
}

fetchMock.spy();
