import { Line, Symbols } from 'recharts';
import React from 'react';
import { getFarge, getSymbol, linjer } from './Graf';

const lineWidth = 2;
const dotSize = 40;

const grafLinjer = () =>
    linjer.map(name => (
        <Line
            key={name}
            type="monotone"
            dataKey={name}
            stroke={getFarge(name)}
            strokeWidth={lineWidth}
            dot={<Symbols type={getSymbol(name)} size={dotSize} fill={getFarge(name)} />}
        />
    ));

export default grafLinjer;
