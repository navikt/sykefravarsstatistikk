import { rest } from 'msw';
import { iaTjenesterMetrikkerApiUrl } from './iatjenester';

const iaMetrikkOpprettet = rest.get(iaTjenesterMetrikkerApiUrl, async (req, res, ctx) =>
    res(ctx.json([{ status: 'created' }]))
);

export const iaMetrikkFeilet = rest.get(iaTjenesterMetrikkerApiUrl, async (req, res, ctx) =>
    res(ctx.status(500), ctx.json('Ødelagt request for testøyemed'))
);

// Default-respons eksporteres her
export const handlers = [iaMetrikkOpprettet];
