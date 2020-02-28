import React, { FunctionComponent } from 'react';

const XAkseTick: FunctionComponent<any> = props => {
    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                dy={16}
                textAnchor="middle"
                fill="#666"
                className="recharts-cartesian-axis-tick-value"
                stroke="none"
            >
                {payload.value.substring(0, 4)}
            </text>
        </g>
    );
};

export default XAkseTick;
