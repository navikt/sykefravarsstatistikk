import {
    HistorikkLabel,
    HistorikkLabels,
    isHistorikkLabel,
    KvartalsvisSammenligning,
    ÅrstallOgKvartal,
} from '../../utils/sykefraværshistorikk-utils';
import { isDefined } from '../../utils/app-utils';

export type SymbolType = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';

interface GrafConfig {
    tooltipsnavn: any;
    farger: any;
    symboler: any;
    linjer: HistorikkLabel[];
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
        land: ' Norge ',
    },
};

export const getSymbol = (name: string): SymbolType =>
    name in grafConfig.symboler ? grafConfig.symboler[name] : 'circle';

export const getFarge = (name: HistorikkLabel): SymbolType =>
    name in grafConfig.farger ? grafConfig.farger[name] : 'black';

export const getTooltipsnavn = (
    name: HistorikkLabel,
): string => {
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

export const getLinjerSomHarData = (
    sykefraværshistorikk: KvartalsvisSammenligning[]
): HistorikkLabel[] => {
    const linjer = new Set();
    const keysSize = Object.keys(HistorikkLabels).length;
    for (const historikk of sykefraværshistorikk) {
        if (linjer.size === keysSize) break;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { årstall, kvartal, ...data } = historikk;

        for (const [label, prosent] of Object.entries(data)) {
            if (isDefined(prosent.prosent)) linjer.add(label);
        }
    }

    return Array.from(linjer).filter(isHistorikkLabel);
};
