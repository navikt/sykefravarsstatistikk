import { rest } from 'msw';
import { iaTjenesterMetrikkerApiUrl } from './iatjenester';

export const iaTjenestemetrikkFeiletHandler = rest.post(
    iaTjenesterMetrikkerApiUrl,
    async (_, res, ctx) => res(ctx.status(500), ctx.json('Ødelagt request for testøyemed'))
);
