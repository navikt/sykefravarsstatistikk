import React, { FunctionComponent } from 'react';

interface Props {
    className?: string;
    cx: number;
    cy: number;
    fill: string;
    stroke: string;
}

const Firkant: FunctionComponent<Props> = props => {
    const size = 12;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            key={props.cx * props.cy}
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            x={props.cx - size / 2}
            y={props.cy - size / 2}

        >
            <path d="M0 .701h23v23H0z" fill="#C30000" fillRule="evenodd"/>
        </svg>
    );
};

export default Firkant;
