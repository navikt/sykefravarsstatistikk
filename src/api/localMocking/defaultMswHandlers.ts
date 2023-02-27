import { rest } from 'msw';
import { lagMockHistorikkForNæring } from '../mockedApiResponses/sykefraværshistorikk-mock';
import { aggregertMockData } from '../mockedApiResponses/aggregert-mock';
import {
    getOrganisasjonerBrukerHarIaRettigheterTilMock,
    getOrganisasjonerMock,
} from '../mockedApiResponses/altinn-mock';
import { getMockPubliseringsdatoer } from '../mockedApiResponses/mock-publiseringsdatoer';
import { underenheterResponseMock } from '../../enhetsregisteret/api/mocks/underenheter-api-mocks';

export const defaultMswHandlers = [
    rest.post('https://amplitude.nav.no/collect-auto', async (req, res, ctx) => {
        await ctx.fetch(req);
        return res(ctx.status(200));
    }),

    rest.post('https://amplitude.nav.no/collect', async (req, res, ctx) => {
        await ctx.fetch(req);
        return res(ctx.status(200));
    }),

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
        return res(ctx.status(200), ctx.json(getOrganisasjonerBrukerHarIaRettigheterTilMock()));
    }),

    rest.get('https://data.brreg.no/enhetsregisteret/api/enheter/:orgnr', (req, res, ctx) => {
        const orgnr = req.url.toString().match(/[0-9]{9}/)![0];
        return res(
            ctx.status(200),
            ctx.json({
                orgnr: orgnr,
                institusjonellSektorkode: { kode: '6500', beskrivelse: 'Offentlig sektor' },
            })
        );
    }),

    rest.get('https://data.brreg.no/enhetsregisteret/api/underenheter/:orgnr', (req, res, ctx) => {
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
        '/sykefravarsstatistikk/proxy/ia-tjenester-metrikker/innlogget/mottatt-iatjeneste',
        (_, res, ctx) => {
            return res(ctx.status(201));
        }
    ),

    rest.post('/sykefravarsstatistikk/notifikasjon-bruker-api', async (req) => {
        // håndteres av "arbeidsgiver-notifikasjoner-brukerapi-mock"
        return req.passthrough();
    }),
];