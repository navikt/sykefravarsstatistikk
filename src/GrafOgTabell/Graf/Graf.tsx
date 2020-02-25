import React, { FunctionComponent } from 'react';
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import grafTooltip from './grafTooltip/grafTooltip';
import grafLegend from './grafLegend/grafLegend';
import grafLinjer from './grafLinjer';

import './Graf.less';
import 'nav-frontend-tabell-style';
import { Sykefraværshistorikk } from '../../api/sykefraværshistorikk';
import {
    konverterTilKvartalsvisSammenligning,
    KvartalsvisSammenligning,
    ÅrstallOgKvartal,
} from '../graf-og-tabell-utils';

const margin = 50;

export type SymbolType = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';

export type Linje = 'virksomhet' | 'næringEllerBransje' | 'sektor' | 'land' | string;
export const linjer: Linje[] = ['virksomhet', 'næringEllerBransje', 'sektor', 'land'];

const symboler: any = {
    virksomhet: 'circle',
    næringEllerBransje: 'diamond',
    sektor: 'triangle',
    land: 'square',
};

const farger: any = {
    virksomhet: '#38A161', // grønn
    næringEllerBransje: '#FF9100', // oransje
    sektor: '#3385D1', // blå
    land: '#C30000', // rød
};

export const getSymbol = (name: string): SymbolType =>
    name in symboler ? symboler[name] : 'circle';

export const getFarge = (name: Linje): SymbolType => (name in farger ? farger[name] : 'black');

const hentFørsteKvartalFraAlleÅreneIDatagrunnlaget = (
    kvartalsvisSammenligning: KvartalsvisSammenligning[]
): ÅrstallOgKvartal[] => {
    return kvartalsvisSammenligning.filter(sammenligning => sammenligning.kvartal === 1)
        .map(sammenligning => {return {årstall: sammenligning.årstall, kvartal: sammenligning.kvartal}});
};

const lagTickString = (årstall: number, kvartal: number) => årstall + ', ' + kvartal + '. kvartal';

interface Props {
    sykefraværshistorikk: Sykefraværshistorikk[];
}

const Graf: FunctionComponent<Props> = props => {
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        props.sykefraværshistorikk
    );

    const kvartalsvisSammenligningData = kvartalsvisSammenligning.map(sammenligning => {
        const { årstall, kvartal, virksomhet, næringEllerBransje, sektor, land } = sammenligning;
        return {
            ...sammenligning,
            name: lagTickString(årstall, kvartal),
            virksomhet: virksomhet.prosent,
            næringEllerBransje: næringEllerBransje.prosent,
            sektor: sektor.prosent,
            land: land.prosent,
        };
    });

    const punkterPåXAksenSomSkalMarkeres: string[] = hentFørsteKvartalFraAlleÅreneIDatagrunnlaget(kvartalsvisSammenligning)
        .map(årstallOgKvartal => lagTickString(årstallOgKvartal.årstall, årstallOgKvartal.kvartal));

    return (
        <ResponsiveContainer minHeight={700}>
            <LineChart
                data={kvartalsvisSammenligningData}
                margin={{ top: margin, right: margin, left: margin, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#C6C2BF" />
                <XAxis
                    dataKey="name"
                    tickMargin={20}
                    tickFormatter={tickValue => tickValue.substring(0, 4)}
                    ticks={punkterPåXAksenSomSkalMarkeres}
                />
                <YAxis tickMargin={20} tickFormatter={tickValue => tickValue + ' %'} width={40} />
                {grafTooltip()}
                {grafLegend()}
                {grafLinjer()}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Graf;
