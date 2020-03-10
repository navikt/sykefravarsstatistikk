import {filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet, hentRestSammenligning} from './api';
import {RestSammenligningStatus} from './sammenligning';

import fetchMock from 'fetch-mock';
import {Sykefraværshistorikk, SykefraværshistorikkType} from "./sykefraværshistorikk";

describe('Tester for hentRestSammenligning', () => {
    afterEach(fetchMock.restore);

    test('hentRestSammenligning håndterer 401 Unauthorized (ikke innlogget bruker)', () => {
        fetchMock.mock('path:/sykefravarsstatistikk/api/99999997/sammenligning', {
            status: 401,
            body: 'Er ikke innlogget',
        });

        hentRestSammenligning('99999997').then(result => {
            expect(result.status).toBe(RestSammenligningStatus.IkkeInnlogget);
        });
    });

    test('hentRestSammenligning håndterer 403 Forbiden (mangler rettigheter i Altinn)', () => {
        fetchMock.mock('path:/sykefravarsstatistikk/api/99999997/sammenligning', {
            status: 403,
            body: 'Har ikke rettigheter i Altinn',
        });

        hentRestSammenligning('99999997').then(result => {
            expect(result.status).toBe(RestSammenligningStatus.HarIkkeRettigheterIAltinn);
        });
    });

    test('hentRestSammenligning returnerer et RestSammenligning objekt', () => {
        fetchMock.mock('path:/sykefravarsstatistikk/api/99999997/sammenligning', {
            status: 200,
            body:
                '{' +
                '"kvartal":4,' +
                '"årstall":2019,' +
                '"virksomhet":{"label":"Fisk og Fugl AS","prosent":31.12,"erMaskert":false},' +
                '"næring":{"label":"Produksjon av nærings- og nytelsesmidler","prosent":5.6,"erMaskert":false},' +
                '"sektor":{"label":"Statlig forvaltning","prosent":5.2,"erMaskert":false},' +
                '"land":{"label":"Norge","prosent":5.5,"erMaskert":false}' +
                '}',
        });

        hentRestSammenligning('99999997').then(result => {
            expect(result.status).toBe(RestSammenligningStatus.Suksess);
            expect(result.sammenligning.kvartal).toBe(4);
            expect(result.sammenligning.årstall).toBe(2019);
            expect(result.sammenligning.virksomhet.prosent).toBe(31.12);
        });
    });
});

describe('Tester for utils funksjoner', () => {
    const historikkUnderenhet: Sykefraværshistorikk = {
        type: SykefraværshistorikkType.VIRKSOMHET,
        label: 'Underenhet AS',
        kvartalsvisSykefraværsprosent: [
            {
                "årstall": 2019,
                "kvartal": 4,
                "erMaskert": false,
                "prosent": 5.5
            },
            {
                "årstall": 2020,
                "kvartal": 1,
                "erMaskert": false,
                "prosent": 6
            },
        ],
    };
    const historikkOverordnetEnhet: Sykefraværshistorikk = {
        type: SykefraværshistorikkType.OVERORDNET_ENHET,
        label: 'Underenhet AS',
        kvartalsvisSykefraværsprosent: [
            {
                "årstall": 2019,
                "kvartal": 4,
                "erMaskert": false,
                "prosent": 5.5
            },
            {
                "årstall": 2020,
                "kvartal": 1,
                "erMaskert": false,
                "prosent": 6
            },
        ],
    };

    test('filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet håndterer tom historikk for overordnet enhet', () => {
        const result: Sykefraværshistorikk[] = filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet(
            [historikkUnderenhet]
        );
        expect(result.length).toBe(1);
    });

    test('filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet håndterer tom historikk for underenhet', () => {
        const result: Sykefraværshistorikk[] = filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet(
            [historikkOverordnetEnhet]
        );
        expect(result.length).toBe(1);
        expect(
            // @ts-ignore
            result.find(
                sykefraværshistorikk =>
                    sykefraværshistorikk.type === SykefraværshistorikkType.OVERORDNET_ENHET
            ).kvartalsvisSykefraværsprosent.length
        ).toBe(2);
    });

    test('filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet filtrerer bort historikk for overordnet enhet', () => {
        const result: Sykefraværshistorikk[] = filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet(
            [historikkUnderenhet, historikkOverordnetEnhet]
        );
        expect(result.length).toBe(2);
        expect(
            // @ts-ignore
            result.find(
                sykefraværshistorikk =>
                    sykefraværshistorikk.type === SykefraværshistorikkType.VIRKSOMHET
            ).kvartalsvisSykefraværsprosent.length
        ).toBe(2);
        expect(
            // @ts-ignore
            result.find(
                sykefraværshistorikk =>
                    sykefraværshistorikk.type === SykefraværshistorikkType.OVERORDNET_ENHET
            ).kvartalsvisSykefraværsprosent.length
        ).toBe(0);
    });

});
