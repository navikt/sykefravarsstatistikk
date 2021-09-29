import React from 'react';

const XAkseTick = (props: { x: any, y: any, payload: any }) => {
    // Denne komponenten overskriver recharts default Tick-komponent. Dette er gjort som en workaround:
    // Ved endring av skjermstørrelse (f.eks. hvis man roterer mobilen) ble ikke default-ticks rendret.
    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                dy={16}
                textAnchor="middle"
                className="recharts-cartesian-axis-tick-value"
                stroke="none"
            >
                {payload.value.substring(0, 4)}
            </text>
        </g>
    );
};

export default XAkseTick;
