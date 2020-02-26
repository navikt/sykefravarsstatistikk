import { KvartalsvisSammenligning, ÅrstallOgKvartal } from '../graf-og-tabell-utils';

export type SymbolType = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';

export type Linje = 'virksomhet' | 'næringEllerBransje' | 'sektor' | 'land' | string;

interface GrafConfig {
    farger: any;
    symboler: any;
    linjer: Linje[];
}

export const grafConfig: GrafConfig = {
    linjer: ['virksomhet', 'næringEllerBransje', 'sektor', 'land'],
    farger: {
        virksomhet: '#38A161', // grønn
        næringEllerBransje: '#FF9100', // oransje
        sektor: '#3385D1', // blå
        land: '#C30000', // rød
    },
    symboler: {
        virksomhet: 'circle',
        næringEllerBransje: 'diamond',
        sektor: 'triangle',
        land: 'square',
    },
};

export const getSymbol = (name: string): SymbolType =>
    name in grafConfig.symboler ? grafConfig.symboler[name] : 'circle';

export const getFarge = (name: Linje): SymbolType =>
    name in grafConfig.farger ? grafConfig.farger[name] : 'black';

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
