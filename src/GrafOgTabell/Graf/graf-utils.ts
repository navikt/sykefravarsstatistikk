import { KvartalsvisSammenligning, ÅrstallOgKvartal } from '../../utils/sykefraværshistorikk-utils';
import { Sykefraværshistorikk, SykefraværshistorikkType } from '../../api/sykefraværshistorikk';

export type SymbolType = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';

export type Linje =
    | 'virksomhet'
    | 'overordnetEnhet'
    | 'næringEllerBransje'
    | 'sektor'
    | 'land'
    | string;

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
        .filter(sammenligning => sammenligning.kvartal === 1)
        .map(sammenligning => {
            return { årstall: sammenligning.årstall, kvartal: sammenligning.kvartal };
        });
};

export const lagTickString = (årstall: number, kvartal: number) =>
    årstall + ', ' + kvartal + '. kvartal';

export const getLinjerSomMatcherHistorikk = (
    sykefraværshistorikk: Sykefraværshistorikk[]
): Linje[] => {
    let linjer: Linje[] = [...grafConfig.linjer];

    if (
        !sykefraværshistorikk.find(
            historikk =>
                historikk.type === SykefraværshistorikkType.OVERORDNET_ENHET &&
                historikk.kvartalsvisSykefraværsprosent.length > 0
        )
    ) {
        linjer = linjer.filter(name => name !== 'overordnetEnhet');
    }

    if (
        !sykefraværshistorikk.find(
            historikk =>
                historikk.type === SykefraværshistorikkType.VIRKSOMHET &&
                historikk.kvartalsvisSykefraværsprosent.length > 0
        )
    ) {
        linjer = linjer.filter(name => name !== 'virksomhet');
    }

    return linjer;
};
