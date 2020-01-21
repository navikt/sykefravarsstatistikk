import { FRONTEND_API_PATH } from '../server/konstanter';

const METRIKK_PATH = FRONTEND_API_PATH + '/metrikker';

export const sendEvent = (event: string): void => {
    fetch(METRIKK_PATH + '/' + event, { method: 'POST' });
};
