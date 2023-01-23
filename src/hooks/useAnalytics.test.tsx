import { sendAnalytics, useAnalytics } from './useAnalytics';
import { amplitudeMock } from '../mocking/amplitude-mock';
import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SykefraværAppData } from './useSykefraværAppData';
import userEvent from '@testing-library/user-event';
import { AppContent } from '../App';
import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks';
import { Statistikkategori } from '../api/summert-sykefraværshistorikk-api';
import { AggregertStatistikk } from './useAggregertStatistikk';
import { siste4KvartalerMock } from '../mocking/summert-sykefraværshistorikk-mock';
import { RestStatus } from '../api/api-utils';
import { getMockPubliseringsdatoer } from '../mocking/mock-publiseringsdatoer';
import { underenheterResponseMock } from '../enhetsregisteret/api/mocks/underenheter-api-mocks';
import { mapTilUnderenhet } from '../enhetsregisteret/api/underenheter-api';
import {
    getOrganisasjonerBrukerHarTilgangTilMock,
    getOrganisasjonerMock,
} from '../mocking/altinn-mock';

describe('useAnalytics', () => {
    const defaultEventData = {
        app: 'sykefravarsstatistikk',
        team: 'teamia',
    };
    const aggStat = new Map<Statistikkategori, AggregertStatistikk>();
    aggStat.set(Statistikkategori.VIRKSOMHET, {
        prosentSiste4KvartalerTotalt: {
            statistikkategori: Statistikkategori.VIRKSOMHET,
            label: 'Virksomheten min',
            kvartalerIBeregningen: siste4KvartalerMock,
            verdi: '10.0',
            antallPersonerIBeregningen: 100,
        },
    });
    aggStat.set(Statistikkategori.NÆRING, {
        prosentSiste4KvartalerTotalt: {
            statistikkategori: Statistikkategori.NÆRING,
            label: 'Næringa mi',
            kvartalerIBeregningen: siste4KvartalerMock,
            verdi: '12.0',
            antallPersonerIBeregningen: 1000,
        },
    });
    aggStat.set(Statistikkategori.NÆRING, {});

    const allDatahentingOk: SykefraværAppData = {
        aggregertStatistikk: { restStatus: RestStatus.Suksess, aggregertData: aggStat },
        altinnOrganisasjoner: { status: RestStatus.Suksess, data: getOrganisasjonerMock() },
        altinnOrganisasjonerMedStatistikktilgang: {
            status: RestStatus.Suksess,
            data: getOrganisasjonerBrukerHarTilgangTilMock(),
        },
        enhetsregisterdata: {
            restUnderenhet: {
                status: RestStatus.Suksess,
                data: mapTilUnderenhet(underenheterResponseMock),
            },
            restOverordnetEnhet: {
                status: RestStatus.Suksess,
                data: {
                    orgnr: '11111111',
                    institusjonellSektorkode: { kode: '6100', beskrivelse: 'min sektor' },
                },
            },
        },
        publiseringsdatoer: { status: RestStatus.Suksess, data: getMockPubliseringsdatoer() },
        sykefraværshistorikk: { status: RestStatus.Suksess, data: [] },
    };

    const allDatahentingFeiler: SykefraværAppData = {
        aggregertStatistikk: { restStatus: RestStatus.Feil },
        altinnOrganisasjoner: { status: RestStatus.Feil },
        altinnOrganisasjonerMedStatistikktilgang: { status: RestStatus.Feil },
        enhetsregisterdata: {
            restUnderenhet: { status: RestStatus.Feil },
            restOverordnetEnhet: {
                status: RestStatus.Feil,
            },
        },
        publiseringsdatoer: { status: RestStatus.Feil },
        sykefraværshistorikk: { status: RestStatus.Feil },
    };

    beforeEach(() => {
        jest.spyOn(amplitudeMock, 'setUserProperties');
        jest.spyOn(amplitudeMock, 'logEvent');
        renderHook(() => useAnalytics(amplitudeMock));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Trigger AnalyticsClient#logEvent når sendAnalytics blir kalt', async () => {
        const eventname = 'dummyEvent';
        const eventData = {
            ...defaultEventData,
            someKey: 'someValue',
        };
        sendAnalytics(eventname, eventData);
        expect(amplitudeMock.logEvent).toHaveBeenCalled();
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith(eventname, {
            ...eventData,
        });
    });

    it('Kaller ikke setUserProperties hvis vi ikke har ekstradata', async () => {
        render(<AppContentWithRouter {...allDatahentingFeiler} />);

        expect(amplitudeMock.setUserProperties).not.toHaveBeenCalled();
    });

    it('Kaller bedrift-valgt event når vi velger virksomhet', async () => {
        render(<AppContentWithRouter {...allDatahentingOk} />);

        const virksomhetsvelger = await screen.findByLabelText(/Velg aktiv virksomhet/i);
        userEvent.click(virksomhetsvelger);

        const ønsketOverenhet = await screen.findByText(/111111111/i);
        userEvent.click(ønsketOverenhet);

        const ønsketVirsomhet = await screen.findByText(/444444444/i);
        userEvent.click(ønsketVirsomhet);
        await waitFor(() => {
            expect(amplitudeMock.logEvent).toHaveBeenLastCalledWith(
                'bedrift valgt',
                defaultEventData
            );
        });
    });

    it('Klikk på les-mer-panel sender panel-ekspander event til Amplitude', async () => {
        render(<AppContentWithRouter {...allDatahentingOk} />);

        const lesMerPanel = screen.getByRole('button', {
            name: 'Slik har vi kommet fram til ditt resultat',
        });

        userEvent.click(lesMerPanel);
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
            'panel-ekspander',
            expect.objectContaining({
                panelnavn: 'Slik har vi kommet fram til ditt resultat',
            })
        );
    });

    it('To klikk på les-mer-panel sender panel-kollaps event til Amplitude', async () => {
        render(<AppContentWithRouter {...allDatahentingOk} />);

        const lesMerPanel = screen.getByRole('button', {
            name: 'Slik har vi kommet fram til ditt resultat',
        });

        userEvent.click(lesMerPanel);
        expect(amplitudeMock.logEvent).not.toHaveBeenCalledWith(
            'panel-kollaps',
            expect.objectContaining({})
        );

        userEvent.click(lesMerPanel);
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
            'panel-kollaps',
            expect.objectContaining({
                panelnavn: 'Slik har vi kommet fram til ditt resultat',
            })
        );
    });

    it('Klikk på sammenlikningspanelene trigger events i amplitude', async () => {
        render(<AppContentWithRouter {...allDatahentingFeiler} />);

        const sammenlikningspanel_total = document.querySelector(
            '#ekspanderbart-sammenligningspanel__tittel-knapp-TOTALT'
        );
        const sammenlikningspanel_gradert = document.querySelector(
            '#ekspanderbart-sammenligningspanel__tittel-knapp-GRADERT'
        );
        const sammenlikningspanel_langtid = document.querySelector(
            '#ekspanderbart-sammenligningspanel__tittel-knapp-LANGTID'
        );
        const sammenlikningspanel_korttid = document.querySelector(
            '#ekspanderbart-sammenligningspanel__tittel-knapp-KORTTID'
        );

        userEvent.click(sammenlikningspanel_total!);
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
            'panel-ekspander',
            expect.objectContaining({
                panelnavn: 'TOTALT',
            })
        );

        userEvent.click(sammenlikningspanel_gradert!);
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
            'panel-ekspander',
            expect.objectContaining({
                panelnavn: 'GRADERT',
            })
        );

        userEvent.click(sammenlikningspanel_langtid!);
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
            'panel-ekspander',
            expect.objectContaining({
                panelnavn: 'LANGTID',
            })
        );

        userEvent.click(sammenlikningspanel_korttid!);
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
            'panel-ekspander',
            expect.objectContaining({
                panelnavn: 'KORTTID',
            })
        );
    });

    it('Klikk på lenke til Arbeidsmiljøportalen trigger event i amplitude', async () => {
        render(<AppContentWithRouter {...allDatahentingOk} />);
        userEvent.click(screen.getByText('Gå til Arbeidsmiljøportalen'));

        expect(amplitudeMock.logEvent).toHaveBeenLastCalledWith(
            'navigere',
            expect.objectContaining({
                lenketekst: 'Gå til Arbeidsmiljøportalen',
                destinasjon: 'https://www.arbeidsmiljoportalen.no',
            })
        );
    });

    it('Klikk på sammenlikningspanel sender ikke feil panelnavn til amplitude', async () => {
        const result = render(<AppContentWithRouter {...allDatahentingOk} />);
        expect(
            await result.container.querySelector(
                '#ekspanderbart-sammenligningspanel__tittel-knapp-GRADERT'
            )
        ).toBeInTheDocument();

        const panel = result.container.querySelector(
            '#ekspanderbart-sammenligningspanel__tittel-knapp-GRADERT'
        );
        userEvent.click(panel!);

        expect(amplitudeMock.logEvent).not.toHaveBeenCalledWith(
            'panel-ekspander',
            expect.objectContaining({
                panelnavn: 'TOTALT',
                app: 'sykefravarsstatistikk',
            })
        );
    });

    it('navigere-event kalles med riktige user properties', async () => {
        act(() => {
            render(<AppContentWithRouter {...allDatahentingOk} />);
            userEvent.click(screen.getByText('Gå til Arbeidsmiljøportalen'));
        });

        act(() => {
            expect(amplitudeMock.setUserProperties).toHaveBeenCalledTimes(1);
        });
        act(() => {
            expect(amplitudeMock.setUserProperties).toHaveBeenCalledWith({
                antallAnsatte: '50-99',
                bransje: undefined,
                sektor: 'offentlig',
                næring: '84 Offentlig administrasjon og forsvar, og trygdeordninger underlagt offentlig forvaltning',
                prosent: '>16',
                sammenligning: 'virksomhet ligger 8-10 over',
                sykefraværSiste4Kvartaler: 'MIDDELS',
            });
        });
    });

    it('Klikk på "Gå til sykefravær over tid" rendrer navigere-event', async () => {
        await waitFor(() => {
            render(<AppContentWithRouter {...allDatahentingOk} />);
        });

        const knappTilHistorikk = screen.getAllByRole('link', {
            name: /Gå til sykefravær over tid/i,
        })[0];
        userEvent.click(knappTilHistorikk);

        expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
            'navigere',
            expect.objectContaining({
                destinasjon: '/historikk',
                lenketekst: 'Gå til sykefravær over tid',
            })
        );
    });

    const AppContentWithRouter = (data: SykefraværAppData) => {
        return (
            <BrowserRouter>
                <AppContent {...data} analyticsClient={amplitudeMock} />
            </BrowserRouter>
        );
    };
});
