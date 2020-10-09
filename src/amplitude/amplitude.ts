import amplitude from 'amplitude-js';
import { MutableRefObject, useContext, useEffect, useRef } from 'react';
import { RestVirksomhetMetadata } from '../api/virksomhetMetadata';
import { virksomhetMetadataContext } from '../utils/virksomhetMetadataContext';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { sykefraværshistorikkContext } from '../utils/sykefraværshistorikkContext';
import { RestSykefraværsvarighet } from '../api/sykefraværsvarighet';
import { sykefraværsvarighetContext } from '../utils/sykefraværsvarighetContext';
import { enhetsregisteretContext, EnhetsregisteretState } from '../utils/enhetsregisteretContext';
import {
    Ekstradata,
    hentEkstraDataFraEnhetsregisteret,
    hentEkstraDataFraSykefraværshistorikk,
    hentEkstraDataFraSykefraværsvarighet,
    hentEkstraDataFraVirksomhetMetadata,
} from './ekstradata';

const getApiKey = () => {
    return window.location.hostname === 'arbeidsgiver.nav.no'
        ? '3a6fe32c3457e77ce81c356bb14ca886'
        : '55477baea93c5227d8c0f6b813653615';
};

const instance = amplitude.getInstance();
instance.init(getApiKey(), '', {
    apiEndpoint: 'amplitude.nav.no/collect',
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: true,
});

interface NavigereEventProperties {
    url: string;
    destinasjon?: string;
    lenketekst?: string;
}

type SendNavigereEvent = (navigereEventProperties: NavigereEventProperties & Object) => void;
type SendEvent = (område: string, hendelse: string, data?: Object) => void;

export const amplitudeInstance = instance;

export const setUserProperties = (properties: Object) => instance.setUserProperties(properties);

export const sendEventDirekte = (område: string, hendelse: string, data?: Object): void => {
    instance.logEvent(['#sykefravarsstatistikk', område, hendelse].join('-'), data);
};

export const useSendNavigereEvent = (): SendNavigereEvent => {
    const ekstradata = useEkstraDataRef();

    return (navigereEventProperties: NavigereEventProperties & Object) => {
        const metadata = {
            app: 'sykefravarsstatistikk',
        };
        navigereEventProperties.url = navigereEventProperties.url.split('?')[0];
        instance.logEvent('navigere', {
            ...metadata,
            ...ekstradata.current,
            ...navigereEventProperties,
        });
    };
};

export const useSendEvent = (): SendEvent => {
    const ekstradata = useEkstraDataRef();

    return (område: string, hendelse: string, data?: Object) =>
        sendEventDirekte(område, hendelse, { ...ekstradata.current, ...data });
};

export const useSendSidevisningEvent = (område: string, orgnr: string | undefined) => {
    const sendEvent = useSendEvent();
    const skalSendeEvent = useRef(true);

    useEffect(() => {
        skalSendeEvent.current = true;
    }, [orgnr]);

    useEffect(() => {
        if (skalSendeEvent.current) {
            skalSendeEvent.current = false;
            sendEvent(område, 'vist');
        }
    }, [orgnr, område, sendEvent]);
};

export const useMålingAvTidsbruk = (
    område: string,
    ...antallSekunderFørEventSendes: number[]
): void => {
    const sendEvent = useSendEvent();
    const antallSekunder = useRef<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            antallSekunder.current += 1;
            if (antallSekunderFørEventSendes.includes(antallSekunder.current)) {
                sendEvent(område, 'tidsbruk', {
                    sekunder: antallSekunder.current,
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [antallSekunderFørEventSendes, område, sendEvent]);
};

const useEkstraDataRef = (): MutableRefObject<Partial<Ekstradata>> => {
    const restVirksomhetMetadata = useContext<RestVirksomhetMetadata>(virksomhetMetadataContext);

    const restSykefraværshistorikk = useContext<RestSykefraværshistorikk>(
        sykefraværshistorikkContext
    );
    const restSykefraværsvarighet = useContext<RestSykefraværsvarighet>(sykefraværsvarighetContext);

    const ekstradata = useRef<Partial<Ekstradata>>({});
    const restOverordnetEnhet = useContext<EnhetsregisteretState>(enhetsregisteretContext);

    useEffect(() => {
        ekstradata.current = {
            ...hentEkstraDataFraVirksomhetMetadata(restVirksomhetMetadata),
            ...hentEkstraDataFraSykefraværshistorikk(restSykefraværshistorikk),
            ...hentEkstraDataFraSykefraværsvarighet(
                restSykefraværsvarighet,
                restVirksomhetMetadata
            ),
            ...hentEkstraDataFraEnhetsregisteret(
                restOverordnetEnhet.restOverordnetEnhet,
                restVirksomhetMetadata
            ),
        };
    }, [
        restVirksomhetMetadata,
        restOverordnetEnhet,
        restSykefraværshistorikk,
        restSykefraværsvarighet,
    ]);
    return ekstradata;
};
