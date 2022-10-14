import { rest } from 'msw';
import { iaTjenesterMetrikkerApiUrl } from '../src/metrikker/iatjenester';

export const commonHandlers = [
    // Mock suksessfult kall til IA-metrikker
    rest.post(iaTjenesterMetrikkerApiUrl, async (_, res, ctx) => {
        return res(ctx.json({ status: 'created' }));
    }),
];

// /sykefravarsstatistikk/proxy/ia-tjenester-metrikker/innlogget/mottatt-iatjeneste
// /sykefravarsstatistikk/proxy/ia-tjenester-metrikker/innlogget/mottatt-iatjeneste
