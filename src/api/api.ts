import { BASE_PATH } from '../server/konstanter';
import {
    defaultSammenligning,
    getRestSammenligningStatus,
    RestSammenligning,
    RestSammenligningStatus,
} from './sammenligning';
import { RestTapteDagsverk } from './tapteDagsverk';
import { getRestStatus, RestStatus } from './api-utils';
import { RestFeatureToggles } from './featureToggles';
import {
    KvartalsvisSykefraværsprosent,
    RestSykefraværshistorikk,
    Sykefraværshistorikk,
    SykefraværshistorikkType,
} from './sykefraværshistorikk';

const sammenligningPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/sammenligning`;
const tapteDagsverkPath = (orgnr: string) => `${BASE_PATH}/api/${orgnr}/summerTapteDagsverk`;
const sykefraværshistorikkPath = (orgnr: string) =>
    `${BASE_PATH}/api/${orgnr}/sykefravarshistorikk`;
const featureTogglesPath = (features: string[]) =>
    `${BASE_PATH}/api/feature?` + features.map(featureNavn => `feature=${featureNavn}`).join('&');

export const hentRestSammenligning = async (orgnr: string): Promise<RestSammenligning> => {
    const response = await fetch(sammenligningPath(orgnr), {
        method: 'GET',
        credentials: 'include',
    });

    const restSammenligningStatus = getRestSammenligningStatus(response.status);

    if (restSammenligningStatus === RestSammenligningStatus.Suksess) {
        let json = await response.json();
        return {
            status: restSammenligningStatus,
            sammenligning: json,
        };
    } else {
        return {
            status: restSammenligningStatus,
            sammenligning: defaultSammenligning,
        };
    }
};

export const hentRestTapteDagsverk = async (orgnr: string): Promise<RestTapteDagsverk> => {
    const response = await fetch(tapteDagsverkPath(orgnr), {
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
            data: await response.json().then(data => {
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
        erSykefraværshistorikkLike(
            sykefraværshistorikkForOverordnetEnhet,
            sykefraværshistorikkForUnderenhet
        )
    ) {
        console.log('OverordnetEnhet og underenhet har like sykefraværshistorikk');
        nullstillOverordnetEnhetshistorikk(data);
    } else {
        console.log('OverordnetEnhet og underenhet har forskjellige sykefraværshistorikk');
    }

    return data;
};

const getSykefraværshistorikk = (
    listeAvSykefraværshistorikk: Sykefraværshistorikk[],
    sykefraværshistorikkType: SykefraværshistorikkType
): KvartalsvisSykefraværsprosent[] => {
    const sykefraværshistorikkForTypen = listeAvSykefraværshistorikk.find(
        sykefraværshistorikk => sykefraværshistorikk.type === sykefraværshistorikkType
    );
    return sykefraværshistorikkForTypen
        ? sykefraværshistorikkForTypen.kvartalsvisSykefraværsprosent
        : [];
};

const erSykefraværshistorikkLike = (
    sfProsentVenstreListe: KvartalsvisSykefraværsprosent[],
    sfProsentHøyreListe: KvartalsvisSykefraværsprosent[]
): boolean => {
    if (sfProsentVenstreListe.length !== sfProsentHøyreListe.length) {
        return false;
    }

    let harMinsEnUlikSykefraværprosent: boolean = false;
    sfProsentVenstreListe.forEach(sfProsentVenstre => {
        if (
            !sfProsentHøyreListe.some(
                sfProsentHøyre =>
                    sfProsentHøyre.kvartal === sfProsentVenstre.kvartal &&
                    sfProsentHøyre.årstall === sfProsentVenstre.årstall &&
                    sfProsentHøyre.erMaskert === sfProsentVenstre.erMaskert &&
                    sfProsentHøyre.prosent === sfProsentVenstre.prosent
            )
        ) {
            harMinsEnUlikSykefraværprosent = true;
            return;
        }
    });

    return !harMinsEnUlikSykefraværprosent;
};

const nullstillOverordnetEnhetshistorikk = (data: Sykefraværshistorikk[]): void => {
    const sykefraværshistorikkTilOverordnetEnhet = data.find(
        sf => sf.type === SykefraværshistorikkType.OVERORDNET_ENHET
    );

    if (sykefraværshistorikkTilOverordnetEnhet !== undefined) {
        sykefraværshistorikkTilOverordnetEnhet.kvartalsvisSykefraværsprosent = [];
    }
};
