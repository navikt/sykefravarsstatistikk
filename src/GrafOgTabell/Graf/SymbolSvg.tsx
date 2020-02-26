import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Symbols } from 'recharts';
import { SymbolType } from './graf-utils';

interface Props {
    size: number;
    symbolType: SymbolType;
    fill: string;
    className?: string;
}
const SymbolSvg: FunctionComponent<Props> = props => {
    const { size, symbolType, fill, className } = props;
    const halfSize = size / 2;
    return (
        <svg
            width={size}
            height={size}
            viewBox={'0 0 ' + size + ' ' + size}
            className={classNames(className)}
        >
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

export default SymbolSvg;
