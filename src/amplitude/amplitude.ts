import amplitude from 'amplitude-js';
import { RestStatus } from '../api/api-utils';
import { useContext } from 'react';
import {
    tilSegmenteringAntallAnsatte,
    RestBedriftsmetrikker,
    tilSegmenteringSykefraværprosent,
} from '../api/bedriftsmetrikker';
import { bedriftsmetrikkerContext } from '../utils/bedriftsmetrikkerContext';
import {
    RestSykefraværshistorikk,
    SykefraværshistorikkType,
    Sykefraværsprosent,
} from '../api/sykefraværshistorikk';
import { sykefraværshistorikkContext } from '../utils/sykefraværshistorikkContext';
import {
    beregnHvilkeÅrstallOgKvartalerSomSkalVises,
    finnProsent,
    ÅrstallOgKvartal,
} from '../utils/sykefraværshistorikk-utils';

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

export const sendEventDirekte = (område: string, hendelse: string, data?: Object): void => {
    instance.logEvent(['#sykefravarsstatistikk', område, hendelse].join('-'), data);
};

type SendEvent = (område: string, hendelse: string, data?: Object) => void;

export const useSendEvent = (): SendEvent => {
    const restBedriftsmetrikker = useContext<RestBedriftsmetrikker>(bedriftsmetrikkerContext);
    const restSykefraværshistorikk = useContext<RestSykefraværshistorikk>(
        sykefraværshistorikkContext
    );
    let ekstraData = {};
    if (restBedriftsmetrikker.status === RestStatus.Suksess) {
        const metrikker = restBedriftsmetrikker.data;

        ekstraData = {
            næring2siffer: metrikker.næringskode5Siffer.kode.substring(0, 2),
            bransje: metrikker.bransje,
            antallAnsatte: tilSegmenteringAntallAnsatte(metrikker.antallAnsatte),
        };
    }
    if (restSykefraværshistorikk.status === RestStatus.Suksess) {
        const årstallOgKvartalListe: ÅrstallOgKvartal[] = beregnHvilkeÅrstallOgKvartalerSomSkalVises(
            restSykefraværshistorikk.data
        );
        const sisteÅrstallOgKvartal = årstallOgKvartalListe.pop();

        if (sisteÅrstallOgKvartal) {
            const sykefraværprosent: Sykefraværsprosent = finnProsent(
                restSykefraværshistorikk.data,
                sisteÅrstallOgKvartal,
                SykefraværshistorikkType.VIRKSOMHET
            );

            if (sykefraværprosent) {
                ekstraData = {
                    ...ekstraData,
                    prosent: tilSegmenteringSykefraværprosent(sykefraværprosent),
                };
            }
        }
    }
    return (område: string, hendelse: string, data?: Object) =>
        sendEventDirekte(område, hendelse, { ...ekstraData, ...data });
};
