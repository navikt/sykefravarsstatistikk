import React from 'react';
import { AppContent } from './App';
import { render, waitFor } from '@testing-library/react';
import { ArbeidsmiljøportalPanel } from './Forside/ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import { RestRessurs, RestStatus } from './api/api-utils';
import { BASE_PATH } from './konstanter';
import { BrowserRouter } from 'react-router-dom';
import { amplitudeMock } from './mocking/amplitude-mock';
// import { useOrgnr } from './hooks/useOrgnr';
import * as hooks from './hooks/useOrgnr';
import { mapTilUnderenhet, RestUnderenhet } from './enhetsregisteret/api/underenheter-api';
import { underenheterResponseMock } from './enhetsregisteret/api/mocks/underenheter-api-mocks';
import { mockAllDatahentingStatusOk } from './mocking/use-analytics-test-mocks';
import { Sammenligningspaneler } from './Forside/Sammenligningspanel/Sammenligningspaneler';
import { fleskOgFisk, heiOgHåBarnehage } from './mocking/altinn-mock';
import { AltinnOrganisasjon } from './api/altinnorganisasjon-api';

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

describe('Viser advarsel-banner kun dersom rettigheter mangler', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const bedrifter: RestRessurs<AltinnOrganisasjon[]> = {
        status: RestStatus.Suksess,
        data: [...fleskOgFisk, ...heiOgHåBarnehage],
    };

    const bedrifterMedStatistikktilgang: RestRessurs<AltinnOrganisasjon[]> = {
        status: RestStatus.Suksess,
        data: heiOgHåBarnehage,
    };

    it('Viser warning-banner dersom brukeren mangler IA-rettigheter til bedrift', () => {
        const valgtBedrift = fleskOgFisk[0].OrganizationNumber;
        jest.spyOn(hooks, 'useOrgnr').mockReturnValue(valgtBedrift);

        const { getByRole } = render(
            <Sammenligningspaneler
                restStatus={RestStatus.Suksess}
                restAltinnOrganisasjoner={bedrifter}
                restAltinnOrganisasjonerMedStatistikktilgang={bedrifterMedStatistikktilgang}
            />
        );

        const beOmTilgangLenke = getByRole('link', {
            name: 'Be om tilgang EksternLenkeIkon.svg',
        }) as HTMLAnchorElement;

        expect(beOmTilgangLenke.href).toBe(
            'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'
        );
    });

    it('Viser ikke warning-banner dersom brukeren har IA-rettigheter til bedrift', () => {
        const valgtBedrift = heiOgHåBarnehage[0].OrganizationNumber;
        jest.spyOn(hooks, 'useOrgnr').mockReturnValue(valgtBedrift);

        const { queryByText } = render(
            <Sammenligningspaneler
                restStatus={RestStatus.Suksess}
                restAltinnOrganisasjoner={bedrifter}
                restAltinnOrganisasjonerMedStatistikktilgang={bedrifterMedStatistikktilgang}
            />
        );

        const banner = queryByText(
            'Du mangler rettigheter til å se tallene for bedriften du har valgt'
        );

        expect(banner).not.toBeInTheDocument();
    });
});
