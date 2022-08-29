import useSWR from 'swr';
import { z } from 'zod';
import { Statistikkategori } from '../api/summert-sykefraværshistorikk-api';
import { getRestStatus, RestStatus } from '../api/api-utils';
import { useOrgnr } from './useOrgnr';
import { BASE_PATH } from '../konstanter';

const Statistikk = z.object({
    statistikkategori: z.nativeEnum(Statistikkategori),
    label: z.string(),
    verdi: z.string(),
    antallPersonerIBeregningen: z.number(),
    kvartalerIBeregningen: z.array(z.object({ årstall: z.number(), kvartal: z.number() }))
})

const AggregertStatistikk = z.object({
    prosentSiste4Kvartaler: z.array(Statistikk).default([]),
    prosentSiste4KvartalerTotalt: z.array(Statistikk).default([]),
    prosentSiste4KvartalerGradert: z.array(Statistikk).default([]),
    prosentSiste4KvartalerKorttid: z.array(Statistikk).default([]),
    prosentSiste4KvartalerLangtid: z.array(Statistikk).default([]),
    trend: z.array(Statistikk).default([]),
    trendTotalt: z.array(Statistikk).default([])
})

export type AggregertStatistikkType = z.infer<typeof AggregertStatistikk>;
export type StatistikkType = z.infer<typeof Statistikk>

export type AggregertStatistikkResponse = {
    data: AggregertStatistikkType
    restStatus: RestStatus,
    error?: unknown
}

const fetcher = (input: RequestInfo) => fetch(input, { method: 'GET', credentials: 'include', })

const tryReadingData = (data: Response) => {
    try{
        return { statistikk: AggregertStatistikk.parse(data.json()), feil: undefined }
    } catch (e) {
        return { statistikk: AggregertStatistikk.parse({}), feil: e}
    }
}

function useAggregertStatistikk (): AggregertStatistikkResponse {
    const orgnr = useOrgnr() || "";
    const { data, error } = useSWR(`${BASE_PATH}/api/${orgnr}/v1/sykefravarshistorikk/aggregert`, fetcher)

    if(!data && !error) {
        return {
            data: AggregertStatistikk.parse({}),
            restStatus: RestStatus.IkkeLastet,
            error: undefined
        }
    }

    if(data && data.ok) {
        const { statistikk, feil } = tryReadingData(data);
        return {
            data: statistikk,
            restStatus: feil ? RestStatus.Feil : RestStatus.Suksess,
            error: feil
        }
    }

    if(data && !data.ok) {
        return {
            data: AggregertStatistikk.parse({}),
            restStatus: getRestStatus(data.status),
            error: undefined
        }
    }

    return {
        data: AggregertStatistikk.parse({}),
        restStatus: RestStatus.Feil,
        error: error
    }
}

export default useAggregertStatistikk
