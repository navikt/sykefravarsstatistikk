import { Legend, LegendProps } from 'recharts';
import React from 'react';
import './grafLegend.less';
import SymbolSvg from '../SymbolSvg';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { getFarge, getSymbol, grafConfig } from '../graf-utils';

const grafLegend = (
    labelVirksomhet: string,
    labelNæringEllerBransje: string,
    labelSektor: string,
    labelLand: string,
    harBransje: boolean
) => {
    const labels = {
        virksomhet: labelVirksomhet,
        næringEllerBransje: (
            <div>
                <Element>{harBransje ? 'Bransje:' : 'Næring:'}</Element>
                <Normaltekst>{labelNæringEllerBransje}</Normaltekst>
            </div>
        ),
        sektor: (
            <div>
                <Element>Sektor:</Element>
                <Normaltekst>Privat og offentlig næringsvirksomhet</Normaltekst>
            </div>
        ),
        land: labelLand,
    };

    const innhold = (props: LegendProps) => (
        <ul className="graf-legend">
            {props.payload!.map(load => (
                <li className="graf-legend__listeelement" key={load.value}>
                    <span>
                        <SymbolSvg
                            size={40}
                            symbolType={getSymbol(load.value)}
                            fill={getFarge(load.value)}
                            className="graf-legend__ikon"
                        />
                    </span>
                    {(labels as any)[load.value]}
                </li>
            ))}
        </ul>
    );

    return (
        <Legend
            wrapperStyle={{ paddingTop: 40 }}
            payload={grafConfig.linjer.map(name => {
                return {
                    value: name,
                    type: getSymbol(name),
                    id: name,
                    color: getFarge(name),
                };
            })}
            content={innhold}
        />
    );
};

export default grafLegend;
