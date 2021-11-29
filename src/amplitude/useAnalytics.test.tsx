import { sendAnalytics, useAnalytics } from './useAnalytics';
import { amplitudeMock } from '../mocking/amplitude-mock';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { mockSykefraværNoEkstradata, mockSykefraværWithEkstradata } from '../mocking/data-mocks';
import { BrowserRouter } from 'react-router-dom';
import { SykefraværAppData } from '../hooks/useSykefraværAppData';
import userEvent from '@testing-library/user-event';
import { AppContent } from '../App';
import { BASE_PATH } from '../konstanter';

beforeEach(() => {
    jest.spyOn(amplitudeMock, 'setUserProperties');
    jest.spyOn(amplitudeMock, 'logEvent');
});

afterEach(() => {
    jest.restoreAllMocks();
});

it('Trigger AnalyticsClient#logEvent når sendAnalytics blir kalt', async () => {
    await waitFor(() => {
        render(<AppContentWithAnalytics {...mockSykefraværWithEkstradata} />);
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

it('Klikk på les-mer-panelet sender panel-ekspander event til Amplitude', async () => {
    await waitFor(() => {
        render(<AppContentWithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    const lesMerPanel = screen.getByText('Slik har vi kommet fram til ditt resultat');

    userEvent.click(lesMerPanel);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        'panel-ekspander',
        expect.objectContaining({
            app: 'sykefravarsstatistikk',
            panelnavn: 'slik-har-vi-kommet-fram-til-ditt-resultat',
        })
    );
});

it('Klikk på sammenlikningspanelene trigger events i amplitude', async () => {
    await waitFor(() => {
        render(<AppContentWithAnalytics {...mockSykefraværWithEkstradata} />);
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
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        'panel-ekspander',
        expect.objectContaining({
            panelnavn: 'TOTALT',
            app: 'sykefravarsstatistikk',
        })
    );

    userEvent.click(sammenlikningspanel_gradert!);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        'panel-ekspander',
        expect.objectContaining({
            panelnavn: 'GRADERT',
            app: 'sykefravarsstatistikk',
        })
    );

    userEvent.click(sammenlikningspanel_langtid!);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        'panel-ekspander',
        expect.objectContaining({
            panelnavn: 'LANGTID',
            app: 'sykefravarsstatistikk',
        })
    );

    userEvent.click(sammenlikningspanel_korttid!);
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        'panel-ekspander',
        expect.objectContaining({
            panelnavn: 'KORTTID',
            app: 'sykefravarsstatistikk',
        })
    );
});

it('Klikk på lenke til Arbeidsmiljøportalen genererer event i amplitude', async () => {
    await waitFor(() => {
        render(<AppContentWithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    userEvent.click(screen.getByText('Gå til Arbeidsmiljøportalen'));

    expect(amplitudeMock.logEvent).toHaveBeenLastCalledWith(
        'navigere',
        expect.objectContaining({
            app: 'sykefravarsstatistikk',
            lenketekst: 'Gå til Arbeidsmiljøportalen',
            destinasjon: 'https://www.arbeidsmiljoportalen.no',
        })
    );
});

it('Klikk på sammenlikningspanel sender ikke feil panelnavn til amplitude', async () => {
    await waitFor(() => {
        render(<AppContentWithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    const panel = document.querySelector(
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

it('sidevisning event kalles med riktige user properties', async () => {
    await waitFor(() => {
        render(<AppContentWithAnalytics {...mockSykefraværWithEkstradata} />);
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
    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        'sidevisning',
        expect.objectContaining({
            app: 'sykefravarsstatistikk',
        })
    );
});

it('Visning av kalkulatoren rendrer sidevisning-event', async () => {
    await waitFor(() => {
        render(<AppContentWithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    const knappTilKalkis = screen.getByRole('link', { name: /Gå til kostnadskalkulatoren/i });
    userEvent.click(knappTilKalkis);

    expect(amplitudeMock.logEvent).toHaveBeenCalledWith(
        'navigere',
        expect.objectContaining({
            app: 'sykefravarsstatistikk',
            destinasjon: '/kalkulator',
            lenketekst: 'Gå til kostnadskalkulatoren',
        })
    );

    expect(amplitudeMock.logEvent).toHaveBeenLastCalledWith(
        'sidevisning',
        expect.objectContaining({
            app: 'sykefravarsstatistikk',
        })
    );
});

it('Endring av inputfelt i kalkulatoren trigger event i Amplitude', async () => {
    await waitFor(() => {
        render(<AppContentWithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    const knappTilKalkis = screen.getByRole('link', { name: /Gå til kostnadskalkulatoren/i });
    userEvent.click(knappTilKalkis);

    expect(amplitudeMock.logEvent).not.toHaveBeenLastCalledWith(
        'inputfelt-utfylt',
        expect.objectContaining({
            app: 'sykefravarsstatistikk',
            url: '/sykefravarsstatistikk/kalkulator',
            label: 'Totalt antall dagsverk i din bedrift siste 12 mnd',
            name: 'totalt-antall-dagsverk',
        })
    );

    const antallDagsverkKnapp = screen.getByRole('spinbutton', {
        name: /totalt-antall-dagsverk/i,
    });

    userEvent.type(antallDagsverkKnapp, '100');

    expect(amplitudeMock.logEvent).toHaveBeenLastCalledWith(
        'inputfelt-utfylt',
        expect.objectContaining({
            app: 'sykefravarsstatistikk',
            url: '/sykefravarsstatistikk/kalkulator',
            label: 'Totalt antall dagsverk i din bedrift siste 12 mnd',
            name: 'totalt-antall-dagsverk',
        })
    );
});

it('Kaller ikke setUserProperties hvis vi ikke har ekstradata', async () => {
    await waitFor(() => {
        render(<AppContentWithAnalytics {...mockSykefraværNoEkstradata} />);
    });
    expect(amplitudeMock.setUserProperties).not.toHaveBeenCalled();
});

it('Kaller bedrift-valgt event når vi velger virksomhet', async () => {
    await waitFor(() => {
        render(<AppContentWithAnalytics {...mockSykefraværWithEkstradata} />);
    });
    const virksomhetsVelger = screen.getByLabelText(/velg virksomhet/i);
    userEvent.click(virksomhetsVelger);
    const ønsketVirksomhet = screen.getByLabelText(/virksomhetsnr. 444444444/i);
    userEvent.click(ønsketVirksomhet);
    await waitFor(() => {
        expect(amplitudeMock.logEvent).toHaveBeenLastCalledWith(
            'bedrift-valgt',
            expect.objectContaining({
                app: 'sykefravarsstatistikk',
            })
        );
    });
});

const AppContentWithAnalytics = (data: SykefraværAppData) => {
    useAnalytics(amplitudeMock);
    return (
        <BrowserRouter basename={BASE_PATH}>
            <AppContent {...data} analyticsClient={amplitudeMock} />
        </BrowserRouter>
    );
};
