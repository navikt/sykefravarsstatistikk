import { KvartalsvisSammenligning, ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import {
    KvartalsvisSykefraværshistorikk,
    SykefraværshistorikkType,
} from '../../api/kvartalsvis-sykefraværshistorikk-api';

export type SymbolType = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';

export type Linje =
    | 'virksomhet'
    | 'overordnetEnhet'
    | 'næringEllerBransje'
    | 'sektor'
    | 'land'
    | string;

export type LabelsForLinjer = {
    [linje in Linje]: string; // eslint-disable-line @typescript-eslint/no-unused-vars
};

interface GrafConfig {
    tooltipsnavn: any;
    farger: any;
    symboler: any;
    linjer: Linje[];
}

export const grafConfig: GrafConfig = {
    linjer: ['virksomhet', 'overordnetEnhet', 'næringEllerBransje', 'sektor', 'land'],
    farger: {
        virksomhet: '#C30000', // rød
        overordnetEnhet: '#826BA1', // lilla
        næringEllerBransje: '#FF9100', // oransje
        sektor: '#3385D1', // blå
        land: '#38A161', // grønn
    },
    symboler: {
        virksomhet: 'circle',
        overordnetEnhet: 'cross',
        næringEllerBransje: 'diamond',
        sektor: 'triangle',
        land: 'square',
    },
    tooltipsnavn: {
        virksomhet: 'Virksomhet',
        overordnetEnhet: 'Overordnet enhet',
        sektor: 'Sektor',
        land: 'Norge',
    },
};

export const getSymbol = (name: string): SymbolType =>
    name in grafConfig.symboler ? grafConfig.symboler[name] : 'circle';

export const getFarge = (name: Linje): SymbolType =>
    name in grafConfig.farger ? grafConfig.farger[name] : 'black';

export const getTooltipsnavn = (name: Linje, harBransje: boolean): string => {
    if (name === 'næringEllerBransje') {
        return harBransje ? 'Bransje' : 'Næring';
    }
    return name in grafConfig.tooltipsnavn ? grafConfig.tooltipsnavn[name] : 'Prosent';
};

export const hentFørsteKvartalFraAlleÅreneIDatagrunnlaget = (
    kvartalsvisSammenligning: KvartalsvisSammenligning[]
): ÅrstallOgKvartal[] => {
    return kvartalsvisSammenligning
        .filter((sammenligning) => sammenligning.kvartal === 1)
        .map((sammenligning) => {
            return { årstall: sammenligning.årstall, kvartal: sammenligning.kvartal };
        });
};

export const lagTickString = (årstall: number, kvartal: number) =>
    årstall + ', ' + kvartal + '. kvartal';

export const getLinjerSomHistorikkenHarDataFor = (
    sykefraværshistorikk: KvartalsvisSykefraværshistorikk[]
): Linje[] => {
    let linjer: Linje[] = [...grafConfig.linjer];

    const harHistorikkForOverordnetEnhet = !!sykefraværshistorikk.find(
        (historikk) =>
            historikk.type === SykefraværshistorikkType.OVERORDNET_ENHET &&
            historikk.kvartalsvisSykefraværsprosent.length > 0
    );
    const harHistorikkForVirksomhet = !!sykefraværshistorikk.find(
        (historikk) =>
            historikk.type === SykefraværshistorikkType.VIRKSOMHET &&
            historikk.kvartalsvisSykefraværsprosent.length > 0
    );

    if (!harHistorikkForOverordnetEnhet) {
        linjer = linjer.filter((name) => name !== 'overordnetEnhet');
    }
    if (!harHistorikkForVirksomhet) {
        linjer = linjer.filter((name) => name !== 'virksomhet');
    }

    return linjer;
};

export const finnesBransjeIHistorikken = (
    sykefraværshistorikk: KvartalsvisSykefraværshistorikk[]
): boolean =>
    !!sykefraværshistorikk.find((historikk) => historikk.type === SykefraværshistorikkType.BRANSJE);

export const getLabelsForLinjene = (
    sykefraværshistorikk: KvartalsvisSykefraværshistorikk[]
): LabelsForLinjer => {
    const labelForType = (type: SykefraværshistorikkType): string => {
        return sykefraværshistorikk.find((historikk) => historikk.type === type)!
            ? sykefraværshistorikk.find((historikk) => historikk.type === type)!.label
            : 'Ingen tilgjengelig data';
    };

    const harBransje = finnesBransjeIHistorikken(sykefraværshistorikk);

    return {
        virksomhet: labelForType(SykefraværshistorikkType.VIRKSOMHET),
        overordnetEnhet: labelForType(SykefraværshistorikkType.OVERORDNET_ENHET),
        næringEllerBransje: labelForType(
            harBransje ? SykefraværshistorikkType.BRANSJE : SykefraværshistorikkType.NÆRING
        ),
        sektor: labelForType(SykefraværshistorikkType.SEKTOR),
        land: labelForType(SykefraværshistorikkType.LAND),
    };
};

export const getLinjerSomHarData = (
    sykefraværshistorikk: KvartalsvisSykefraværshistorikk[]
): Linje[] => {
    const harData = (type: SykefraværshistorikkType) => {
        const historikk = sykefraværshistorikk.find((historikk) => historikk.type === type);
        if (!historikk) {
            return false;
        }
        const historikkHarData = !!historikk.kvartalsvisSykefraværsprosent.find(
            (prosent) => prosent !== null && prosent !== undefined
        );
        return historikkHarData;
    };

    const linjerSomHarData: Linje[] = [];
    if (harData(SykefraværshistorikkType.VIRKSOMHET)) linjerSomHarData.push('virksomhet');
    if (harData(SykefraværshistorikkType.OVERORDNET_ENHET))
        linjerSomHarData.push('overordnetEnhet');
    if (harData(SykefraværshistorikkType.BRANSJE) || harData(SykefraværshistorikkType.NÆRING))
        linjerSomHarData.push('næringEllerBransje');
    if (harData(SykefraværshistorikkType.SEKTOR)) linjerSomHarData.push('sektor');
    if (harData(SykefraværshistorikkType.LAND)) linjerSomHarData.push('land');
    return linjerSomHarData;
};
