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
import Diamant from './Diamant';
import Firkant from './Firkant';

const rnd = (min: number, max: number) => Math.random() * (max - min) + min;

const sykefraværData = [
    { name: '2015, 1. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},
    { name: '2015, 2. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},
    { name: '2015, 3. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(3, 6), sektor: rnd(4, 7)},
    { name: '2015, 4. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},

    { name: '2016, 1. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},
    { name: '2016, 2. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},
    { name: '2016, 3. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(3, 6), sektor: rnd(4, 7)},
    { name: '2016, 4. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},

    { name: '2017, 1. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},
    { name: '2017, 2. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},
    { name: '2017, 3. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(3, 6), sektor: rnd(4, 7)},
    { name: '2017, 4. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},

    { name: '2018, 1. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},
    { name: '2018, 2. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},
    { name: '2018, 3. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(3, 6), sektor: rnd(4, 7)},
    { name: '2018, 4. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},

    { name: '2019, 1. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},
    { name: '2019, 2. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},
    { name: '2019, 3. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(3, 6), sektor: rnd(4, 7)},
    { name: '2019, 4. kvartal', virksomhet: rnd(5, 10), næring: rnd(4, 6), land: rnd(4, 5), sektor: rnd(4, 7)},

];

let maks = 0;

sykefraværData.forEach(data => {
    if (data.virksomhet > maks) {
        maks = data.virksomhet;
    }
    if (data.næring > maks) {
        maks = data.næring;
    }
    if (data.sektor > maks) {
        maks = data.sektor;
    }
    if (data.land > maks) {
        maks = data.land;
    }
});

maks = Math.ceil(maks);

/*
const sykefraværData = [
    { name: '2015, 1. kvartal', virksomhet: 5.5, næring: 7.6, land: 4.7, sektor: 6.5},
    { name: '2015, 2. kvartal', virksomhet: 13.5, næring: 7.3, land: 4.8, sektor: 6.7},
    { name: '2015, 3. kvartal', virksomhet: 4.2, næring: 5, land: 4.3, sektor: 5.4},
    { name: '2015, 4. kvartal', virksomhet: 9.9, næring: 7, land: 4.4, sektor: 4.1},

    { name: '2015, 1. kvartal', virksomhet: 5.5, næring: 7.6, land: 4.7, sektor: 6.5},
    { name: '2015, 2. kvartal', virksomhet: 13.5, næring: 7.3, land: 4.8, sektor: 6.7},
    { name: '2015, 3. kvartal', virksomhet: 4.2, næring: 5, land: 4.3, sektor: 5.4},
    { name: '2015, 4. kvartal', virksomhet: 9.9, næring: 7, land: 4.4, sektor: 4.1},

    { name: '2015, 1. kvartal', virksomhet: 5.5, næring: 7.6, land: 4.7, sektor: 6.5},
    { name: '2015, 2. kvartal', virksomhet: 13.5, næring: 7.3, land: 4.8, sektor: 6.7},
    { name: '2015, 3. kvartal', virksomhet: 4.2, næring: 5, land: 4.3, sektor: 5.4},
    { name: '2015, 4. kvartal', virksomhet: 9.9, næring: 7, land: 4.4, sektor: 4.1},

    { name: '2015, 1. kvartal', virksomhet: 5.5, næring: 7.6, land: 4.7, sektor: 6.5},
    { name: '2015, 2. kvartal', virksomhet: 13.5, næring: 7.3, land: 4.8, sektor: 6.7},
    { name: '2015, 3. kvartal', virksomhet: 4.2, næring: 5, land: 4.3, sektor: 5.4},
    { name: '2015, 4. kvartal', virksomhet: 9.9, næring: 7, land: 4.4, sektor: 4.1},

    { name: '2015, 1. kvartal', virksomhet: 5.5, næring: 7.6, land: 4.7, sektor: 6.5},
    { name: '2015, 2. kvartal', virksomhet: 13.5, næring: 7.3, land: 4.8, sektor: 6.7},
    { name: '2015, 3. kvartal', virksomhet: 4.2, næring: 5, land: 4.3, sektor: 5.4},
    { name: '2015, 4. kvartal', virksomhet: 9.9, næring: 7, land: 4.4, sektor: 4.1},
];

 */

const margin = 50;
const lineWidth = 2;
const dotSize = 40;

const Graf: FunctionComponent = () => {
    return (
        <div className="graf__wrapper">
            <div className="graf">
                <ResponsiveContainer height={500}>
                    <LineChart
                        data={sykefraværData}
                        margin={{ top: margin, right: margin, left: margin, bottom: margin }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#C6C2BF"/>
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
                        <YAxis
                            tickMargin={20}
                            tickFormatter={value => value + ' %'}
                            width={40}
                            //domain={[0, maks]}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="virksomhet"
                            stroke="#38A161" // grønn
                            strokeWidth={lineWidth}
                            dot={<Symbols type="circle" size={dotSize} fill="#38A161"/>}
                        />
                        <Line
                            dataKey="næring"
                            stroke="#FF9100" // oransje
                            strokeWidth={lineWidth}
                            dot={<Symbols type="diamond" size={dotSize} fill="#FF9100"/>}
                        />
                        <Line
                            dataKey="land"
                            stroke="#C30000" // rød
                            strokeWidth={lineWidth}
                            dot={<Symbols type="square" size={dotSize} fill="#C30000"/>}
                        />
                        <Line
                            dataKey="sektor"
                            stroke="#3385D1" // blå
                            strokeWidth={lineWidth}
                            dot={<Symbols type="triangle" size={dotSize} fill="#3385D1"/>}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    ); // 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';
};

export default Graf;
