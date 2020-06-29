import { Line, Symbols } from 'recharts';
import React from 'react';
import { getFarge, getSymbol, Linje } from './graf-utils';

const lineWidth = 2;
const dotSize = 40;

const grafLinjer = (linjerSomSkalVises: Linje[]) =>
    linjerSomSkalVises.map((name) => (
        <Line
            key={name}
            type="monotone"
            dataKey={name}
            stroke={getFarge(name)}
            strokeWidth={lineWidth}
            isAnimationActive={false}
            dot={<Symbols type={getSymbol(name)} size={dotSize} fill={getFarge(name)} />}
        />
    ));

export default grafLinjer;
