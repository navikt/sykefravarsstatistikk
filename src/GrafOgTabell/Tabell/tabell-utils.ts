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
