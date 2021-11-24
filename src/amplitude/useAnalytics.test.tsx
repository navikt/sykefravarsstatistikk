import { sendAnalytics, useAnalytics } from './useAnalytics';
import { amplitudeMock } from '../mocking/amplitude-mock';
import { act, render, waitFor } from '@testing-library/react';
import App, { AppContent } from '../App';
import React from 'react';
import { mockSykefraværNoEkstradata, mockSykefraværWithEkstradata } from '../mocking/data-mocks';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AnalyticsClient } from './client';
import { SykefraværAppData } from '../hooks/useSykefravarsstatistikk';
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
        eventname: 'knapp',
        data: {
            someKey: 'someValue',
        },
    };
    sendAnalytics(eventDataForFirstEvent);
    expect(amplitudeMockClient.logEvent).toHaveBeenCalledWith(
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
    expect(amplitudeMockClient.logEvent).toHaveBeenCalledWith(
        eventDataForSecondEvent.eventname,
        eventDataForSecondEvent.data
    );

    expect(amplitudeMockClient.logEvent).toHaveBeenCalledTimes(2);
});

it('Klikk på sammenlikningspanelene trigger events i amplitude', async () => {
    const { container } = render(<WithAnalytics {...mockSykefraværWithEkstradata} />);

    const sammenlikningspanel_total = container.querySelector(
        '#ekspanderbart-sammenligningspanel__tittel-knapp-TOTALT'
    );
    const sammenlikningspanel_gradert = container.querySelector(
        '#ekspanderbart-sammenligningspanel__tittel-knapp-GRADERT'
    );
    const sammenlikningspanel_langtid = container.querySelector(
        '#ekspanderbart-sammenligningspanel__tittel-knapp-LANGTID'
    );
    const sammenlikningspanel_korttid = container.querySelector(
        '#ekspanderbart-sammenligningspanel__tittel-knapp-KORTTID'
    );

    userEvent.click(sammenlikningspanel_total!);
    expect(amplitudeMockClient.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'TOTALT',
        app: 'sykefravarsstatistikk',
    });

    userEvent.click(sammenlikningspanel_gradert!);
    expect(amplitudeMockClient.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'GRADERT',
        app: 'sykefravarsstatistikk',
    });

    userEvent.click(sammenlikningspanel_langtid!);
    expect(amplitudeMockClient.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'LANGTID',
        app: 'sykefravarsstatistikk',
    });

    userEvent.click(sammenlikningspanel_korttid!);
    expect(amplitudeMockClient.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'KORTTID',
        app: 'sykefravarsstatistikk',
    });
});

it('Klikk på lenke til Arbeidsmiljøportalen genererer event i amplitude', () => {
    const a = render(<WithAnalytics {...mockSykefraværWithEkstradata} />);
    userEvent.click(a.getByText('Gå til Arbeidsmiljøportalen'));

    expect(amplitudeMockClient.logEvent).toHaveBeenLastCalledWith('navigere', {
        app: 'sykefravarsstatistikk',
        url: '/',
        lenketekst: 'Gå til Arbeidsmiljøportalen',
        destinasjon: 'https://www.arbeidsmiljoportalen.no',
    });
});

it('Klikk på sammenlikningspanel sender ikke feil panelnavn til amplitude', () => {
    const { container } = render(<WithAnalytics {...mockSykefraværWithEkstradata} />);
    const panel = container.querySelector(
        '#ekspanderbart-sammenligningspanel__tittel-knapp-GRADERT'
    );

    userEvent.click(panel!);
    expect(amplitudeMockClient.logEvent).not.toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'TOTALT',
        app: 'sykefravarsstatistikk',
    });
});

it('sidevisning event kalles med riktige user properties', async () => {
    act(() => {
        render(<WithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    expect(amplitudeMockClient.setUserProperties).toHaveBeenCalledTimes(1);
    expect(amplitudeMockClient.setUserProperties).toHaveBeenCalledWith({
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
        expect(amplitudeMockClient.logEvent).toHaveBeenCalledTimes(2);
        expect(amplitudeMockClient.logEvent).toHaveBeenNthCalledWith(1, 'sidevisning', {
            app: 'sykefravarsstatistikk',
            url: '/sykefravarsstatistikk/',
        });
        expect(amplitudeMockClient.logEvent).toHaveBeenNthCalledWith(
            2,
            '#sykefravarsstatistikk-banner-bedrift valgt',
            {}
        );
    });
});

// TODO runar: test for at sidevisning-event kjører på nytt dersom brukeren bytter bedrift

it('Kaller ikke setUserProperties hvis vi ikke har ekstradata', () => {
    act(() => {
        render(<WithAnalytics {...mockSykefraværNoEkstradata} />);
    });

    expect(amplitudeMockClient.setUserProperties).not.toHaveBeenCalled();
    expect(amplitudeMockClient.logEvent).not.toHaveBeenCalled();
});

const WithAnalytics = (data: SykefraværAppData) => {
    useAnalytics(amplitudeMockClient);
    return (
        <BrowserRouter basename={'/sykefravarsstatistikk/?bedrift=910969439'}>
            <AppContent {...data} analyticsClient={amplitudeMockClient} />
        </BrowserRouter>
    );
};
