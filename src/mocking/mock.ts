import fetchMock from 'fetch-mock';
import sykefravarsprosent from './sammenligning.json';
import organisasjoner from './organisasjoner.json';

const mockSammenligning = () =>
    fetchMock.get('express:/sykefravarsstatistikk/api/:orgnr/sammenligning', sykefravarsprosent, {
        delay: 2000,
    });
const mockMinSideArbeidsgiver = () =>
    fetchMock.get('/min-side-arbeidsgiver/api/organisasjoner', organisasjoner, { delay: 1000 });

if (process.env.REACT_APP_MOCK_ALL) {
    mockSammenligning();
    mockMinSideArbeidsgiver().spy();
} else if (process.env.REACT_APP_MOCK_MSA) {
    mockMinSideArbeidsgiver().spy();
}
