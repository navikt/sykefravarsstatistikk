import { rest } from 'msw';
import { lagMockHistorikkForNæring } from './sykefraværshistorikk-mock';
import { aggregertMockData } from './aggregert-mock';
import { getOrganisasjonerMedStatistikktilgangMock, getOrganisasjonerMock } from './altinn-mock';
import { getMockPubliseringsdatoer } from './mock-publiseringsdatoer';
import { underenheterResponseMock } from '../enhetsregisteret/api/mocks/underenheter-api-mocks';

export const commonHandlers = [
    // La alle handlere her være uavhengig av orgnummer
    // TODO: Sett opp egne handlers for spesifikke orgnumre
    rest.get(
        '/sykefravarsstatistikk/api/:orgnr/sykefravarshistorikk/kvartalsvis',
        (_, res, ctx) => {
            return res(ctx.status(200), ctx.json(lagMockHistorikkForNæring()));
        }
    ),

    rest.get(
        '/sykefravarsstatistikk/api/:orgnr/v1/sykefravarshistorikk/aggregert',
        (_, res, ctx) => {
            return res(ctx.status(200), ctx.json(aggregertMockData));
        }
    ),

    rest.get('/sykefravarsstatistikk/api/organisasjoner', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(getOrganisasjonerMock()));
    }),

    rest.get('/sykefravarsstatistikk/api/publiseringsdato', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(getMockPubliseringsdatoer()));
    }),

    rest.get('/sykefravarsstatistikk/api/organisasjoner/statistikk', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(getOrganisasjonerMedStatistikktilgangMock()));
    }),

    rest.get('https://data.brreg.no/enhetsregisteret/api/enheter/', (req, res, ctx) => {
        // TODO: Sjekk om denne brukes
        const orgnr = req.url.toString().match(/[0-9]{9}/)![0];
        return res(
            ctx.status(200),
            ctx.json({
                orgnr: orgnr,
                institusjonellSektorkode: { kode: '6500', beskrivelse: 'Offentlig sektor' },
            })
        );
    }),

    rest.get('https://data.brreg.no/enhetsregisteret/api/underenheter/', (req, res, ctx) => {
        // TODO: Sjekk om denne brukes
        const orgnr = req.url.toString().match(/[0-9]{9}/)![0];
        return res(
            ctx.status(200),
            ctx.json({
                ...underenheterResponseMock,
                organisasjonsnummer: orgnr,
            })
        );
    }),

    rest.post(
        'sykefravarsstatistikk/proxy/ia-tjenester-metrikker/innlogget/mottatt-iatjeneste',
        (_, res, ctx) => {
            return res(ctx.status(201));
        }
    ),

    rest.post('/sykefravarsstatistikk/notifikasjon-bruker-api', async (_) => {
        // eget mock-bibliotek for notifikasjon-bruker-api, trenger ikke håndteres av MSW
    }),
];