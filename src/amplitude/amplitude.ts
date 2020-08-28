import amplitude from 'amplitude-js';
import { RestStatus } from '../api/api-utils';
import { useContext, useEffect, useRef } from 'react';
import { Bransjetype, RestVirksomhetMetadata } from '../api/virksomhetMetadata';
import { virksomhetMetadataContext } from '../utils/virksomhetMetadataContext';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { sykefraværshistorikkContext } from '../utils/sykefraværshistorikkContext';
import { konverterTilKvartalsvisSammenligning } from '../utils/sykefraværshistorikk-utils';
import {
    tilSegmenteringAntallAnsatte,
    tilSegmenteringSammenligning,
    tilSegmenteringSykefraværprosent,
} from './segmentering';
import { mapTilNæringsbeskrivelse } from './næringsbeskrivelser';
import { RestSykefraværsvarighet } from '../api/sykefraværsvarighet';
import { sykefraværsvarighetContext } from '../utils/sykefraværsvarighetContext';
import {
    getResultat,
    getTotaltSykefraværSiste4Kvartaler,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../Forside/barnehage/barnehage-utils';

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

export const setUserProperties = (properties: Object) => instance.setUserProperties(properties);

export const sendEventDirekte = (område: string, hendelse: string, data?: Object): void => {
    instance.logEvent(['#sykefravarsstatistikk', område, hendelse].join('-'), data);
};

type SendEvent = (område: string, hendelse: string, data?: Object) => void;

const hentEkstraDataFraVirksomhetMetadata = (
    restVirksomhetMetadata: RestVirksomhetMetadata
): Object => {
    if (restVirksomhetMetadata.status === RestStatus.Suksess) {
        const metrikker = restVirksomhetMetadata.data;
        const næringskode2siffer = metrikker.næringskode5Siffer.kode.substring(0, 2);
        const næring2siffer =
            næringskode2siffer + ' ' + mapTilNæringsbeskrivelse(næringskode2siffer);

        return {
            næring2siffer,
            bransje: metrikker.bransje,
            antallAnsatte: tilSegmenteringAntallAnsatte(metrikker.antallAnsatte),
        };
    }
    return {};
};

const hentEkstraDataFraSykefraværshistorikk = (
    restSykefraværshistorikk: RestSykefraværshistorikk
): Object => {
    if (restSykefraværshistorikk.status === RestStatus.Suksess) {
        const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
            restSykefraværshistorikk.data
        );

        const sammenligningForSisteKvartal = kvartalsvisSammenligning.pop();

        if (sammenligningForSisteKvartal) {
            const { virksomhet, næringEllerBransje } = sammenligningForSisteKvartal;

            if (virksomhet) {
                return {
                    prosent: tilSegmenteringSykefraværprosent(virksomhet),
                    sammenligning: tilSegmenteringSammenligning(virksomhet, næringEllerBransje),
                };
            }
        }
    }
    return {};
};

const hentEkstraDataFraSykefraværsvarighet = (
    restSykefraværsvarighet: RestSykefraværsvarighet,
    restVirksomhetMetadata: RestVirksomhetMetadata
): Object => {
    if (
        restSykefraværsvarighet.status !== RestStatus.Suksess ||
        restVirksomhetMetadata.status !== RestStatus.Suksess ||
        restVirksomhetMetadata.data.bransje !== Bransjetype.BARNEHAGER
    ) {
        return {};
    }
    const varighet = restSykefraværsvarighet.data;
    const sykefraværTotalt = getTotaltSykefraværSiste4Kvartaler(varighet)?.prosent;

    return {
        sykefraværSiste4Kvartaler: getResultat(
            sykefraværTotalt || null,
            sykefraværForBarnehagerSiste4Kvartaler.totalt
        ),
        korttidSiste4Kvartaler: getResultat(
            varighet.korttidsfraværSiste4Kvartaler.prosent,
            sykefraværForBarnehagerSiste4Kvartaler.korttidsfravær
        ),
        langtidSiste4Kvartaler: getResultat(
            varighet.langtidsfraværSiste4Kvartaler.prosent,
            sykefraværForBarnehagerSiste4Kvartaler.langtidsfravær
        ),
    };
};

export const useSendEvent = (): SendEvent => {
    const restVirksomhetMetadata = useContext<RestVirksomhetMetadata>(virksomhetMetadataContext);
    const restSykefraværshistorikk = useContext<RestSykefraværshistorikk>(
        sykefraværshistorikkContext
    );
    const restSykefraværsvarighet = useContext<RestSykefraværsvarighet>(sykefraværsvarighetContext);
    const ekstradata = useRef<Object>({});

    useEffect(() => {
        ekstradata.current = {
            ...hentEkstraDataFraVirksomhetMetadata(restVirksomhetMetadata),
            ...hentEkstraDataFraSykefraværshistorikk(restSykefraværshistorikk),
            ...hentEkstraDataFraSykefraværsvarighet(
                restSykefraværsvarighet,
                restVirksomhetMetadata
            ),
        };
    }, [restVirksomhetMetadata, restSykefraværshistorikk]);

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
    const skalSendeEvent = useRef(true);

    useEffect(() => {
        if (skalSendeEvent.current) {
            skalSendeEvent.current = false;
            antallSekunderFørEventSendes.map((antallSekunder) =>
                setTimeout(() => {
                    sendEvent(område, 'tidsbruk', {
                        sekunder: antallSekunder,
                    });
                }, antallSekunder * 1000)
            );
        }
    }, [område, antallSekunderFørEventSendes, sendEvent]);
};
