import React from 'react';
import { Tooltip } from 'recharts';
import SymbolSvg from '../SymbolSvg';
import { getFarge, getSymbol } from '../Graf';
import './grafTooltip.less';

export const grafTooltip = () => (
    <Tooltip
        formatter={(value, name, props) => [
            <span className="tooltip__item-wrapper">
                <SymbolSvg
                    size={20}
                    symbolType={getSymbol(name)}
                    fill={getFarge(name)}
                    className="tooltip__ikon"
                />
                <span className="tooltip__item-value">{value + ' %'}</span>
            </span>,
        ]}
        separator={': '}
        active={true}
        contentStyle={{ border: '2px solid #3E3832', borderRadius: '0.25rem' }}
    />
);
export default grafTooltip;
