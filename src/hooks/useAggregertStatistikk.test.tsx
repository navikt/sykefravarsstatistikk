import '@testing-library/jest-dom';
import useAggregertStatistikk from './useAggregertStatistikk';
import { Fetcher, SWRConfig } from 'swr';
import { RestStatus } from '../api/api-utils';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';
import { aggregertMockData } from '../api/mockedApiResponses/aggregert-mock';

const wrapper: React.FC = ({ children }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <MemoryRouter>{children}</MemoryRouter>;
    </SWRConfig>
);

const happyFetcher: Fetcher<{ data: any; status: number }> = async (_: string) => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return { data: aggregertMockData, status: 200 };
};

const explodingFetcher: Fetcher<{ data: any; status: number }> = async (_: string) => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    throw new Error('KABOOM!');
};

const invalidDataFetcher: Fetcher<{ data: any; status: number }> = async (_: string) => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return { data: { some: { other: { data: ['structure'] } } }, status: 200 };
};

const invalidStatusFetcher: Fetcher<{ data: any; status: number }> = async (_: string) => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return { data: aggregertMockData, status: 500 };
};

const notLoggedInFetcher: Fetcher<{ data: any; status: number }> = async (_: string) => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return { data: aggregertMockData, status: 401 };
};

const notAuthorizedFetcher: Fetcher<{ data: any; status: number }> = async (_: string) => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return { data: aggregertMockData, status: 403 };
};

it('Should succeed and parse correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAggregertStatistikk(happyFetcher), {
        wrapper,
    });

    expect(result.current.restStatus).toBe(RestStatus.LasterInn);

    await waitForNextUpdate();

    expect(result.current.restStatus).toBe(RestStatus.Suksess);
    expect(result.current.error).toBe(undefined);
    expect(result.current.aggregertData).toStrictEqual(happyMap);

    jest.resetModules();
});

it('Should return IkkeInnlogget if status code is 401', async () => {
    const { result, waitForNextUpdate } = renderHook(
        () => useAggregertStatistikk(notLoggedInFetcher),
        { wrapper }
    );

    expect(result.current.restStatus).toBe(RestStatus.LasterInn);

    await waitForNextUpdate();

    expect(result.current.restStatus).toBe(RestStatus.IkkeInnlogget);
    expect(result.current.aggregertData).toBe(undefined);
});

it('Should return IngenTilgang if status code is 403', async () => {
    const { result, waitForNextUpdate } = renderHook(
        () => useAggregertStatistikk(notAuthorizedFetcher),
        { wrapper }
    );

    expect(result.current.restStatus).toBe(RestStatus.LasterInn);

    await waitForNextUpdate();

    expect(result.current.restStatus).toBe(RestStatus.IngenTilgang);
    expect(result.current.aggregertData).toBe(undefined);
});

it('Should fail if status code is not 2xx', async () => {
    const { result, waitForNextUpdate } = renderHook(
        () => useAggregertStatistikk(invalidStatusFetcher),
        { wrapper }
    );

    expect(result.current.restStatus).toBe(RestStatus.LasterInn);

    await waitForNextUpdate();

    expect(result.current.restStatus).toBe(RestStatus.Feil);
    expect(result.current.aggregertData).toBe(undefined);
});

it('Should fail if data fails validation', async () => {
    const { result, waitForNextUpdate } = renderHook(
        () => useAggregertStatistikk(invalidDataFetcher),
        { wrapper }
    );

    expect(result.current.restStatus).toBe(RestStatus.LasterInn);

    await waitForNextUpdate();

    expect(result.current.restStatus).toBe(RestStatus.Feil);
    expect(result.current.error.message).toBe('Kunne ikke parse aggregert data');
    expect(result.current.aggregertData).toBe(undefined);
});

it('Should fail and return thrown error', async () => {
    const { result, waitForNextUpdate } = renderHook(
        () => useAggregertStatistikk(explodingFetcher),
        { wrapper }
    );

    expect(result.current.restStatus).toBe(RestStatus.LasterInn);

    await waitForNextUpdate();

    expect(result.current.restStatus).toBe(RestStatus.Feil);
    expect(result.current.error).toStrictEqual(Error('KABOOM!'));
});

const happyMap = new Map([
    [
        'LAND',
        {
            prosentSiste4KvartalerTotalt: {
                statistikkategori: 'LAND',
                label: 'Norge',
                verdi: '5.5',
                antallPersonerIBeregningen: 9301632,
                kvartalerIBeregningen: [
                    { årstall: 2021, kvartal: 3 },
                    {
                        årstall: 2021,
                        kvartal: 4,
                    },
                    { årstall: 2022, kvartal: 1 },
                    { årstall: 2022, kvartal: 2 },
                ],
            },
        },
    ],
    ['SEKTOR', {}],
    ['NÆRING', {}],
    [
        'BRANSJE',
        {
            prosentSiste4KvartalerTotalt: {
                statistikkategori: 'BRANSJE',
                label: 'Sykehjem',
                verdi: '9.2',
                antallPersonerIBeregningen: 291108,
                kvartalerIBeregningen: [
                    { årstall: 2021, kvartal: 3 },
                    {
                        årstall: 2021,
                        kvartal: 4,
                    },
                    { årstall: 2022, kvartal: 1 },
                    { årstall: 2022, kvartal: 2 },
                ],
            },
            prosentSiste4KvartalerGradert: {
                statistikkategori: 'BRANSJE',
                label: 'Sykehjem',
                verdi: '1.8',
                antallPersonerIBeregningen: 243,
                kvartalerIBeregningen: [
                    { årstall: 2021, kvartal: 3 },
                    {
                        årstall: 2021,
                        kvartal: 4,
                    },
                    { årstall: 2022, kvartal: 1 },
                    { årstall: 2022, kvartal: 2 },
                ],
            },
            prosentSiste4KvartalerKorttid: {
                statistikkategori: 'BRANSJE',
                label: 'Sykehjem',
                verdi: '1.5',
                antallPersonerIBeregningen: 291108,
                kvartalerIBeregningen: [
                    { årstall: 2021, kvartal: 3 },
                    {
                        årstall: 2021,
                        kvartal: 4,
                    },
                    { årstall: 2022, kvartal: 1 },
                    { årstall: 2022, kvartal: 2 },
                ],
            },
            prosentSiste4KvartalerLangtid: {
                statistikkategori: 'BRANSJE',
                label: 'Sykehjem',
                verdi: '7.7',
                antallPersonerIBeregningen: 291108,
                kvartalerIBeregningen: [
                    { årstall: 2021, kvartal: 3 },
                    {
                        årstall: 2021,
                        kvartal: 4,
                    },
                    { årstall: 2022, kvartal: 1 },
                    { årstall: 2022, kvartal: 2 },
                ],
            },
        },
    ],
    [
        'VIRKSOMHET',
        {
            prosentSiste4KvartalerTotalt: {
                statistikkategori: 'VIRKSOMHET',
                label: 'TILLITSFULL PEN TIGER AS',
                verdi: '9.2',
                antallPersonerIBeregningen: 42,
                kvartalerIBeregningen: [
                    { årstall: 2021, kvartal: 3 },
                    {
                        årstall: 2021,
                        kvartal: 4,
                    },
                    { årstall: 2022, kvartal: 1 },
                    { årstall: 2022, kvartal: 2 },
                ],
            },
            prosentSiste4KvartalerGradert: {
                statistikkategori: 'VIRKSOMHET',
                label: 'TILLITSFULL PEN TIGER AS',
                verdi: '0.7',
                antallPersonerIBeregningen: 42,
                kvartalerIBeregningen: [
                    { årstall: 2021, kvartal: 3 },
                    {
                        årstall: 2021,
                        kvartal: 4,
                    },
                    { årstall: 2022, kvartal: 1 },
                    { årstall: 2022, kvartal: 2 },
                ],
            },
            prosentSiste4KvartalerKorttid: {
                statistikkategori: 'VIRKSOMHET',
                label: 'TILLITSFULL PEN TIGER AS',
                verdi: '2.3',
                antallPersonerIBeregningen: 42,
                kvartalerIBeregningen: [
                    { årstall: 2021, kvartal: 3 },
                    {
                        årstall: 2021,
                        kvartal: 4,
                    },
                    { årstall: 2022, kvartal: 1 },
                    { årstall: 2022, kvartal: 2 },
                ],
            },
            prosentSiste4KvartalerLangtid: {
                statistikkategori: 'VIRKSOMHET',
                label: 'TILLITSFULL PEN TIGER AS',
                verdi: '6.9',
                antallPersonerIBeregningen: 42,
                kvartalerIBeregningen: [
                    { årstall: 2021, kvartal: 3 },
                    {
                        årstall: 2021,
                        kvartal: 4,
                    },
                    { årstall: 2022, kvartal: 1 },
                    { årstall: 2022, kvartal: 2 },
                ],
            },
        },
    ],
    ['OVERORDNET_ENHET', {}],
    ['NÆRING2SIFFER', {}],
    ['NÆRING5SIFFER', {}],
]);
