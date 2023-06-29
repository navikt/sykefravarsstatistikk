import { RestRessurs, RestStatus } from '../../api/api-utils';
import { fleskOgFisk, heiOgHåBarnehage } from '../../api/mockedApiResponses/altinn-mock';
import { mockAllDatahentingStatusOk } from '../../api/mockedApiResponses/use-analytics-test-mocks';
import { Forside } from '../../Forside/Forside';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as hooks from '../../hooks/useOrgnr';
import { AltinnOrganisasjon } from '../../api/altinnorganisasjon-api';
import { MockResizeObserver } from '../../../jest/MockResizeObserver';

describe('Tester side for manglende Altinn-rettigheter', () => {
    const MockObserver = new MockResizeObserver();

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

    function renderForside() {
        return render(
            <BrowserRouter>
                <Forside {...mockAppData} />
            </BrowserRouter>
        );
    }

    it('Viser lenke til Altinn med riktig orgnr', () => {
        const valgtOrgnr = fleskOgFisk[1].OrganizationNumber;
        jest.spyOn(hooks, 'useOrgnr').mockReturnValue(valgtOrgnr);

        renderForside();

        const beOmTilgangLenke = screen.getByRole('link', {
            name: 'altinn-logo.svg Be om tilgang i Altinn Gå til Altinn og be om tilgang til tjenesten. Du kan velge hvem i virksomheten som får forespørselen.',
        }) as HTMLAnchorElement;

        expect(beOmTilgangLenke.href).toBe(
            `https://altinn.no/ui/DelegationRequest?offeredBy=${valgtOrgnr}&resources=3403_2`
        );
    });

    it('Vises ikke dersom valgt bedrift har IA-rettigheter', () => {
        MockObserver.startmock();

        const valgtBedriftMedSykefraværsstatistikkRettigheter =
            heiOgHåBarnehage[0].OrganizationNumber;

        jest.spyOn(hooks, 'useOrgnr').mockReturnValue(
            valgtBedriftMedSykefraværsstatistikkRettigheter
        );

        renderForside();

        const forsidensOverskrift = screen.getByRole('heading', {
            name: 'Sykefraværsstatistikk for HEI OG HÅ BARNEHAGE',
        });

        MockObserver.stopmock();

        expect(forsidensOverskrift).toBeInTheDocument();
    });

    it('Viser lenke til Min Side Arbeidsgiver', () => {
        const valgtBedriftUtenSykefraværsstatistikkRettigheter = fleskOgFisk[0].OrganizationNumber;
        jest.spyOn(hooks, 'useOrgnr').mockReturnValue(
            valgtBedriftUtenSykefraværsstatistikkRettigheter
        );

        renderForside();

        const merInfoLenke = screen.getByRole('link', {
            name: 'Les mer om hvordan tilgangsstyringen i Altinn fungerer',
        }) as HTMLAnchorElement;
        expect(merInfoLenke.href).toBe(
            'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'
        );
    });
});
