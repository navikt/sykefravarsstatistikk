import { sendAnalytics, useAnalytics } from './useAnalytics';
import { amplitudeMock } from '../mocking/amplitude-mock';
import { act, render, waitFor } from '@testing-library/react';
import App, { AppContent } from '../App';
import React from 'react';
import { mockSykefraværNoEkstradata, mockSykefraværWithEkstradata } from '../mocking/data-mocks';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AnalyticsClient } from './client';
import { Sykefravarsstatistikk } from '../hooks/useSykefravarsstatistikk';
import userEvent from '@testing-library/user-event';

let amplitudeMockClient: AnalyticsClient;

beforeEach(() => {
    amplitudeMockClient = amplitudeMock;
    amplitudeMockClient.setUserProperties = jest.fn(amplitudeMockClient.setUserProperties);
    amplitudeMockClient.logEvent = jest.fn(amplitudeMockClient.logEvent);
});

it('Trigger AnalyticsClient#logEvent når sendAnalytics blir kalt', () => {
    act(() => {
        render(
            <MemoryRouter initialEntries={['/sykefravarsstatistikk/?bedrift=910969439']}>
                <App analyticsClient={amplitudeMockClient} />
            </MemoryRouter>
        );
    });
    const eventDataForFirstEvent = {
        type: 'knapp',
        data: {
            someKey: 'someValue',
        },
    };
    sendAnalytics(eventDataForFirstEvent);
    expect(amplitudeMockClient.logEvent).toHaveBeenCalledWith(
        eventDataForFirstEvent.type,
        eventDataForFirstEvent.data
    );

    const eventDataForSecondEvent = {
        type: 'navigere',
        data: {
            someKey: 'someValue',
        },
    };
    sendAnalytics(eventDataForSecondEvent);
    expect(amplitudeMockClient.logEvent).toHaveBeenCalledWith(
        eventDataForSecondEvent.type,
        eventDataForSecondEvent.data
    );

    expect(amplitudeMockClient.logEvent).toHaveBeenCalledTimes(2);
});

it('Klikk på panelene trigger eventer i amplitude', async () => {
    const a = render(<WithAnalytics {...mockSykefraværWithEkstradata} />);
    const b = a.container.querySelector('#ekspanderbart-sammenligningspanel__tittel-knapp-TOTALT');
    a.debug(b!);

    userEvent.click(b!);
    expect(amplitudeMockClient.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'overordnet-sykefravær-sammenlikning',
    });
});

it('sidevisning event kalles med user properties', async () => {
    act(() => {
        render(<WithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    expect(amplitudeMockClient.setUserProperties).toHaveBeenCalledTimes(1);
    expect(amplitudeMockClient.setUserProperties).toHaveBeenCalledWith({
        ekstradata: {
            antallAnsatte: '50-99',
            bransje: undefined,
            korttidSiste4Kvartaler: 'MIDDELS',
            langtidSiste4Kvartaler: 'MIDDELS',
            næring2siffer:
                '84 Offentlig administrasjon og forsvar, og trygdeordninger underlagt offentlig forvaltning',
            prosent: '>16',
            sammenligning: 'virksomhet ligger 8-10 over',
            sykefraværSiste4Kvartaler: 'MIDDELS',
        },
    });
    await waitFor(() => {
        expect(amplitudeMockClient.logEvent).toHaveBeenCalled();
    });
});

it('kaller ikke setUserProperties hvis vi ikke har ekstradata', () => {
    act(() => {
        render(<WithAnalytics {...mockSykefraværNoEkstradata} />);
    });

    expect(amplitudeMockClient.setUserProperties).not.toHaveBeenCalled();
    expect(amplitudeMockClient.logEvent).not.toHaveBeenCalled();
});

const WithAnalytics = (data: Sykefravarsstatistikk) => {
    useAnalytics(amplitudeMockClient);
    return (
        <BrowserRouter basename={'/sykefravarsstatistikk/?bedrift=910969439'}>
            <AppContent {...data} analyticsClient={amplitudeMockClient} />
        </BrowserRouter>
    );
};
