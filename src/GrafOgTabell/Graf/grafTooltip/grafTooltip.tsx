import React from 'react';
import {Tooltip} from 'recharts';
import './grafTooltip.less';
import {getTooltipsnavn} from '../graf-utils';
import {GrafSymbol} from '../GrafSymbol/GrafSymbol';

const grafTooltip = (harBransje: boolean) => (
    <Tooltip
        formatter={(value: any, name: any) => [
          <span className="tooltip__item-wrapper" key={`tooltip-${name}`}>
                <GrafSymbol linje={name} className="tooltip__ikon"/>
                <div className="tooltip__item-navn-og-verdi">
                    <span className="tooltip__item-navn">{getTooltipsnavn(name, harBransje)}</span>
                    <span className="tooltip__item-verdi">{value + ' %'}</span>
                </div>
            </span>,
        ]}
        separator={': '}
        active={true}
        contentStyle={{border: '2px solid #254B6D', borderRadius: '0.25rem'}}
        labelStyle={{paddingBottom: '0.5rem'}}
        cursor={{stroke: '#254B6D', strokeWidth: 3, type: 'dot'}}
    />
);

export default grafTooltip;
