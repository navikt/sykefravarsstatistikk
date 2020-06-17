import { BASE_PATH } from '../konstanter';
import { getRestStatus, RestStatus } from './api-utils';
import { RestFeatureToggles } from './featureToggles';
import {
    KvartalsvisSykefraværsprosent,
    RestSykefraværshistorikk,
    Sykefraværshistorikk,
    SykefraværshistorikkType,
} from './sykefraværshistorikk';
import { sendEventDirekte } from '../amplitude/amplitude';
import { RestBedriftsmetrikker } from './bedriftsmetrikker';

const sykefraværshistorikkPath = (orgnr: string) =>
    `${BASE_PATH}/api/${orgnr}/sykefravarshistorikk`;

const featureTogglesPath = (features: string[]) =>
    `${BASE_PATH}/api/feature?` + features.map((featureNavn) => `feature=${featureNavn}`).join('&');

const bedriftsmetrikkerPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/bedriftsmetrikker`;

export const hentRestSykefraværshistorikk = async (
    orgnr: string
): Promise<RestSykefraværshistorikk> => {
    const response = await fetch(sykefraværshistorikkPath(orgnr), {
        method: 'GET',
        credentials: 'include',
    });

    const restStatus = getRestStatus(response.status);
    if (restStatus === RestStatus.Suksess) {
        return {
            status: RestStatus.Suksess,
            data: await response.json().then((data) => {
                return filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet(data);
            }),
        };
    }
    return {
        status: restStatus,
    };
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

    const response = await fetch(featureTogglesPath(features), {
        method: 'GET',
        credentials: 'include',
    });

    const restStatus = getRestStatus(response.status);

    if (restStatus === RestStatus.Suksess) {
        return {
            status: RestStatus.Suksess,
            data: await response.json(),
        };
    }
    return {
        status: RestStatus.Suksess,
        data: {},
    };
};

export const hentRestBedriftsmetrikker = async (orgnr: string): Promise<RestBedriftsmetrikker> => {
    const response = await fetch(bedriftsmetrikkerPath(orgnr), {
        method: 'GET',
        credentials: 'include',
    });

    const restStatus = getRestStatus(response.status);
    if (restStatus === RestStatus.Suksess) {
        return {
            status: RestStatus.Suksess,
            data: await response.json(),
        };
    }
    return {
        status: restStatus,
    };
};

export const filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet = (
    data: Sykefraværshistorikk[]
): Sykefraværshistorikk[] => {
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
    listeAvSykefraværshistorikk: Sykefraværshistorikk[],
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

const nullstillOverordnetEnhetshistorikk = (data: Sykefraværshistorikk[]): void => {
    const sykefraværshistorikkTilOverordnetEnhet = data.find(
        (sf) => sf.type === SykefraværshistorikkType.OVERORDNET_ENHET
    );

    if (sykefraværshistorikkTilOverordnetEnhet !== undefined) {
        sykefraværshistorikkTilOverordnetEnhet.kvartalsvisSykefraværsprosent = [];
    }
};
