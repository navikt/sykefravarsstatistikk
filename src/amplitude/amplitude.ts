import amplitude from 'amplitude-js';
import { RestStatus } from '../api/api-utils';
import { useContext } from 'react';
import { RestBedriftsmetrikker } from '../api/bedriftsmetrikker';
import { bedriftsmetrikkerContext } from '../utils/bedriftsmetrikkerContext';
import { RestSykefraværshistorikk } from '../api/sykefraværshistorikk';
import { sykefraværshistorikkContext } from '../utils/sykefraværshistorikkContext';
import { konverterTilKvartalsvisSammenligning } from '../utils/sykefraværshistorikk-utils';
import {
    tilSegmenteringAntallAnsatte,
    tilSegmenteringSammenligning,
    tilSegmenteringSykefraværprosent,
} from './segmentering';
import { mapTilNæringsbeskrivelse } from './næringsbeskrivelser';
import { RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import {
    altinnOrganisasjonerContext,
    altinnOrganisasjonerMedTilgangTilStatistikkContext,
} from '../utils/altinnOrganisasjonerContext';

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

const hentEkstraDataFraBedriftsmetrikker = (
    restBedriftsmetrikker: RestBedriftsmetrikker
): Object => {
    if (restBedriftsmetrikker.status === RestStatus.Suksess) {
        const metrikker = restBedriftsmetrikker.data;
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

export const useSendEvent = (): SendEvent => {
    const restBedriftsmetrikker = useContext<RestBedriftsmetrikker>(bedriftsmetrikkerContext);
    const restSykefraværshistorikk = useContext<RestSykefraværshistorikk>(
        sykefraværshistorikkContext
    );
    const restOrganisasjoner = useContext<RestAltinnOrganisasjoner>(altinnOrganisasjonerContext);
    const restOrganisasjonerMedStatistikk = useContext<RestAltinnOrganisasjoner>(
        altinnOrganisasjonerMedTilgangTilStatistikkContext
    );

    const ekstraData = {
        ...hentEkstraDataFraBedriftsmetrikker(restBedriftsmetrikker),
        ...hentEkstraDataFraSykefraværshistorikk(restSykefraværshistorikk),
    };

    return (område: string, hendelse: string, data?: Object) =>
        sendEventDirekte(område, hendelse, { ...ekstraData, ...data });
};
const a = [
    {
        device_id: '6e5620c0-55fc-4935-80c5-52305af6a6c9R',
        user_id: null,
        timestamp: 1592488363067,
        event_id: 1286,
        session_id: 1592486956110,
        event_type: '#sykefravarsstatistikk-banner-bedrift valgt',
        version_name: null,
        platform: 'Web',
        os_name: 'Chrome',
        os_version: '83',
        device_model: null,
        device_manufacturer: null,
        language: 'en-US',
        carrier: null,
        api_properties: {},
        event_properties: {},
        user_properties: {},
        uuid: '46ef6dda-a554-480d-8031-2a44a7600085',
        library: { name: 'amplitude-js', version: '6.2.0' },
        sequence_number: 1297,
        groups: {},
        group_properties: {},
        user_agent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36',
    },
];
