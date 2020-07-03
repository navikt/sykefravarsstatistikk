import {
    Sykefraværshistorikk,
    SykefraværshistorikkType,
    Sykefraværsprosent,
} from '../api/sykefraværshistorikk';

export interface KvartalsvisSammenligning {
    årstall: number;
    kvartal: number;
    virksomhet: Sykefraværsprosent;
    overordnetEnhet: Sykefraværsprosent;
    næringEllerBransje: Sykefraværsprosent;
    sektor: Sykefraværsprosent;
    land: Sykefraværsprosent;
}

export interface ÅrstallOgKvartal {
    årstall: number;
    kvartal: number;
}

const TOM_PROSENT: Sykefraværsprosent = {
    erMaskert: false,
    prosent: undefined,
    tapteDagsverk: undefined,
    muligeDagsverk: undefined,
};
export const finnProsent = (
    historikkListe: Sykefraværshistorikk[],
    årstallOgKvartal: ÅrstallOgKvartal,
    type: SykefraværshistorikkType
): Sykefraværsprosent => {
    const historikk = historikkListe.find((historikk) => historikk.type === type);
    if (!historikk) {
        return TOM_PROSENT;
    }
    const prosent = historikk.kvartalsvisSykefraværsprosent.find(
        (prosent) =>
            prosent.årstall === årstallOgKvartal.årstall &&
            prosent.kvartal === årstallOgKvartal.kvartal
    );
    return prosent || TOM_PROSENT;
};
const mapTilKvartalsvisSammenligning = (
    historikkListe: Sykefraværshistorikk[],
    årstallOgKvartalerSomSkalVises: ÅrstallOgKvartal[]
): KvartalsvisSammenligning[] => {
    const harBransje = !!historikkListe.find(
        (historikk) => historikk.type === SykefraværshistorikkType.BRANSJE
    );

    return årstallOgKvartalerSomSkalVises.map((årstallOgKvartal) => {
        const getProsent = (type: SykefraværshistorikkType): Sykefraværsprosent =>
            finnProsent(historikkListe, årstallOgKvartal, type);

        return {
            ...årstallOgKvartal,
            virksomhet: getProsent(SykefraværshistorikkType.VIRKSOMHET),
            overordnetEnhet: getProsent(SykefraværshistorikkType.OVERORDNET_ENHET),
            næringEllerBransje: getProsent(
                harBransje ? SykefraværshistorikkType.BRANSJE : SykefraværshistorikkType.NÆRING
            ),
            sektor: getProsent(SykefraværshistorikkType.SEKTOR),
            land: getProsent(SykefraværshistorikkType.LAND),
        };
    });
};
export const beregnHvilkeÅrstallOgKvartalerSomSkalVises = (
    historikkListe: Sykefraværshistorikk[]
): ÅrstallOgKvartal[] => {
    return historikkListe
        .find((historikk) => historikk.type === SykefraværshistorikkType.LAND)!
        .kvartalsvisSykefraværsprosent.map((prosent) => {
            return { årstall: prosent.årstall, kvartal: prosent.kvartal };
        });
};
export const konverterTilKvartalsvisSammenligning = (
    historikkListe: Sykefraværshistorikk[]
): KvartalsvisSammenligning[] => {
    const årstallOgKvartalerSomSkalVises = beregnHvilkeÅrstallOgKvartalerSomSkalVises(
        historikkListe
    );
    return mapTilKvartalsvisSammenligning(historikkListe, årstallOgKvartalerSomSkalVises);
};

export const historikkHarBransje = (historikkListe: Sykefraværshistorikk[]): boolean =>
    !!historikkListe.find((historikk) => historikk.type === SykefraværshistorikkType.BRANSJE);

export const historikkHarOverordnetEnhet = (historikkListe: Sykefraværshistorikk[]): boolean =>
    !!historikkListe.find(
        (historikk) =>
            historikk.type === SykefraværshistorikkType.OVERORDNET_ENHET &&
            historikk.kvartalsvisSykefraværsprosent.length > 0
    );

export interface HistorikkLabels {
    virksomhet: string;
    overordnetEnhet?: string;
    næringEllerBransje: string;
    sektor: string;
    land: string;
}

export const getHistorikkLabels = (historikkListe: Sykefraværshistorikk[]): HistorikkLabels => {
    const getHistorikk = (type: SykefraværshistorikkType): Sykefraværshistorikk | undefined =>
        historikkListe.find((historikk) => historikk.type === type);
    return {
        virksomhet:
            getHistorikk(SykefraværshistorikkType.VIRKSOMHET) !== undefined
                ? getHistorikk(SykefraværshistorikkType.VIRKSOMHET)!.label
                : 'ikke tilgang til virksomhet',
        overordnetEnhet:
            getHistorikk(SykefraværshistorikkType.OVERORDNET_ENHET) !== undefined
                ? getHistorikk(SykefraværshistorikkType.OVERORDNET_ENHET)!.label
                : 'ikke tilgang til overornetenhet',
        næringEllerBransje: historikkHarBransje(historikkListe)
            ? getHistorikk(SykefraværshistorikkType.BRANSJE)!.label
            : getHistorikk(SykefraværshistorikkType.NÆRING)!.label,
        sektor: getHistorikk(SykefraværshistorikkType.SEKTOR)!.label,
        land: getHistorikk(SykefraværshistorikkType.LAND)!.label,
    };
};
