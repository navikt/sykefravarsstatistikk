import React, { FunctionComponent } from 'react';

interface Props {
    className?: string;
    cx: number;
    cy: number;
    fill: string;
    stroke: string;
}

const Diamant: FunctionComponent<Props> = props => {
    const size = 16;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 22 22"
            key={props.cx * props.cy}
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            x={props.cx - size / 2}
            y={props.cy - size / 2}

        >
            <path fill="#38A161" d="M.393 10.707L11 .1l10.607 10.607L11 21.314z" fillRule="evenodd" />
        </svg>
    );
};

export default Diamant;
