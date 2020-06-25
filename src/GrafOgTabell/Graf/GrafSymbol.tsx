import React, { FunctionComponent } from 'react';
import { getFarge, getSymbol, Linje } from './graf-utils';
import SymbolSvg from './SymbolSvg';
import classNames from 'classnames';

interface Props {
    linje: Linje;
    className?: string;
}

export const GrafSymbol: FunctionComponent<Props> = ({ linje, className }) => (
    <SymbolSvg
        size={20}
        symbolType={getSymbol(linje)}
        fill={getFarge(linje)}
        className={classNames(className)}
    />
);
