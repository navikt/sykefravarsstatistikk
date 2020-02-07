import React, { FunctionComponent } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Symbols,
    Tooltip,
    TooltipPayload,
    TooltipProps,
    XAxis,
    YAxis,
} from 'recharts';

import classNames from 'classnames';

import { ReactComponent as Sirkel } from './Sirkel.svg';

import './Graf.less';
import { Element } from 'nav-frontend-typografi';

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

type SymbolType = 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye';

interface SymbolSvgProps {
    size: number;
    symbolType: SymbolType;
    fill: string;
    className?: string;
}

const calculateAreaSize = (size: number, type: SymbolType) => {
    switch (type) {
        case 'cross':
            return (5 * size * size) / 9;
        case 'diamond':
            return (0.5 * size * size) / Math.sqrt(3);
        case 'square':
            return size * size;
        case 'star': {
            const angle = (18 * Math.PI) / 180;

            return (
                1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.tan(angle) ** 2)
            );
        }
        case 'triangle':
            return (Math.sqrt(3) * size * size) / 4;
        case 'wye':
            return ((21 - 10 * Math.sqrt(3)) * size * size) / 8;
        default:
            return (Math.PI * size * size) / 4;
    }
};

const SymbolSvg: FunctionComponent<SymbolSvgProps> = props => {
    const { size, symbolType, fill, className } = props;
    const halfSize = size / 2;
    return (
        <svg width={size} height={size} viewBox={'0 0 ' + size + ' ' + size} className={classNames(className)}>
            <Symbols
                fill={fill}
                cx={halfSize}
                cy={halfSize}
                size={size * 5.75}
                sizeType="area"
                type={symbolType}
            />
        </svg>
    );
};

const MinTooltip: FunctionComponent<TooltipProps> = props => {
    const { payload } = props;

    const finnPayload = (name: string): any => {
        if (!payload) {
            return null;
        }
        return payload.filter(load => load.name === name)[0];
    };

    const virksomhetPayload = finnPayload('virksomhet');
    const virksomhetColor = virksomhetPayload ? virksomhetPayload.color : 'black';
    /*
                             {
                                    value: 'virksomhet',
                                    type: 'circle',
                                    id: 'virksomhet',
                                    color: '#38A161',
                                },
                                                "name": "2019, 1. kvartal",
                "virksomhet": 12.24,
                "næring": 2.11,
                "sektor": 4.4,
                "land": 6.11
     */

    return (
        <div className="tooltip">
            <SymbolSvg size={20} symbolType="diamond" fill="red" />
            <SymbolSvg size={20} symbolType="triangle" fill="blue" />
            <SymbolSvg size={20} symbolType="square" fill="green" />
            <SymbolSvg size={20} symbolType="circle" fill="yellow" />
            <Element>{props.label}</Element>
            <ul>
                <li>
                    <SymbolSvg size={20} symbolType="circle" fill="#38A161" />
                </li>
            </ul>
        </div>
    );
};

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

const getSymbol = (name: Name): SymbolType => (name in symboler ? symboler[name] : 'circle');
const getFarge = (name: Name): SymbolType => (name in farger ? farger[name] : 'black');

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
                        <Tooltip
                            formatter={(value, name, props) => [
                                <span className="tooltip__item-wrapper">
                                    <SymbolSvg
                                        size={20}
                                        symbolType={getSymbol(name)}
                                        fill={getFarge(name)}
                                        className="tooltip__ikon"
                                    />
                                    <span className="tooltip__item-value">
                                    {value + ' %'}
                                    </span>
                                </span>,
                            ]}
                            separator={': '}
                            active={true}
                            contentStyle={{ border: '2px solid #3E3832', borderRadius: '0.25rem' }}
                            //content={MinTooltip}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: 50 }}
                            iconSize={20}
                            formatter={(value, entry, index) => (labels as any)[value]}
                            payload={[
                                {
                                    value: 'virksomhet',
                                    type: getSymbol('virksomhet'),
                                    id: 'virksomhet',
                                    color: getFarge('virksomhet'),
                                },
                                {
                                    value: 'næring',
                                    type: getSymbol('næring'),
                                    id: 'næring',
                                    color: getFarge('næring'),
                                },
                                {
                                    value: 'sektor',
                                    type: getSymbol('sektor'),
                                    id: 'sektor',
                                    color: getFarge('sektor'),
                                },
                                {
                                    value: 'land',
                                    type: getSymbol('land'),
                                    id: 'land',
                                    color: getFarge('land'),
                                },
                            ]}
                        />
                        <Line
                            type="monotone"
                            dataKey="virksomhet"
                            stroke={getFarge('virksomhet')}
                            strokeWidth={lineWidth}
                            dot={
                                <Symbols
                                    type={getSymbol('virksomhet')}
                                    size={dotSize}
                                    fill={getFarge('virksomhet')}
                                />
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey="næring"
                            stroke={getFarge('næring')}
                            strokeWidth={lineWidth}
                            dot={
                                <Symbols
                                    type={getSymbol('næring')}
                                    size={dotSize}
                                    fill={getFarge('næring')}
                                />
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey="sektor"
                            stroke={getFarge('sektor')}
                            strokeWidth={lineWidth}
                            dot={
                                <Symbols
                                    type={getSymbol('sektor')}
                                    size={dotSize}
                                    fill={getFarge('sektor')}
                                />
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey="land"
                            stroke={getFarge('land')}
                            strokeWidth={lineWidth}
                            dot={
                                <Symbols
                                    type={getSymbol('land')}
                                    size={dotSize}
                                    fill={getFarge('land')}
                                />
                            }
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Graf;
