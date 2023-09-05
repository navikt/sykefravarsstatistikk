import React, { FunctionComponent } from 'react';
import { getFarge, getSymbol } from '../graf-utils';
import SymbolSvg from './SymbolSvg';
import classNames from 'classnames';
import { HistorikkLabel } from '../../../../utils/sykefraværshistorikk-utils';

interface Props {
    linje: HistorikkLabel;
    className?: string;
}

export const GrafSymbol: FunctionComponent<Props> = ({ linje, className }) => (
    <SymbolSvg
        size={18}
        symbolType={getSymbol(linje)}
        fill={getFarge(linje)}
        className={classNames(className)}
    />
);
