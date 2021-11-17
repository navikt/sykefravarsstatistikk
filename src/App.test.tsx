import React from 'react';
import App from './App';
import { render } from '@testing-library/react';
import { ArbeidsmiljøportalPanel } from './Forside/ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import { RestStatus } from './api/api-utils';
import { getvirksomhetsdataMock } from './mocking/virksomhetsdata-mock';
import { ArbeidsmiljøportalenBransje } from './utils/bransje-utils';
import { RestVirksomhetsdata } from './api/virksomhetsdata-api';
import { amplitudeMock } from './mocking/amplitude-mock';

it('renders without crashing', () => {
    render(<App analyticsClient={amplitudeMock} />);
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
