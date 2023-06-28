import { fetchMedFeilhåndtering, RestRessurs, RestStatus } from './api-utils';
import { BASE_PATH } from '../konstanter';

export const SykefraværshistorikkType = {
    LAND: 'LAND',
    SEKTOR: 'SEKTOR',
    NÆRING: 'NÆRING',
    BRANSJE: 'BRANSJE',
    VIRKSOMHET: 'VIRKSOMHET',
    OVERORDNET_ENHET: 'OVERORDNET_ENHET',
} as const;

export type SykefraværshistorikkType =
    (typeof SykefraværshistorikkType)[keyof typeof SykefraværshistorikkType];
export const isSykefraværshistorikkType = (
    maybeLabel: string
): maybeLabel is SykefraværshistorikkType => {
    return Object.prototype.hasOwnProperty.call(SykefraværshistorikkType, maybeLabel);
};

export type KvartalsvisSykefraværsprosent = {
    kvartal: number;
    årstall: number;
} & Sykefraværsprosent;

export type Sykefraværsprosent =
    | {
          erMaskert: true;
          prosent: null;
          tapteDagsverk: null;
          muligeDagsverk: null;
      }
    | {
          erMaskert: false;
          prosent: number | undefined;
          tapteDagsverk: number | undefined;
          muligeDagsverk: number | undefined;
      };

export interface KvartalsvisSykefraværshistorikk {
    type: SykefraværshistorikkType;
    label: string;
    kvartalsvisSykefraværsprosent: KvartalsvisSykefraværsprosent[];
}

export type RestSykefraværshistorikk = RestRessurs<KvartalsvisSykefraværshistorikk[]>;

const sykefraværshistorikkPath = (orgnr: string) =>
    `${BASE_PATH}/api/${orgnr}/sykefravarshistorikk/kvartalsvis`;

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

export const filtrerBortOverordnetEnhetshistorikkHvisDenErLikUnderenhet = (
    data: KvartalsvisSykefraværshistorikk[]
): KvartalsvisSykefraværshistorikk[] => {
    const sykefraværshistorikkForOverordnetEnhet: KvartalsvisSykefraværsprosent[] =
        getSykefraværshistorikk(data, SykefraværshistorikkType.OVERORDNET_ENHET);
    const sykefraværshistorikkForUnderenhet: KvartalsvisSykefraværsprosent[] =
        getSykefraværshistorikk(data, SykefraværshistorikkType.VIRKSOMHET);

    if (
        harSammeSykefraværshistorikk(
            sykefraværshistorikkForOverordnetEnhet,
            sykefraværshistorikkForUnderenhet
        )
    ) {
        nullstillOverordnetEnhetshistorikk(data);
    }

    return data;
};

const harSammeSykefraværshistorikk = (
    sykefraværProsentListe1: KvartalsvisSykefraværsprosent[],
    sykefraværProsentListe2: KvartalsvisSykefraværsprosent[]
): boolean => {
    if (sykefraværProsentListe1.length !== sykefraværProsentListe2.length) {
        return false;
    }

    let harFunnetMinstEnUlikSykefraværprosent = false;
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
