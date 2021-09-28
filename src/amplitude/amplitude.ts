import { MutableRefObject, useContext, useEffect, useRef } from 'react';
import { RestVirksomhetsdata } from '../api/virksomhetsdata';
import { virksomhetsdataContext } from '../utils/virksomhetsdataContext';
import { RestSykefraværshistorikk } from '../api/kvartalsvisSykefraværshistorikk';
import { sykefraværshistorikkContext } from '../utils/sykefraværshistorikkContext';
import { RestSummertSykefraværshistorikk } from '../api/summertSykefraværshistorikk';
import { summertSykefraværshistorikkContext } from '../utils/summertSykefraværshistorikkContext';
import { enhetsregisteretContext, EnhetsregisteretState } from '../utils/enhetsregisteretContext';
import {
    Ekstradata,
    getEkstraDataFraEnhetsregisteret,
    getEkstraDataFraSummertSykefraværshistorikk,
    getEkstraDataFraSykefraværshistorikk,
    getEkstraDataFraVirksomhetsdata,
} from './ekstradata';
import { amplitudeClient } from './client';

type SendEvent = (område: string, hendelse: string, data?: Object) => void;

export type EventData = { [key: string]: any };

export const setUserProperties = (properties: Object) => amplitudeClient.setUserProperties(properties);

export const sendEventDirekte = (område: string, hendelse: string, data?: EventData): void => {
    amplitudeClient.logEvent(['#sykefravarsstatistikk', område, hendelse].join('-'), data);
};

export const useSendEvent = (): SendEvent => {
    const ekstradata = useEkstraDataRef();

    return (område: string, hendelse: string, data?: EventData) =>
        sendEventDirekte(område, hendelse, { ...ekstradata.current, ...data });
};

export const useEkstraDataRef = (): MutableRefObject<Partial<Ekstradata>> => {
    const restVirksomhetsdata = useContext<RestVirksomhetsdata>(virksomhetsdataContext);
    const restSykefraværshistorikk = useContext<RestSykefraværshistorikk>(
        sykefraværshistorikkContext,
    );
    const restSummertSykefraværshistorikk = useContext<RestSummertSykefraværshistorikk>(
        summertSykefraværshistorikkContext,
    );
    const dataFraEnhetsregisteret = useContext<EnhetsregisteretState>(enhetsregisteretContext);

    const ekstradata = useRef<Partial<Ekstradata>>({});

    useEffect(() => {
        ekstradata.current = {
            ...getEkstraDataFraVirksomhetsdata(restVirksomhetsdata),
            ...getEkstraDataFraSykefraværshistorikk(restSykefraværshistorikk),
            ...getEkstraDataFraSummertSykefraværshistorikk(
                restSummertSykefraværshistorikk,
                restVirksomhetsdata,
            ),
            ...getEkstraDataFraEnhetsregisteret(
                dataFraEnhetsregisteret.restOverordnetEnhet,
                restVirksomhetsdata,
            ),
        };
    }, [
        restVirksomhetsdata,
        dataFraEnhetsregisteret,
        restSykefraværshistorikk,
        restSummertSykefraværshistorikk,
    ]);
    return ekstradata;
};
