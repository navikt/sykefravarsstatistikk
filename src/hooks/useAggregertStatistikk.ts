import useSWR, { Fetcher } from 'swr';
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

const StatistikkValidator = z.object({
    statistikkategori: z.nativeEnum(Statistikkategori),
    label: z.string(),
    verdi: z.string(),
    antallPersonerIBeregningen: z.number(),
    kvartalerIBeregningen: z.array(z.object({ årstall: z.number(), kvartal: z.number().min(1).max(4) }))
})

const ResponseValidator = z.object({
    prosentSiste4Kvartaler: z.array(StatistikkValidator).default([]),
    prosentSiste4KvartalerTotalt: z.array(StatistikkValidator).default([]),
    prosentSiste4KvartalerGradert: z.array(StatistikkValidator).default([]),
    prosentSiste4KvartalerKorttid: z.array(StatistikkValidator).default([]),
    prosentSiste4KvartalerLangtid: z.array(StatistikkValidator).default([]),
    trend: z.array(StatistikkValidator).default([]),
    trendTotalt: z.array(StatistikkValidator).default([]),
    tapteDagsverkTotalt: z.array(StatistikkValidator).default([]),
    muligeDagsverkTotalt: z.array(StatistikkValidator).default([])
}).strict("Ukjent datastruktur")

export type AggregertStatistikk = {
    prosentSiste4KvartalerTotalt?: StatistikkType,
    prosentSiste4KvartalerGradert?: StatistikkType,
    prosentSiste4KvartalerKorttid?: StatistikkType,
    prosentSiste4KvartalerLangtid?: StatistikkType,
    trendTotalt?: StatistikkType
}

type Response = z.infer<typeof ResponseValidator>;
export type StatistikkType = z.infer<typeof StatistikkValidator>

export type AggregertStatistikkResponse = {
    restStatus: RestStatus,
    aggregertData?: Map<Statistikkategori, AggregertStatistikk>,
    error?: any
}



const defaultFetcher: Fetcher<{data: any, status: number}> = async (input: RequestInfo) => {
    const res = await fetch(input, { method: 'GET', credentials: 'include', })

    if(!res.ok) {
        return {
            data: undefined,
            status: res.status
        }
    }

    const json = await res.json()

    return {
        data: json,
        status: res.status
    }
}

const getCategory = (category: Statistikkategori, statistikk: StatistikkType[]) => {
    return statistikk.find(e => e.statistikkategori === category)
}

const groupByCategory = (aggregertStatistikk: Response) => {
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

function useFetch(orgnr: string, fetcher?: Fetcher<{data: any, status: number}>) {
    const _fetcher = fetcher? fetcher : defaultFetcher
    const { data, error } = useSWR(`${BASE_PATH}/api/${orgnr}/v1/sykefravarshistorikk/aggregert`, _fetcher)

    if(data && getRestStatus(data.status) === RestStatus.Feil) return {
        data: undefined,
        isLoading: false,
        isError: error
    }

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}


function useAggregertStatistikk (fetcher?: Fetcher<{data: any, status: number}>): AggregertStatistikkResponse {
    const orgnr = useOrgnr() || "";
    const { data, isLoading, isError } = useFetch(orgnr, fetcher)

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

    if(data && getRestStatus(data.status) === RestStatus.IngenTilgang) {
        return {
            restStatus: RestStatus.IngenTilgang,
            aggregertData: undefined
        }
    }

    if(data && getRestStatus(data.status) === RestStatus.IkkeInnlogget) {
        return {
            restStatus: RestStatus.IkkeInnlogget,
            aggregertData: undefined
        }
    }

    try {
        return {
            restStatus: getRestStatus(data ? data.status : 0),
            aggregertData: groupByCategory(ResponseValidator.parse(data?.data))
        }
    } catch (e) {
        if(data){
            return {
                restStatus: RestStatus.Feil,
                error: new Error("Kunne ikke parse aggregert data", {cause: e as Error})
            }
        }
        return {
            restStatus: RestStatus.Feil,
            error: e
        }
    }
}

export default useAggregertStatistikk
