import { MockResizeObserver } from '../jest/MockResizeObserver';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { mockAllDatahentingStatusOk } from './api/mockedApiResponses/use-analytics-test-mocks';
import { BrowserRouter } from 'react-router-dom';
import { Forside } from './Forside/Forside';
import { RestRessurs, RestStatus } from './api/api-utils';
import { AltinnOrganisasjon } from './api/altinnorganisasjon-api';
import { fleskOgFisk, heiOgHåBarnehage } from './api/mockedApiResponses/altinn-mock';
import * as hooks from './hooks/useOrgnr';
import * as metrikker from './metrikker/iatjenester';
import { act } from 'react-dom/test-utils';

describe('Metrikkutsendelser', () => {
    const MockObserver = new MockResizeObserver();
    let spy: jest.SpyInstance;

    beforeEach(() => {
        MockObserver.startmock();
        const valgtBedriftMedSykefraværsstatistikkRettigheter =
            heiOgHåBarnehage[0].OrganizationNumber;
        jest.spyOn(hooks, 'useOrgnr').mockReturnValue(
            valgtBedriftMedSykefraværsstatistikkRettigheter
        );
        spy = jest.spyOn(metrikker, 'sendSykefraværsstatistikkIaMetrikk');
    });

    afterEach(() => {
        MockObserver.stopmock();
        jest.resetAllMocks();
    });

    const altinnOrganisasjoner: RestRessurs<AltinnOrganisasjon[]> = {
        status: RestStatus.Suksess,
        data: [...fleskOgFisk, ...heiOgHåBarnehage],
    };

    const altinnOrganisasjonerMedStatistikktilgang: RestRessurs<AltinnOrganisasjon[]> = {
        status: RestStatus.Suksess,
        data: heiOgHåBarnehage,
    };

    const mockAppData = {
        ...mockAllDatahentingStatusOk,
        altinnOrganisasjonerMedStatistikktilgang,
        altinnOrganisasjoner,
    };

    function renderForside(skalSendeMetrikkerAutomatisk = true) {
        return render(
            <BrowserRouter>
                <Forside
                    {...mockAppData}
                    skalSendeMetrikkerAutomatisk={skalSendeMetrikkerAutomatisk}
                />
            </BrowserRouter>
        );
    }

    it('Sender ia-tjenestermetrikk etter ca. 5 sekunder', async () => {
        jest.useFakeTimers();

        renderForside();

        expect(spy).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(7000);
        });

        expect(spy).toHaveBeenCalled();
        jest.useRealTimers();
    });

    it('Sender ia-tjenestermetrikk ved toggle mellom graf og tabell', async () => {
        renderForside(false);

        const toggle = screen.getByRole('radio', { name: 'Tabell' });

        expect(toggle).toBeDefined();
        expect(spy).not.toHaveBeenCalled();

        fireEvent.click(toggle);
        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it('Sender it-metrikk når feltere i historikkgrafen toggles', async () => {
        renderForside(false);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeDefined();
    });

    it('Sender ia-tjenestermetrikk ved print-klikk', async () => {
        renderForside(false);

        const knapp = screen.getByText('Last ned');

        expect(knapp).toBeDefined();

        expect(spy).not.toHaveBeenCalled();

        fireEvent.click(knapp);
        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
        });
    });
});
