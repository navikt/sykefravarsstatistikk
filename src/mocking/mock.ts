import fetchMock from 'fetch-mock';
import sykefravarsprosent from './sykefravarsprosent.json';

fetchMock.get("/sykefravarsstatistikk/api/sykefravarprosent", sykefravarsprosent);
