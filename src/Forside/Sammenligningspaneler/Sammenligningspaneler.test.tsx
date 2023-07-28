import { MockResizeObserver } from '../../../jest/MockResizeObserver';
import { render } from '@testing-library/react';
import React from 'react';
import { mockAllDatahentingStatusOk } from '../../api/mockedApiResponses/use-analytics-test-mocks';
import { BrowserRouter } from 'react-router-dom';
import { Forside } from '../Forside';
import { RestRessurs, RestStatus } from '../../api/api-utils';
import { AltinnOrganisasjon } from '../../api/altinnorganisasjon-api';
import { fleskOgFisk, heiOgHåBarnehage } from '../../api/mockedApiResponses/altinn-mock';
import * as hooks from '../../hooks/useOrgnr';
import * as metrikker from '../../metrikker/iatjenester';
import { act } from 'react-dom/test-utils';

describe('Sammenligningspaneler', () => {
    const MockObserver = new MockResizeObserver();

    beforeEach(() => {
        MockObserver.startmock();
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

    function renderForside() {
        return render(
            <BrowserRouter>
                <Forside {...mockAppData} />
            </BrowserRouter>
        );
    }

    it('sender ia-tjenestermetrikk etter ca. 5 sekunder', async () => {
        jest.useFakeTimers();
        const valgtBedriftMedSykefraværsstatistikkRettigheter =
            heiOgHåBarnehage[0].OrganizationNumber;
        jest.spyOn(hooks, 'useOrgnr').mockReturnValue(
            valgtBedriftMedSykefraværsstatistikkRettigheter
        );
        const spy = jest.spyOn(metrikker, 'sendIaTjenesteMetrikkMottatt');

        renderForside();

        expect(spy).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(7000);
        });

        expect(spy).toHaveBeenCalled();
    });
});
