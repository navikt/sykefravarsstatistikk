import React, { FunctionComponent } from 'react';
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import './Graf.less';
import grafTooltip from './grafTooltip/grafTooltip';
import grafLegend from './grafLegend/grafLegend';
import grafLinjer from './grafLinjer';
import { genererTestdata } from './graf-utils';

const margin = 50;

export type SymbolType = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';

type Name = 'virksomhet' | 'næring' | 'sektor' | 'land' | string;

const symboler: any = {
    virksomhet: 'circle',
    næring: 'diamond',
    sektor: 'triangle',
    land: 'square',
};

const farger: any = {
    virksomhet: '#38A161', // grønn
    næring: '#FF9100', // oransje
    sektor: '#3385D1', // blå
    land: '#C30000', // rød
};

export const getSymbol = (name: Name): SymbolType => (name in symboler ? symboler[name] : 'circle');
export const getFarge = (name: Name): SymbolType => (name in farger ? farger[name] : 'black');

const testdata = genererTestdata();

const Graf: FunctionComponent = () => {
    return (
        <div className="graf__wrapper">
            <div className="graf">
                <ResponsiveContainer height={500}>
                    <LineChart
                        data={testdata}
                        margin={{ top: margin, right: margin, left: margin, bottom: margin }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#C6C2BF" />
                        <XAxis
                            dataKey="name"
                            height={30}
                            tickMargin={20}
                            ticks={[
                                '2015, 1. kvartal',
                                '2016, 1. kvartal',
                                '2017, 1. kvartal',
                                '2018, 1. kvartal',
                                '2019, 1. kvartal',
                            ]}
                            tickFormatter={text => text.substring(0, 4)}
                        />
                        <YAxis tickMargin={20} tickFormatter={value => value + ' %'} width={40} />
                        {grafTooltip()}
                        {grafLegend()}
                        {grafLinjer()}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Graf;
