import React, { FunctionComponent } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Symbols,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import './Graf.less';

const toDesimaler = (n: number): number => Number.parseFloat(n.toFixed(2));

const rnd = (min: number, max: number) => toDesimaler(Math.random() * (max - min) + min);

let testdata: {
    name: string;
    virksomhet: number;
    næring: number;
    land: number;
    sektor: number;
}[] = [];

let forrigevirksomhet = rnd(0, 2);
['2015', '2016', '2017', '2018', '2019'].forEach(årstall => {
    [1, 2, 3, 4].forEach(kvartal => {
        const virksomhet = Math.max(toDesimaler(forrigevirksomhet + rnd(-0.5, 2)), 0);
        forrigevirksomhet = virksomhet;
        testdata.push({
            name: årstall + ', ' + kvartal + '. kvartal',
            virksomhet: virksomhet,
            næring: rnd(2, 4.5),
            sektor: rnd(4, 6.5),
            land: rnd(6, 7.5),
        });
    });
});

const labels = {
    virksomhet: <span className="graf__virksomhet-label">Hoppetitten barnehage</span>,
    næring: (
        <span className="graf__næring-label">
            <span className="graf__næring-label-tittel">Bransje:</span>
            <br /> <span>Barnehager</span>
        </span>
    ),
    sektor: (
        <>
            <span>Sektor:</span> <div>Privat og offentlig næringsvirksomhet</div>
        </>
    ),
    land: <span>Norge</span>,
};

const margin = 50;
const lineWidth = 2;
const dotSize = 40;

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
                        <Tooltip />
                        <Legend
                            wrapperStyle={{ paddingTop: 50 }}
                            iconSize={20}
                            formatter={(value, entry, index) => (labels as any)[value]}
                            payload={[
                                {
                                    value: 'virksomhet',
                                    type: 'circle',
                                    id: 'virksomhet',
                                    color: '#38A161',
                                },
                                {
                                    value: 'næring',
                                    type: 'diamond',
                                    id: 'næring',
                                    color: '#FF9100',
                                },
                                {
                                    value: 'sektor',
                                    type: 'triangle',
                                    id: 'sektor',
                                    color: '#3385D1',
                                },
                                {
                                    value: 'land',
                                    type: 'square',
                                    id: 'land',
                                    color: '#C30000',
                                },
                            ]}
                        />
                        <Line
                            type="monotone"
                            dataKey="virksomhet"
                            stroke="#38A161" // grønn
                            strokeWidth={lineWidth}
                            dot={<Symbols type="circle" size={dotSize} fill="#38A161" />}
                        />
                        <Line
                            type="monotone"
                            dataKey="næring"
                            stroke="#FF9100" // oransje
                            strokeWidth={lineWidth}
                            dot={<Symbols type="diamond" size={dotSize} fill="#FF9100" />}
                        />
                        <Line
                            type="monotone"
                            dataKey="sektor"
                            stroke="#3385D1" // blå
                            strokeWidth={lineWidth}
                            dot={<Symbols type="triangle" size={dotSize} fill="#3385D1" />}
                        />
                        <Line
                            type="monotone"
                            dataKey="land"
                            stroke="#C30000" // rød
                            strokeWidth={lineWidth}
                            dot={<Symbols type="square" size={dotSize} fill="#C30000" />}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Graf;
