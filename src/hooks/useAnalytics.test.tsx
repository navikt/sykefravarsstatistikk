import { sendAnalytics, useAnalytics } from './useAnalytics';
import { amplitudeMock } from '../api/mockedApiResponses/amplitude-mock';
import { render, screen, waitFor, renderHook } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { SykefraværAppData } from './useSykefraværAppData';
import userEvent from '@testing-library/user-event';
import { AppContent } from '../App';
import '@testing-library/jest-dom';
import {
    mockAllDatahentingFeiler,
    mockAllDatahentingStatusOk,
} from '../api/mockedApiResponses/use-analytics-test-mocks';
import { MockResizeObserver } from '../../jest/MockResizeObserver';
import { axe } from 'jest-axe';

describe('useAnalytics', () => {
    const defaultEventData = {
        app: 'sykefravarsstatistikk',
        team: 'teamia',
    };

    const MockObserver = new MockResizeObserver();
    beforeEach(() => {
        jest.spyOn(amplitudeMock, 'setUserProperties');
        jest.spyOn(amplitudeMock, 'logEvent');

        MockObserver.startmock();
    });

    afterEach(() => {
        jest.resetAllMocks();
        MockObserver.stopmock();
        jest.restoreAllMocks();
    });

    it('Trigger AnalyticsClient#logEvent når sendAnalytics blir kalt', async () => {
        renderHook(() => useAnalytics(amplitudeMock));

        const eventname = 'dummyEvent';
        const eventData = {
            someKey: 'someValue',
        };
        sendAnalytics(eventname, eventData);
        expect(amplitudeMock.logEvent).toHaveBeenCalled();
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith(eventname, {
            ...defaultEventData,
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
        await userEvent.click(virksomhetsvelger);

        const ønsketOverenhet = await screen.findByText(/111111111/i);
        await userEvent.click(ønsketOverenhet);

        const ønsketVirsomhet = await screen.findByText(/444444444/i);
        await userEvent.click(ønsketVirsomhet);
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

        await userEvent.click(lesMerPanel);
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
            'panel-ekspander',
            expect.objectContaining({
                panelnavn: 'Slik har vi kommet fram til ditt resultat',
            })
        );
    });

    it('Har ingen uu-feil fra axe', async () => {
        const { container } = render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    const AppContentWithRouter = (data: SykefraværAppData) => {
        return (
            <BrowserRouter>
                <AppContent {...data} analyticsClient={amplitudeMock} RoutesComponent={Routes} />
            </BrowserRouter>
        );
    };
});
