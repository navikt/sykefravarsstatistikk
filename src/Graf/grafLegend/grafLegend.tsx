import { Legend, LegendProps } from 'recharts';
import React from 'react';
import { getFarge, getSymbol } from '../Graf';
import './grafLegend.less';
import SymbolSvg from '../SymbolSvg';

const labels = {
    virksomhet: 'Hoppetitten barnehage',
    næring: 'Næring: Barnehager',
    sektor: 'Sektor: Privat og offentlig næringsvirksomhet',
    land: 'Norge',
};

const grafLegend = () => {
    const innhold = (props: LegendProps) => (
        <ul className="graf-legend">
            {props.payload!.map(load => (
                <li className="graf-legend__listeelement" key={load.value}>
                    <span>
                        <SymbolSvg
                            size={40}
                            symbolType={getSymbol(load.value)}
                            fill={getFarge(load.value)}
                            className="graf-legend__ikon"
                        />
                    </span>
                    {(labels as any)[load.value]}
                </li>
            ))}
        </ul>
    );

    return (
        <Legend
            wrapperStyle={{ paddingTop: 25 }}
            payload={['virksomhet', 'næring', 'sektor', 'land'].map(name => {
                return {
                    value: name,
                    type: getSymbol(name),
                    id: name,
                    color: getFarge(name),
                };
            })}
            content={innhold}
        />
    );
};

export default grafLegend;
