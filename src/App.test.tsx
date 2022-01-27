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

function setupFetchStub(data: string) {
    // @ts-ignore
    return function fetchStub(input: RequestInfo, init?: RequestInit | undefined) {
        return new Promise<Response>((resolve) => {
            // @ts-ignore
            resolve({
                json: () =>
                    Promise.resolve({
                        data: data,
                    }),
            })
        })
    }
}

// OBS: Vi måte lage en dummy implementasjon av fetch (global) ettersom Jest ikke spiller bra sammen med node-fetch 3.1.1
// TODO: Når Jest kommer med en versjon som fungerer bra med node-fetch ^3.1.1, da kan vi fjerne denne
// Se: https://github.com/node-fetch/node-fetch/issues/1289
beforeEach(() => {
    return jest.spyOn(global, "fetch")
        .mockImplementation(setupFetchStub("Ingen data nødvendig, vi tester ikke kurs-api response"));
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
