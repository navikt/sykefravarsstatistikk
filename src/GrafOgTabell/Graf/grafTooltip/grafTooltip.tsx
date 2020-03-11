import React from 'react';
import { Tooltip } from 'recharts';
import SymbolSvg from '../SymbolSvg';
import './grafTooltip.less';
import { getFarge, getSymbol, getTooltipsnavn } from '../graf-utils';

const grafTooltip = (harBransje: boolean) => (
    <Tooltip
        formatter={(value, name, props) => [
            <span className="tooltip__item-wrapper">
                <SymbolSvg
                    size={20}
                    symbolType={getSymbol(name)}
                    fill={getFarge(name)}
                    className="tooltip__ikon"
                />
                <div className="tooltip__item-navn-og-verdi">
                    <span className="tooltip__item-navn">{getTooltipsnavn(name, harBransje)}</span>
                    <span className="tooltip__item-verdi">{value + ' %'}</span>
                </div>
            </span>,
        ]}
        separator={': '}
        active={true}
        contentStyle={{ border: '2px solid #254B6D', borderRadius: '0.25rem' }}
        labelStyle={{ paddingBottom: '0.5rem' }}
        cursor={{ stroke: '#254B6D', strokeWidth: 3, type: 'dot' }}
    />
);

export default grafTooltip;
