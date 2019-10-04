import fetchMock from 'fetch-mock';
import sykefravarsprosent from './sammenligning.json';
import organisasjoner from './organisasjoner.json';

fetchMock.get('/sykefravarsstatistikk/api/sammenligning', sykefravarsprosent);
fetchMock
    .get(
        'https://arbeidsgiver.nais.preprod.local/ditt-nav-arbeidsgiver-api/organisasjoner',
        organisasjoner
    )
    .spy();
