import { sendAnalytics, useAnalytics } from './useAnalytics';
import { amplitudeMock } from '../mocking/amplitude-mock';
import { act, render, waitFor } from '@testing-library/react';
import App, { AppContent } from '../App';
import React from 'react';
import { mockSykefraværNoEkstradata, mockSykefraværWithEkstradata } from '../mocking/data-mocks';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { SykefraværAppData } from '../hooks/useSykefraværAppData';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    jest.spyOn(amplitudeMock, 'setUserProperties');
    jest.spyOn(amplitudeMock, 'logEvent');
});

afterEach(() => {
    jest.restoreAllMocks();
});

it('Trigger AnalyticsClient#logEvent når sendAnalytics blir kalt', () => {
    act(() => {
        render(
            <MemoryRouter initialEntries={['/sykefravarsstatistikk/?bedrift=910969439']}>
                <App analyticsClient={amplitudeMock} />
            </MemoryRouter>
        );
    });
    const eventDataForFirstEvent = {
        eventname: 'knapp',
        data: {
            someKey: 'someValue',
        },
    };
    sendAnalytics(eventDataForFirstEvent);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        eventDataForFirstEvent.eventname,
        eventDataForFirstEvent.data
    );

    const eventDataForSecondEvent = {
        eventname: 'navigere',
        data: {
            someKey: 'someValue',
        },
    };
    sendAnalytics(eventDataForSecondEvent);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        eventDataForSecondEvent.eventname,
        eventDataForSecondEvent.data
    );

    expect(amplitudeMock.logEvent).toHaveBeenCalledTimes(2);
});

it('Klikk på panelene trigger eventer i amplitude', async () => {
    const { container } = render(<WithAnalytics {...mockSykefraværWithEkstradata} />);
    const panel = container.querySelector(
        '#ekspanderbart-sammenligningspanel__tittel-knapp-TOTALT'
    );

    userEvent.click(panel!);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'TOTALT',
        app: 'sykefravarsstatistikk',
    });
});

it('Klikk på panel trigger sender riktig panelnavn i amplitude', () => {
    const { container } = render(<WithAnalytics {...mockSykefraværWithEkstradata} />);
    const panel = container.querySelector(
        '#ekspanderbart-sammenligningspanel__tittel-knapp-GRADERT'
    );

    userEvent.click(panel!);
    expect(amplitudeMock.logEvent).not.toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'TOTALT',
        app: 'sykefravarsstatistikk',
    });
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'GRADERT',
        app: 'sykefravarsstatistikk',
    });
});

it('sidevisning event kalles med user properties', async () => {
    act(() => {
        render(<WithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    expect(amplitudeMock.setUserProperties).toHaveBeenCalledTimes(1);
    expect(amplitudeMock.setUserProperties).toHaveBeenCalledWith({
        antallAnsatte: '50-99',
        bransje: undefined,
        korttidSiste4Kvartaler: 'MIDDELS',
        langtidSiste4Kvartaler: 'MIDDELS',
        næring2siffer:
            '84 Offentlig administrasjon og forsvar, og trygdeordninger underlagt offentlig forvaltning',
        prosent: '>16',
        sammenligning: 'virksomhet ligger 8-10 over',
        sykefraværSiste4Kvartaler: 'MIDDELS',
    });
    await waitFor(() => {
        expect(amplitudeMock.logEvent).toHaveBeenCalledTimes(2);
        expect(amplitudeMock.logEvent).toHaveBeenNthCalledWith(1, 'sidevisning', {
            app: 'sykefravarsstatistikk',
            url: '/sykefravarsstatistikk/',
        });
        expect(amplitudeMock.logEvent).toHaveBeenNthCalledWith(
            2,
            '#sykefravarsstatistikk-banner-bedrift valgt',
            {}
        );
    });
});

it('kaller ikke setUserProperties hvis vi ikke har ekstradata', () => {
    act(() => {
        render(<WithAnalytics {...mockSykefraværNoEkstradata} />);
    });

    expect(amplitudeMock.setUserProperties).not.toHaveBeenCalled();
    expect(amplitudeMock.logEvent).not.toHaveBeenCalled();
});

const WithAnalytics = (data: SykefraværAppData) => {
    useAnalytics(amplitudeMock);
    return (
        <BrowserRouter basename={'/sykefravarsstatistikk/?bedrift=910969439'}>
            <AppContent {...data} analyticsClient={amplitudeMock} />
        </BrowserRouter>
    );
};
