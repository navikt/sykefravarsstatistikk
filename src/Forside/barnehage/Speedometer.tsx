import React, { FunctionComponent } from 'react';

export enum SykefraværResultat {
    UNDER = 'UNDER',
    MIDDELS = 'MIDDELS',
    OVER = 'OVER',
}

const getFarge = (resultat: SykefraværResultat): string => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
            return '#38A161';
        case SykefraværResultat.MIDDELS:
            return 'yellow';
        case SykefraværResultat.OVER:
            return 'red';
    }
};

interface Props {
    resultat: SykefraværResultat;
    stor?: boolean;
}

export const Speedometer: FunctionComponent<Props> = ({ resultat, stor }) => {
    const størrelsesfaktor = stor ? 1.5 : 1;
    return (
        <svg
            width={123 * størrelsesfaktor}
            height={64 * størrelsesfaktor}
            viewBox="0 0 123 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M122 61.26a60.14 60.14 0 00-17.72-42.61A60.622 60.622 0 0061.5 1a60.622 60.622 0 00-42.78 17.65A60.14 60.14 0 001 61.26h22.514A37.76 37.76 0 0134.64 34.508 38.062 38.062 0 0161.5 23.425a38.062 38.062 0 0126.86 11.082 37.76 37.76 0 0111.126 26.754H122z"
                fill={getFarge(resultat)}
                stroke="#000"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M66.79 59.036L95.73 21.27 58.75 49.383c4.464 1.044 7.825 4.94 8.04 9.653z"
                fill="#000"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M95.73 21.27L58.75 49.383c.226.053.45.113.67.18 3.874 1.184 6.79 4.55 7.3 8.66.034.268.057.54.07.813L95.73 21.27zm-2.923 2.91L59.95 49.16c3.725 1.284 6.543 4.506 7.236 8.456l25.621-33.435z"
                fill="#fff"
            />
            <path
                d="M65.35 57.425c0 3.631-2.955 6.574-6.6 6.574-3.645 0-6.6-2.943-6.6-6.574 0-3.63 2.955-6.573 6.6-6.573 3.645 0 6.6 2.943 6.6 6.574z"
                fill="#000"
            />
        </svg>
    );
};
