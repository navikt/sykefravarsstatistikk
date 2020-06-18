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

const hentAntallUnderbedrifter = (
    restOrganisasjoner: RestAltinnOrganisasjoner
): string | number => {
    if (restOrganisasjoner.status === RestStatus.Suksess) {
        return restOrganisasjoner.data.filter(
            (org) => org.OrganizationNumber && org.OrganizationNumber.length > 0
        ).length;
    }
    return 'IKKE_SATT';
};

const hentEkstraDataFraAltinnOrganisasjoner = (
    organisasjoner: RestAltinnOrganisasjoner,
    organisasjonerMedTilgangTilStatistikk: RestAltinnOrganisasjoner
): Object => ({
    antallUnderenheter: hentAntallUnderbedrifter(organisasjoner),
    antallUnderheterMedTilgangTilStatistikk: hentAntallUnderbedrifter(
        organisasjonerMedTilgangTilStatistikk
    ),
});

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
        ...hentEkstraDataFraAltinnOrganisasjoner(
            restOrganisasjoner,
            restOrganisasjonerMedStatistikk
        ),
    };

    return (område: string, hendelse: string, data?: Object) =>
        sendEventDirekte(område, hendelse, { ...ekstraData, ...data });
};
