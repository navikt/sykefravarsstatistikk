import { sendAnalytics, useAnalytics } from './useAnalytics';
import { amplitudeMock } from '../mocking/amplitude-mock';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { mockSykefraværNoEkstradata, mockSykefraværWithEkstradata } from '../mocking/data-mocks';
import { BrowserRouter } from 'react-router-dom';
import { SykefraværAppData } from '../hooks/useSykefraværAppData';
import userEvent from '@testing-library/user-event';
import { AppContent } from '../App';

beforeEach(() => {
    jest.spyOn(amplitudeMock, 'setUserProperties');
    jest.spyOn(amplitudeMock, 'logEvent');
});

afterEach(() => {
    jest.restoreAllMocks();
});

it('Trigger AnalyticsClient#logEvent når sendAnalytics blir kalt', async () => {
    await waitFor(() => {
        render(<AppWithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    const eventDataForFirstEvent = {
        eventname: 'knapp',
        data: {
            app: 'someValue',
            url: 'someValue',
            someKey: 'someValue',
        },
    };

    sendAnalytics(eventDataForFirstEvent);

    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        eventDataForFirstEvent.eventname,
        eventDataForFirstEvent.data
    );
});

it('Klikk på les-mer-panelet sender panel-ekspander event til Amplitude', () => {
    const page = render(<AppWithAnalytics {...mockSykefraværWithEkstradata} />);
    const lesMerPanel = page.getByText('Slik har vi kommet fram til ditt resultat');

    userEvent.click(lesMerPanel);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        app: 'sykefravarsstatistikk',
        url: '/sykefravarsstatistikk/',
        panelnavn: 'slik-har-vi-kommet-fram-til-ditt-resultat',
    });
});

it('Klikk på sammenlikningspanelene trigger events i amplitude', async () => {
    await waitFor(() => {
        render(<AppWithAnalytics {...mockSykefraværWithEkstradata} />);
    });
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
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'TOTALT',
        app: 'sykefravarsstatistikk',
        url: '/sykefravarsstatistikk/',
    });

    userEvent.click(sammenlikningspanel_gradert!);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'GRADERT',
        app: 'sykefravarsstatistikk',
        url: '/sykefravarsstatistikk/',
    });

    userEvent.click(sammenlikningspanel_langtid!);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'LANGTID',
        app: 'sykefravarsstatistikk',
        url: '/sykefravarsstatistikk/',
    });

    userEvent.click(sammenlikningspanel_korttid!);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'KORTTID',
        app: 'sykefravarsstatistikk',
        url: '/sykefravarsstatistikk/',
    });
});

it('Klikk på lenke til Arbeidsmiljøportalen genererer event i amplitude', () => {
    const page = render(<AppWithAnalytics {...mockSykefraværWithEkstradata} />);
    userEvent.click(page.getByText('Gå til Arbeidsmiljøportalen'));

    expect(amplitudeMock.logEvent).toHaveBeenLastCalledWith('navigere', {
        app: 'sykefravarsstatistikk',
        url: '/sykefravarsstatistikk/',
        lenketekst: 'Gå til Arbeidsmiljøportalen',
        destinasjon: 'https://www.arbeidsmiljoportalen.no',
    });
});

it('Klikk på sammenlikningspanel sender ikke feil panelnavn til amplitude', async () => {
    await waitFor(() => {
        render(<AppWithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    const panel = document.querySelector(
        '#ekspanderbart-sammenligningspanel__tittel-knapp-GRADERT'
    );

    userEvent.click(panel!);
    expect(amplitudeMock.logEvent).not.toHaveBeenCalledWith('panel-ekspander', {
        panelnavn: 'TOTALT',
        app: 'sykefravarsstatistikk',
        url: '/sykefravarsstatistikk/',
    });
});

it('sidevisning event kalles med riktige user properties', async () => {
    await waitFor(() => {
        render(<AppWithAnalytics {...mockSykefraværWithEkstradata} />);
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
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith('sidevisning', {
        app: 'sykefravarsstatistikk',
        url: '/sykefravarsstatistikk/',
    });
});

it('Visning av kalkulatoren rendrer sidevisning-event', async () => {
    await waitFor(() => {
        render(<AppWithAnalytics {...mockSykefraværNoEkstradata} />);
    });
    const knappTilKalkis = screen.getByRole('link', { name: /Gå til kostnadskalkulatoren/i });
    userEvent.click(knappTilKalkis, { button: 0 });

    // expect(amplitudeMock.logEvent).toHaveBeenCalledWith('navigere', {
    //     app: 'sykefravarsstatistikk',
    //     url: '/sykefravarsstatistikk/',
    //     destinasjon: '/sykefravarsstatistikk/kalkulator/',
    //     lenketekst: "Gå til kostnadskalkulatoren",
    // })
    //
    // expect(amplitudeMock.logEvent).toHaveBeenLastCalledWith('sidevisning', {
    //     app: 'sykefravarsstatistikk',
    //     url: '/sykefravarsstatistikk/kalkulator',
    // })
}, 60000);

// TODO runar: test for at sidevisning-event kjører på nytt dersom brukeren bytter bedrift

it('Kaller ikke setUserProperties hvis vi ikke har ekstradata', async () => {
    await waitFor(() => {
        render(<AppWithAnalytics {...mockSykefraværNoEkstradata} />);
    };);
    expect(amplitudeMock.setUserProperties).not.toHaveBeenCalled();
    expect(amplitudeMock.logEvent).not.toHaveBeenCalled();
});

const AppWithAnalytics = (data: SykefraværAppData) => {
    useAnalytics(amplitudeMock);
    return (
        <BrowserRouter basename={'/sykefravarsstatistikk/?bedrift=910969439'}>
            <AppContent {...data} analyticsClient={amplitudeMock} />
        </BrowserRouter>
    );
};

const KalkisWithAnalytics = (data: SykefraværAppData) => {
    useAnalytics(amplitudeMock);
    return (
        <BrowserRouter basename={'/sykefravarsstatistikk/kalkulator?bedrift=910969439'}>
            <AppContent {...data} analyticsClient={amplitudeMock} />
        </BrowserRouter>
    );
};