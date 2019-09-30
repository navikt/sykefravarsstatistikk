import fetchMock from 'fetch-mock';
import sykefravarsprosent from './sammenligning.json';

fetchMock.get("/sykefravarsstatistikk/api/sykefravarprosent", sykefravarsprosent);
