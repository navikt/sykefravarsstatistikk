import { BASE_PATH } from '../konstanter';
import { fetchMedFeilhåndtering, RestStatus } from './api-utils';
import { FeatureToggles, RestFeatureToggles } from './featureToggles';
import {
    KvartalsvisSykefraværsprosent,
    RestSykefraværshistorikk,
    KvartalsvisSykefraværshistorikk,
    SykefraværshistorikkType,
} from './kvartalsvisSykefraværshistorikk';
import { sendEventDirekte } from '../amplitude/amplitude';
import { RestVirksomhetMetadata, VirksomhetMetadata } from './virksomhetMetadata';
import {
    RestSummertSykefraværshistorikk,
    SummertSykefraværshistorikk,
} from './summertSykefraværshistorikk';

const sykefraværshistorikkPath = (orgnr: string) =>
    `${BASE_PATH}/api/${orgnr}/sykefravarshistorikk/kvartalsvis`;

const summertPath = (orgnr: string) =>
    `${BASE_PATH}/api/${orgnr}/sykefravarshistorikk/summert?antallKvartaler=4`;

const featureTogglesPath = (features: string[]) =>
    `${BASE_PATH}/api/feature?` + features.map((featureNavn) => `feature=${featureNavn}`).join('&');

const virksomhetMetadataPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/bedriftsmetrikker`;

const iaTjenesterMetrikkerAPI = 'ia-tjenester-metrikker.dev.intern.nav.no/metrikker/';

export const hentRestSykefraværshistorikk = async (
    orgnr: string
): Promise<RestSykefraværshistorikk> => {
    const response = await fetchMedFeilhåndtering<KvartalsvisSykefraværshistorikk[]>(
        sykefraværshistorikkPath(orgnr),
        {
            method: 'GET',
            credentials: 'include',
        }
    );
    if (response.status === RestStatus.Suksess) {
        return {
            status: RestStatus.Suksess,
            data: filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet(response.data),
        };
    } else {
        return response;
    }
};

export const hentRestFeatureToggles = async (
    ...features: string[]
): Promise<RestFeatureToggles> => {
    if (features.length === 0) {
        return {
            status: RestStatus.Suksess,
            data: {},
        };
    }

    const response = await fetchMedFeilhåndtering<FeatureToggles>(featureTogglesPath(features), {
        method: 'GET',
        credentials: 'include',
    });

    if (response.status === RestStatus.Suksess) {
        return response;
    } else {
        return {
            status: RestStatus.Suksess,
            data: {},
        };
    }
};

export const hentRestVirksomhetMetadata = async (
    orgnr: string
): Promise<RestVirksomhetMetadata> => {
    return await fetchMedFeilhåndtering<VirksomhetMetadata>(virksomhetMetadataPath(orgnr), {
        method: 'GET',
        credentials: 'include',
    });
};

export const hentRestSummertSykefraværshistorikk = async (
    orgnr: string
): Promise<RestSummertSykefraværshistorikk> => {
    return await fetchMedFeilhåndtering<SummertSykefraværshistorikk[]>(summertPath(orgnr), {
        method: 'GET',
        credentials: 'include',
    });
};

export const sendIATjenesteMetrikker = async () => {
    return await fetchMedFeilhåndtering<VirksomhetMetadata>(iaTjenesterMetrikkerAPI, {
        method: 'POST',
        body:
            '{\n' +
            '  "orgnr": "999999",\n' +
            '  "næringKode5Siffer": "næringe5sifferdata",\n' +
            '  "type": "DIGITAL_IA_TJENESTE",\n' +
            '  "kilde": "SYKKEFRAVÆRSSTATISTIKK",\n' +
            '  "tjenesteMottakkelsesdato": "2007-12-03T10:15:30Z",\n' +
            '  "antallAnsatte": "23",\n' +
            '  "næringskode5SifferBeskrivelse": "String",\n' +
            '  "næring2SifferBeskrivelse": "String",\n' +
            '  "ssbSektorKode": "String",\n' +
            '  "ssbSektorKodeBeskrivelse": "String",\n' +
            '  "fylkesnummer": "String",\n' +
            '  "fylke": "String",\n' +
            '  "kommunenummer": "0234",\n' +
            '  "kommune": "Gjerdrum"' +
            '}',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
};

export const filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet = (
    data: KvartalsvisSykefraværshistorikk[]
): KvartalsvisSykefraværshistorikk[] => {
    const sykefraværshistorikkForOverordnetEnhet: KvartalsvisSykefraværsprosent[] = getSykefraværshistorikk(
        data,
        SykefraværshistorikkType.OVERORDNET_ENHET
    );
    const sykefraværshistorikkForUnderenhet: KvartalsvisSykefraværsprosent[] = getSykefraværshistorikk(
        data,
        SykefraværshistorikkType.VIRKSOMHET
    );

    if (
        harSammeSykefraværshistorikk(
            sykefraværshistorikkForOverordnetEnhet,
            sykefraværshistorikkForUnderenhet
        )
    ) {
        sendEventDirekte('segmentering valgt underenhet er lik overordnet enhet', '');
        nullstillOverordnetEnhetshistorikk(data);
    } else {
        sendEventDirekte('segmentering valgt underenhet er ulik overordnet enhet', '');
    }

    return data;
};

const getSykefraværshistorikk = (
    listeAvSykefraværshistorikk: KvartalsvisSykefraværshistorikk[],
    sykefraværshistorikkType: SykefraværshistorikkType
): KvartalsvisSykefraværsprosent[] => {
    const sykefraværshistorikkForTypen = listeAvSykefraværshistorikk.find(
        (sykefraværshistorikk) => sykefraværshistorikk.type === sykefraværshistorikkType
    );
    return sykefraværshistorikkForTypen
        ? sykefraværshistorikkForTypen.kvartalsvisSykefraværsprosent
        : [];
};

const harSammeSykefraværshistorikk = (
    sykefraværProsentListe1: KvartalsvisSykefraværsprosent[],
    sykefraværProsentListe2: KvartalsvisSykefraværsprosent[]
): boolean => {
    if (sykefraværProsentListe1.length !== sykefraværProsentListe2.length) {
        return false;
    }

    let harFunnetMinstEnUlikSykefraværprosent: boolean = false;
    sykefraværProsentListe1.forEach((sykefraværProsent1) => {
        if (
            !sykefraværProsentListe2.some(
                (sykefraværProsent2) =>
                    sykefraværProsent2.kvartal === sykefraværProsent1.kvartal &&
                    sykefraværProsent2.årstall === sykefraværProsent1.årstall &&
                    sykefraværProsent2.erMaskert === sykefraværProsent1.erMaskert &&
                    sykefraværProsent2.prosent === sykefraværProsent1.prosent
            )
        ) {
            harFunnetMinstEnUlikSykefraværprosent = true;
            return;
        }
    });

    return !harFunnetMinstEnUlikSykefraværprosent;
};

const nullstillOverordnetEnhetshistorikk = (data: KvartalsvisSykefraværshistorikk[]): void => {
    const sykefraværshistorikkTilOverordnetEnhet = data.find(
        (sf) => sf.type === SykefraværshistorikkType.OVERORDNET_ENHET
    );

    if (sykefraværshistorikkTilOverordnetEnhet !== undefined) {
        sykefraværshistorikkTilOverordnetEnhet.kvartalsvisSykefraværsprosent = [];
    }
};
