import React from 'react';
import { AppContent } from './App';
import { render, waitFor } from '@testing-library/react';
import { ArbeidsmiljøportalPanel } from './Forside/ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import { RestStatus } from './api/api-utils';
import { BASE_PATH } from './konstanter';
import { BrowserRouter } from 'react-router-dom';
import { amplitudeMock } from './mocking/amplitude-mock';
import { mapTilUnderenhet, RestUnderenhet } from './enhetsregisteret/api/underenheter-api';
import { underenheterResponseMock } from './enhetsregisteret/api/mocks/underenheter-api-mocks';
import { mockAllDatahentingStatusOk } from './mocking/use-analytics-test-mocks';

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
