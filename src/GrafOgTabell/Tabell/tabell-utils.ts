import {
    KvartalsvisSykefraværsprosent,
    Sykefraværshistorikk,
    SykefraværshistorikkType,
} from '../../api/sykefraværshistorikk';

const padHistorikk = (
    historikk: Sykefraværshistorikk,
    årstallOgKvartal: { årstall: number; kvartal: number }[]
): Sykefraværshistorikk => {
    const paddedVirksomhetHistorikk: KvartalsvisSykefraværsprosent[] = årstallOgKvartal.map(
        årOgKvartal => {
            const prosentForVirksomhet = historikk.kvartalsvisSykefraværsprosent.find(
                prosent =>
                    prosent.årstall === årOgKvartal.årstall &&
                    prosent.kvartal === årOgKvartal.kvartal
            );
            return (
                prosentForVirksomhet || {
                    prosent: undefined,
                    ...årOgKvartal,
                    erMaskert: false,
                }
            );
        }
    );
    return {
        ...historikk,
        kvartalsvisSykefraværsprosent: paddedVirksomhetHistorikk,
    };
};

export const lagHistorikkListePaddedMedUndefined = (
    historikkListe: Sykefraværshistorikk[]
): Sykefraværshistorikk[] => {
    const historikkVirksomhet = historikkListe.find(
        historikk => historikk.type === SykefraværshistorikkType.VIRKSOMHET
    )!;
    const historikkBransjeEllerNæring =
        historikkListe.find(historikk => historikk.type === SykefraværshistorikkType.BRANSJE) ||
        historikkListe.find(historikk => historikk.type === SykefraværshistorikkType.NÆRING)!;
    const historikkSektor = historikkListe.find(
        historikk => historikk.type === SykefraværshistorikkType.SEKTOR
    )!;
    const historikkLand = historikkListe.find(
        historikk => historikk.type === SykefraværshistorikkType.LAND
    )!;

    const årstallOgKvartalDerDetFinnesStatistikkForLand = historikkLand.kvartalsvisSykefraværsprosent.map(
        prosent => {
            return { årstall: prosent.årstall, kvartal: prosent.kvartal };
        }
    );

    return [
        padHistorikk(historikkVirksomhet, årstallOgKvartalDerDetFinnesStatistikkForLand),
        padHistorikk(historikkBransjeEllerNæring, årstallOgKvartalDerDetFinnesStatistikkForLand),
        padHistorikk(historikkSektor, årstallOgKvartalDerDetFinnesStatistikkForLand),
        historikkLand,
    ];
};

export const harBransje = (historikkListe: Sykefraværshistorikk[]) => {
    return historikkListe.find(historikk => historikk.type === SykefraværshistorikkType.BRANSJE);
};

interface ProsentMedType {
    type: SykefraværshistorikkType;
    prosent: KvartalsvisSykefraværsprosent;
}
type Tabellrad = ProsentMedType[];

interface KvartalsvisSammenligning {
    årstall: number;
    kvartal: number;
    virksomhet: KvartalsvisSykefraværsprosent;
    næringEllerBransje: KvartalsvisSykefraværsprosent;
    sektor: KvartalsvisSykefraværsprosent;
    land: KvartalsvisSykefraværsprosent;
}

export const konverterTilKvartalsvisSammenligning = (historikkListe: Sykefraværshistorikk[]) => {
    const paddedHistorikk = lagHistorikkListePaddedMedUndefined(historikkListe);

    const getTabellrad = (
        tabellrad: Tabellrad,
        type: SykefraværshistorikkType
    ): ProsentMedType | undefined => {
        return tabellrad.find(prosentMedType => prosentMedType.type === type);
    };

    const kvartalsvisHistorikk: Tabellrad[] = paddedHistorikk[0].kvartalsvisSykefraværsprosent.map(
        (kvartalsvisProsent, i) =>
            paddedHistorikk.map(historikk => {
                return {
                    type: historikk.type,
                    prosent: historikk.kvartalsvisSykefraværsprosent[i],
                };
            })
    );

    const kvartalsvisSammenligning: KvartalsvisSammenligning[] = kvartalsvisHistorikk.map(
        tabellrad => {
            const prosentLand = getTabellrad(tabellrad, SykefraværshistorikkType.LAND)!;
            return {
                årstall: prosentLand.prosent.årstall,
                kvartal: prosentLand.prosent.kvartal,
                virksomhet: getTabellrad(tabellrad, SykefraværshistorikkType.VIRKSOMHET)!.prosent,
                næringEllerBransje: (
                    getTabellrad(tabellrad, SykefraværshistorikkType.BRANSJE) ||
                    getTabellrad(tabellrad, SykefraværshistorikkType.NÆRING)!
                ).prosent,
                sektor: getTabellrad(tabellrad, SykefraværshistorikkType.SEKTOR)!.prosent,
                land: prosentLand.prosent,
            };
        }
    );

    return kvartalsvisSammenligning;
};
