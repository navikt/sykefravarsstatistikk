import React from 'react';
import { AppContent } from './App';
import { render, waitFor } from '@testing-library/react';
import { ArbeidsmiljøportalPanel } from './Forside/ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import { RestStatus } from './api/api-utils';
import { getvirksomhetsdataMock } from './mocking/virksomhetsdata-mock';
import { ArbeidsmiljøportalenBransje } from './utils/bransje-utils';
import { RestVirksomhetsdata } from './api/virksomhetsdata-api';
import { BASE_PATH } from './konstanter';
import { BrowserRouter } from 'react-router-dom';
import { amplitudeMock } from './mocking/amplitude-mock';
import { mockSykefraværNoEkstradata } from './mocking/use-analytics-test-mocks';
import { setupFetchSpy } from './mocking/node-fetch-stub';

beforeEach(() => {
    setupFetchSpy();
});

// eslint-disable-next-line jest/expect-expect
it('renders without crashing', async () => {
    await waitFor(() => {
        render(
            <BrowserRouter basename={BASE_PATH}>
                <AppContent analyticsClient={amplitudeMock} {...mockSykefraværNoEkstradata} />
            </BrowserRouter>
        );
    });
});

it('ArbeidsmiljøportalenPanel rendrer med riktig link basert på bransje', () => {
    const virksomhetMock: RestVirksomhetsdata = {
        status: RestStatus.Suksess,
        data: getvirksomhetsdataMock(ArbeidsmiljøportalenBransje.BARNEHAGER),
    };
    const { getByText } = render(<ArbeidsmiljøportalPanel restvirksomhetsdata={virksomhetMock} />);

    const element = getByText('Gå til Arbeidsmiljøportalen') as HTMLAnchorElement;

    expect(element.href).toBe('https://www.arbeidsmiljoportalen.no/bransje/barnehage');
});
