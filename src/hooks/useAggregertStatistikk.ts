import useSWR from 'swr';
import { z } from 'zod';
import { Statistikkategori } from '../api/summert-sykefraværshistorikk-api';
import { getRestStatus, RestStatus } from '../api/api-utils';
import { useOrgnr } from './useOrgnr';
import { BASE_PATH } from '../konstanter';

/**
 * Antagelser:
 *  1) endepunkt kommer ikke til å returnere mer enn et objekt per kategori per type aggregering
 *  1) endepunkt kommer ikke til å returnere mer enn 4 kvartaler
 *  3) endepunkt returnerer kvartaler i stigende datorekke
 */

const StatistikkModel = z.object({
    statistikkategori: z.nativeEnum(Statistikkategori),
    label: z.string(),
    verdi: z.string(),
    antallPersonerIBeregningen: z.number(),
    kvartalerIBeregningen: z.array(z.object({ årstall: z.number(), kvartal: z.number().min(1).max(4) }))
})

const AggregertStatistikkResponseModel = z.object({
    prosentSiste4Kvartaler: z.array(StatistikkModel).default([]),
    prosentSiste4KvartalerTotalt: z.array(StatistikkModel).default([]),
    prosentSiste4KvartalerGradert: z.array(StatistikkModel).default([]),
    prosentSiste4KvartalerKorttid: z.array(StatistikkModel).default([]),
    prosentSiste4KvartalerLangtid: z.array(StatistikkModel).default([]),
    trend: z.array(StatistikkModel).default([]),
    trendTotalt: z.array(StatistikkModel).default([])
})

export type AggregertStatistikk = {
    prosentSiste4KvartalerTotalt?: StatistikkType,
    prosentSiste4KvartalerGradert?: StatistikkType,
    prosentSiste4KvartalerKorttid?: StatistikkType,
    prosentSiste4KvartalerLangtid?: StatistikkType,
    trendTotalt?: StatistikkType
}

export type AggregertStatistikkResponseType = z.infer<typeof AggregertStatistikkResponseModel>;
export type StatistikkType = z.infer<typeof StatistikkModel>

export type AggregertStatistikkResponse = {
    restStatus: RestStatus,
    aggregertData?: Map<Statistikkategori, AggregertStatistikk>,
    error?: any
}

const fetcher = (input: RequestInfo) => fetch(input, { method: 'GET', credentials: 'include', })

const getCategory = (category: Statistikkategori, statistikk: StatistikkType[]) => {
    return statistikk.find(e => e.statistikkategori === category)
}

const groupByCategory = (aggregertStatistikk: AggregertStatistikkResponseType) => {
    const map = new Map<Statistikkategori, AggregertStatistikk>()

    Object.values(Statistikkategori).forEach(kategori => {
        map.set(kategori, {
            prosentSiste4KvartalerTotalt: getCategory(kategori, aggregertStatistikk.prosentSiste4KvartalerTotalt),
            prosentSiste4KvartalerGradert: getCategory(kategori, aggregertStatistikk.prosentSiste4KvartalerGradert),
            prosentSiste4KvartalerKorttid: getCategory(kategori, aggregertStatistikk.prosentSiste4KvartalerKorttid),
            prosentSiste4KvartalerLangtid: getCategory(kategori, aggregertStatistikk.prosentSiste4KvartalerLangtid),
            trendTotalt: getCategory(kategori, aggregertStatistikk.trendTotalt)
        })
    })

    return map
}

function useFetch(orgnr: string) {
    const { data, error } = useSWR(`${BASE_PATH}/api/${orgnr}/v1/sykefravarshistorikk/aggregert`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}


function useAggregertStatistikk (): AggregertStatistikkResponse {
    const orgnr = useOrgnr() || "";
    const { data, isLoading, isError } = useFetch(orgnr)

    if(isError) {
        return {
            restStatus: RestStatus.Feil,
            error: isError
        }
    }

    if(isLoading) {
        return {
            restStatus: RestStatus.LasterInn
        }
    }

    try {
        return {
            restStatus: getRestStatus(data ? data.status : 0),
            aggregertData: groupByCategory(AggregertStatistikkResponseModel.parse(data))
        }
    } catch (e) {
        if(data){
            return {
                restStatus: getRestStatus(data.status),
                error: e
            }
        }
        return {
            restStatus: RestStatus.Feil,
            error: e
        }
    }
}

export default useAggregertStatistikk
