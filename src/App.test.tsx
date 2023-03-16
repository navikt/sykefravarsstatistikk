import React from 'react';
import { AppContent } from './App';
import { act, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { amplitudeMock } from './api/mockedApiResponses/amplitude-mock';
import { mockAllDatahentingStatusOk } from './api/mockedApiResponses/use-analytics-test-mocks';
import { SykefraværAppData } from './hooks/useSykefraværAppData';

beforeEach(() => {
    jest.spyOn(amplitudeMock, 'setUserProperties');
});

afterEach(() => {
    jest.resetAllMocks();
});

it('renders without crashing', async () => {
    await waitFor(() => {
        render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);
    });
});

it('Amplitude-events sendes med riktige user properties', async () => {
    act(() => {
        render(<AppContentWithRouter {...mockAllDatahentingStatusOk} />);
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
