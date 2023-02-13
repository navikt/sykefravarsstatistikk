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
import { mockAllDatahentingFeiler, mockAllDatahentingStatusOk } from '../mocking/use-analytics-test-mocks';

describe('useAnalytics', () => {
    const defaultEventData = {
        app: 'sykefravarsstatistikk',
        team: 'teamia',
    };
    const { ResizeObserver } = window;
    beforeEach(() => {
        jest.spyOn(amplitudeMock, 'setUserProperties');
        jest.spyOn(amplitudeMock, 'logEvent');
        renderHook(() => useAnalytics(amplitudeMock));

        // @ts-expect-error
        delete window.ResizeObserver;
        window.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    afterEach(() => {
        jest.resetAllMocks();
        window.ResizeObserver = ResizeObserver;
        jest.restoreAllMocks();
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
        render(<AppContentWithRouter {...mockAllDatahentingFeiler} />);

        expect(amplitudeMock.setUserProperties).not.toHaveBeenCalled();
    });

    it('Kaller bedrift-valgt event når vi velger virksomhet', async () => {
        render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);

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
        render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);

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
        render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);

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
        render(<AppContentWithRouter {...mockAllDatahentingFeiler} />);

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
        render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);
        userEvent.click(screen.getByText('Gå til Arbeidsmiljøportalen'));

        expect(amplitudeMock.logEvent).toHaveBeenLastCalledWith('navigere', {
            ...defaultEventData,
            lenketekst: 'Gå til Arbeidsmiljøportalen',
            destinasjon: 'https://www.arbeidsmiljoportalen.no/bransje/barnehage',
        });
    });

    it('Klikk på sammenlikningspanel sender ikke feil panelnavn til amplitude', async () => {
        const result = render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);
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
            render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);
            userEvent.click(screen.getByText('Gå til Arbeidsmiljøportalen'));
        });

        act(() => {
            expect(amplitudeMock.setUserProperties).toHaveBeenCalledTimes(1);
        });
        act(() => {
            expect(amplitudeMock.setUserProperties).toHaveBeenCalledWith({
                antallAnsatte: '50-99',
                bransje: 'BARNEHAGER',
                sektor: 'offentlig',
                næring2siffer: '88 Sosiale omsorgstjenester uten botilbud',
                prosent: '10-12',
                sykefraværsvurdering: 'UNDER',
            });
        });
    });

    const AppContentWithRouter = (data: SykefraværAppData) => {
        return (
            <BrowserRouter>
                <AppContent {...data} analyticsClient={amplitudeMock} />
            </BrowserRouter>
        );
    };
});
