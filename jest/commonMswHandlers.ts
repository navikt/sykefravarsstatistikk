import { rest } from 'msw';
import { iaTjenesterMetrikkerApiUrl } from '../src/metrikker/iatjenester';

export const commonHandlers = [
    // Mock suksessfult kall til IA-metrikker
    rest.post(iaTjenesterMetrikkerApiUrl, async (_, res, ctx) => {
        return res(ctx.json({ status: 'created' }));
    }),

    rest.post('/sykefravarsstatistikk/notifikasjon-bruker-api', async (_, res, ctx) => {
        return res(
            ctx.json({
                data: {
                    notifikasjoner: {
                        feilAltinn: false,
                        feilDigiSyfo: false,
                        notifikasjoner: [],
                        __typename: 'NotifikasjonerResultat',
                    },
                },
            })
        );
    }),
];
