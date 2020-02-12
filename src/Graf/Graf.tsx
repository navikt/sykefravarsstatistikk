import React, { FunctionComponent } from 'react';
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import './Graf.less';
import grafTooltip from './grafTooltip/grafTooltip';
import grafLegend from './grafLegend/grafLegend';
import grafLinjer from './grafLinjer';
import { getTestdata } from './graf-utils';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

const margin = 50;

export type SymbolType = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';

export type Linje = 'virksomhet' | 'næring' | 'sektor' | 'land' | string;
export const linjer: Linje[] = ['virksomhet', 'næring', 'sektor', 'land'];

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

export const getSymbol = (name: string): SymbolType =>
    name in symboler ? symboler[name] : 'circle';
export const getFarge = (name: Linje): SymbolType => (name in farger ? farger[name] : 'black');

const testdata = getTestdata();

const Graf: FunctionComponent = () => {
    return (
        <div className="graf__wrapper">
            <div className="graf">
                <Systemtittel tag="h1" className="graf__tittel">
                    Se sykefraværet over tid
                </Systemtittel>
                <Normaltekst className="graf__ingress">
                    Se hvordan det legemeldte sykefraværet utvikler seg over tid. Du kan sammenligne
                    sykefraværet deres med næringen og sektoren dere tilhører.
                </Normaltekst>
                <ResponsiveContainer minHeight={700}>
                    <LineChart
                        data={testdata}
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
                        <YAxis
                            tickMargin={20}
                            tickFormatter={tickValue => tickValue + ' %'}
                            width={40}
                        />
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
