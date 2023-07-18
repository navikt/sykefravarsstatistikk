import React from 'react';
import { AppContent } from './App';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { amplitudeMock } from './api/mockedApiResponses/amplitude-mock';
import {
    mockAllDatahentingStatusLaster,
    mockAllDatahentingStatusOk,
} from './api/mockedApiResponses/use-analytics-test-mocks';
import { SykefraværAppData } from './hooks/useSykefraværAppData';
import { MockResizeObserver } from '../jest/MockResizeObserver';
import { axe } from 'jest-axe';

describe('App', () => {
    const MockObserver = new MockResizeObserver();
    beforeEach(() => {
        jest.spyOn(amplitudeMock, 'setUserProperties');
        MockObserver.startmock();
    });

    afterEach(() => {
        MockObserver.stopmock();
        jest.resetAllMocks();
    });

    it('renders without crashing', async () => {
        render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);
    });

    it('renders without data without crashing', async () => {
        render(<AppContentWithRouter {...mockAllDatahentingStatusLaster} />);
    });

    it('Amplitude-events sendes med riktige user properties', async () => {
        render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);

        await waitFor(() => {
            expect(amplitudeMock.setUserProperties).toHaveBeenCalledTimes(1);
        });
        await waitFor(() => {
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

    it('Har ingen uu-feil fra axe', async () => {
        const { container } = render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('Axe fungerer og sier fra om feil', async () => {
        const { container } = render(
            <div>
                <h1>ein</h1>
                <h3>drei</h3>
            </div>
        );
        const results = await axe(container);

        expect(results).not.toHaveNoViolations();
    });

    const AppContentWithRouter = (data: SykefraværAppData) => {
        return (
            <BrowserRouter>
                <AppContent {...data} analyticsClient={amplitudeMock} RoutesComponent={Routes} />
            </BrowserRouter>
        );
    };
});
