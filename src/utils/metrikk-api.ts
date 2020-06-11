import { FRONTEND_API_PATH } from '../konstanter';

const METRIKK_PATH = FRONTEND_API_PATH + '/metrikker';

export const sendMetrikker = (event: string): void => {
    fetch(METRIKK_PATH + '/' + event, { method: 'POST' });
};
