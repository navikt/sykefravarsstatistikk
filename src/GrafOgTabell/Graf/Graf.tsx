import React, { FunctionComponent } from 'react';
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import grafTooltip from './grafTooltip/grafTooltip';
import grafLegend from './grafLegend/grafLegend';
import grafLinjer from './grafLinjer';

import './Graf.less';
import 'nav-frontend-tabell-style';
import { RestSykefraværshistorikk } from '../../api/sykefraværshistorikk';
import { konverterTilKvartalsvisSammenligning } from '../Tabell/tabell-utils';
import { RestStatus } from '../../api/api-utils';

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

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}
const Graf: FunctionComponent<Props> = props => {
    if (props.restSykefraværsstatistikk.status !== RestStatus.Suksess) {
        return <>nei dette går nok ikke</>;
    }

    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        props.restSykefraværsstatistikk.data
    ).map(sammenligning => {
        const { årstall, kvartal, virksomhet, næringEllerBransje, sektor, land } = sammenligning;
        return {
            ...sammenligning,
            name: årstall + ', ' + kvartal + '. kvartal',
            virksomhet: virksomhet.prosent,
            næringEllerBransje: næringEllerBransje.prosent,
            sektor: sektor.prosent,
            land: land.prosent,
        };
    });

    return (
        <ResponsiveContainer minHeight={700}>
            <LineChart
                data={kvartalsvisSammenligning}
                margin={{ top: margin, right: margin, left: margin, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#C6C2BF" />
                <XAxis
                    dataKey="name"
                    tickMargin={20}
                    ticks={[
                        '2015, 1. kvartal',
                        '2016, 1. kvartal',
                        '2017, 1. kvartal',
                        '2018, 1. kvartal',
                        '2019, 1. kvartal',
                    ]}
                    tickFormatter={tickValue => tickValue.substring(0, 4)}
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
