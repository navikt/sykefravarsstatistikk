import amplitude from 'amplitude-js';
import { RestStatus } from '../api/api-utils';
import { useContext, useEffect, useRef } from 'react';
import { Bransjetype, RestVirksomhetMetadata } from '../api/virksomhetMetadata';
import { virksomhetMetadataContext } from '../utils/virksomhetMetadataContext';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { sykefraværshistorikkContext } from '../utils/sykefraværshistorikkContext';
import { konverterTilKvartalsvisSammenligning } from '../utils/sykefraværshistorikk-utils';
import {
    AntallAnsatteSegmentering,
    SegmenteringSammenligning,
    SegmenteringSykefraværsprosent,
    tilSegmenteringAntallAnsatte,
    tilSegmenteringSammenligning,
    tilSegmenteringSykefraværsprosent,
} from './segmentering';
import { mapTilNæringsbeskrivelse } from './næringsbeskrivelser';
import { RestSykefraværsvarighet } from '../api/sykefraværsvarighet';
import { sykefraværsvarighetContext } from '../utils/sykefraværsvarighetContext';
import {
    getResultatForSammenligningAvSykefravær,
    getTotaltSykefraværSiste4Kvartaler,
    sykefraværForBarnehagerSiste4Kvartaler,
} from '../Forside/barnehage/barnehage-utils';
import { RestOverordnetEnhet } from '../api/enhetsregisteret-api';
import { SykefraværResultat } from '../Forside/barnehage/Speedometer/Speedometer';
import { enhetsregisteretContext, EnhetsregisteretState } from '../utils/enhetsregisteretContext';
import { mapTilPrivatElleOffentligSektor } from '../utils/sektorUtils';

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

export type Sektor = 'offentlig' | 'privat';
type SendEvent = (område: string, hendelse: string, data?: Object) => void;

interface Ekstradata {
    næring2siffer: string;
    bransje: string;
    antallAnsatte: AntallAnsatteSegmentering;

    prosent: SegmenteringSykefraværsprosent;
    sammenligning: SegmenteringSammenligning;

    sykefraværSiste4Kvartaler: SykefraværResultat;
    korttidSiste4Kvartaler: SykefraværResultat;
    langtidSiste4Kvartaler: SykefraværResultat;

    sektor: Sektor;
}

const hentEkstraDataFraVirksomhetMetadata = (
    restVirksomhetMetadata: RestVirksomhetMetadata
): Partial<Ekstradata> => {
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
): Partial<Ekstradata> => {
    if (restSykefraværshistorikk.status === RestStatus.Suksess) {
        const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
            restSykefraværshistorikk.data
        );

        const sammenligningForSisteKvartal = kvartalsvisSammenligning.pop();

        if (sammenligningForSisteKvartal) {
            const { virksomhet, næringEllerBransje } = sammenligningForSisteKvartal;

            if (virksomhet) {
                return {
                    prosent: tilSegmenteringSykefraværsprosent(virksomhet),
                    sammenligning: tilSegmenteringSammenligning(virksomhet, næringEllerBransje),
                };
            }
        }
    }
    return {};
};

const hentEkstraDataFraEnhetsregisteret = (
    restOverordnetEnhet: RestOverordnetEnhet,
    restVirksomhetMetadata: RestVirksomhetMetadata
): Partial<Ekstradata> => {
    if (
        restVirksomhetMetadata.status === RestStatus.Suksess &&
        restVirksomhetMetadata.data.bransje === Bransjetype.BARNEHAGER &&
        restOverordnetEnhet.status === RestStatus.Suksess
    ) {
        return {
            sektor: mapTilPrivatElleOffentligSektor(
                restOverordnetEnhet.data.institusjonellSektorkode
            ),
        };
    }
    return {};
};

const hentEkstraDataFraSykefraværsvarighet = (
    restSykefraværsvarighet: RestSykefraværsvarighet,
    restVirksomhetMetadata: RestVirksomhetMetadata
): Partial<Ekstradata> => {
    if (
        restVirksomhetMetadata.status !== RestStatus.Suksess ||
        restVirksomhetMetadata.data.bransje !== Bransjetype.BARNEHAGER
    ) {
        return {};
    }

    if (
        restSykefraværsvarighet.status !== RestStatus.Suksess &&
        restSykefraværsvarighet.status !== RestStatus.Feil
    ) {
        return {};
    }

    const varighet =
        restSykefraværsvarighet.status === RestStatus.Suksess
            ? restSykefraværsvarighet.data
            : undefined;

    try {
        return {
            sykefraværSiste4Kvartaler: getResultatForSammenligningAvSykefravær(
                restSykefraværsvarighet.status,
                getTotaltSykefraværSiste4Kvartaler(varighet),
                sykefraværForBarnehagerSiste4Kvartaler.totalt
            ),
            korttidSiste4Kvartaler: getResultatForSammenligningAvSykefravær(
                restSykefraværsvarighet.status,
                varighet?.summertKorttidsfravær,
                sykefraværForBarnehagerSiste4Kvartaler.korttidsfravær
            ),
            langtidSiste4Kvartaler: getResultatForSammenligningAvSykefravær(
                restSykefraværsvarighet.status,
                varighet?.summertLangtidsfravær,
                sykefraværForBarnehagerSiste4Kvartaler.langtidsfravær
            ),
        };
    } catch (error) {
        return {};
    }
};

export const useSendEvent = (): SendEvent => {
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
