import fetchMock from 'fetch-mock';
import sykefravarsprosent from './sammenligning.json';
import organisasjoner from './organisasjoner.json';

const mockSammenligning = () => fetchMock.get('express:/sykefravarsstatistikk/api/:orgnr/sammenligning', sykefravarsprosent);
const mockSammenligningForbidden = () => fetchMock.get('express:/sykefravarsstatistikk/api/:orgnr/sammenligning', {status: 403, body: "You are not authorized to view this resource"});
const mockMinSideArbeidsgiver = () => fetchMock.get('/min-side-arbeidsgiver/api/organisasjoner', organisasjoner);

if (process.env.REACT_APP_MOCK_ALL) {
    mockSammenligning();
    mockMinSideArbeidsgiver().spy()
} else if (process.env.REACT_APP_MOCK_FORBIDDEN) {
    mockSammenligningForbidden();
    mockMinSideArbeidsgiver().spy();
} else if (process.env.REACT_APP_MOCK_MSA) {
    mockMinSideArbeidsgiver().spy()
}
