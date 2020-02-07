import { Line, Symbols } from 'recharts';
import React from 'react';
import { getFarge, getSymbol } from './Graf';

const lineWidth = 2;
const dotSize = 40;

const grafLinjer = () =>
    ['virksomhet', 'næring', 'sektor', 'land'].map(name => (
        <Line
            type="monotone"
            dataKey={name}
            stroke={getFarge(name)}
            strokeWidth={lineWidth}
            dot={<Symbols type={getSymbol(name)} size={dotSize} fill={getFarge(name)} />}
        />
    ));

export default grafLinjer;
