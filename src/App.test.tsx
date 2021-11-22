import React from 'react';
import App from './App';
import { render } from '@testing-library/react';
import { ArbeidsmiljøportalPanel } from './Forside/ArbeidsmiljøportalPanel/ArbeidsmiljøportalPanel';
import { RestStatus } from './api/api-utils';
import { getvirksomhetsdataMock } from './mocking/virksomhetsdata-mock';
import { ArbeidsmiljøportalenBransje } from './utils/bransje-utils';
import { RestVirksomhetsdata } from './api/virksomhetsdata-api';
import { BASE_PATH } from './konstanter';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line jest/expect-expect
it('renders without crashing', () => {
    // const meta: Sykefravarsstatistikk = {
    //     virksomhetsdata: {
    //         status: RestStatus.Suksess,
    //         data: {
    //             antallAnsatte: 2,
    //             bransje: ArbeidsmiljøportalenBransje.ANDRE_BRANSJER,
    //             næringskode5Siffer: {
    //                 beskrivelse: 'hei',
    //                 kode: 'på deg',
    //             },
    //         },
    //     },
    // };
    //
    // render(<AppContent />);

    render(
        <BrowserRouter basename={BASE_PATH}>
            <App />
        </BrowserRouter>
    );
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
