import fetchMock from 'fetch-mock';
import sykefravarsprosent from './sammenligning.json';
import organisasjoner from './organisasjoner.json';

fetchMock.get('express:/sykefravarsstatistikk/api/:orgnr/sammenligning', sykefravarsprosent);
fetchMock.get('/min-side-arbeidsgiver/api/organisasjoner', organisasjoner).spy();
