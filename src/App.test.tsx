import React from 'react';
import { AppContent } from './App';
import { render, waitFor } from '@testing-library/react';
import { ArbeidsmiljøportalPanel } from './Forside/ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import { RestRessurs, RestStatus } from './api/api-utils';
import { BASE_PATH } from './konstanter';
import { BrowserRouter } from 'react-router-dom';
import { amplitudeMock } from './mocking/amplitude-mock';
import { mapTilUnderenhet, RestUnderenhet } from './enhetsregisteret/api/underenheter-api';
import { underenheterResponseMock } from './enhetsregisteret/api/mocks/underenheter-api-mocks';
import { mockAllDatahentingStatusOk } from './mocking/use-analytics-test-mocks';
import { AltinnOrganisasjon } from './api/altinnorganisasjon-api';
import { fleskOgFisk, heiOgHåBarnehage } from './mocking/altinn-mock';
import { Forside } from './Forside/Forside';
import * as hooks from './hooks/useOrgnr';

it('renders without crashing', async () => {
    await waitFor(() => {
        render(
            <BrowserRouter basename={BASE_PATH}>
                <AppContent analyticsClient={amplitudeMock} {...mockAllDatahentingStatusOk} />
            </BrowserRouter>
        );
    });
});

it('ArbeidsmiljøportalenPanel rendrer med riktig link basert på bransje', () => {
    const restUnderenhetMock: RestUnderenhet = {
        status: RestStatus.Suksess,
        data: mapTilUnderenhet(underenheterResponseMock),
    };
    const { getByText } = render(<ArbeidsmiljøportalPanel restUnderenhet={restUnderenhetMock} />);

    const element = getByText('Gå til Arbeidsmiljøportalen') as HTMLAnchorElement;

    expect(element.href).toBe('https://www.arbeidsmiljoportalen.no/bransje/barnehage');
});

describe('Redirected bruker dersom valgt bedrift ikke har noen sykefraværsrettigheter', () => {
    afterEach(() => {
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

    it('x', () => {
        const valgtBedriftUtenSykefraværsstatistikkrettigheter = fleskOgFisk[0].OrganizationNumber;
        jest.spyOn(hooks, 'useOrgnr').mockReturnValue(
            valgtBedriftUtenSykefraværsstatistikkrettigheter
        );

        const { getByRole } = render(<Forside {...mockAppData} />);

        const beOmTilgangLenke = getByRole('link', {
            name: 'Gå til Altinn og be om tilgang til tjenesten. Du kan velge hvem i virksomheten som får forespørselen.',
        }) as HTMLAnchorElement;

        expect(beOmTilgangLenke.href).toBe(
            'https://altinn.no/ui/DelegationRequest?offeredBy=100100100&resources=3403_2'
        );
    });

    it('y', () => {
        const valgtBedriftMedSykefraværsstatistikkRettigheter =
            heiOgHåBarnehage[0].OrganizationNumber;
        jest.spyOn(hooks, 'useOrgnr').mockReturnValue(
            valgtBedriftMedSykefraværsstatistikkRettigheter
        );

        const { queryByRole } = render(<Forside {...mockAppData} />);

        const duManglerRettigheterOverskrift = queryByRole(
            'heading', {name: "Du mangler rettigheter i Altinn"}
        );
        expect(duManglerRettigheterOverskrift).not.toBeInTheDocument();
    });
});
