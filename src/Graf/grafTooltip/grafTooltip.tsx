import React from 'react';
import { Tooltip } from 'recharts';
import SymbolSvg from '../SymbolSvg';
import { getFarge, getSymbol } from '../Graf';
import './grafTooltip.less';

const grafTooltip = () => (
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
        contentStyle={{ border: '2px solid #254B6D', borderRadius: '0.25rem' }}
        labelStyle={{ paddingBottom: '0.5rem' }}
        //cursor={{strokeDasharray: 16, strokeWidth: 3, type: 'dot'}}
        cursor={{ stroke: '#254B6D\n', strokeWidth: 3, type: 'dot' }}
    />
);

export default grafTooltip;
