import { Legend, LegendProps } from 'recharts';
import React from 'react';
import { getFarge, getSymbol, linjer } from '../Graf';
import './grafLegend.less';
import SymbolSvg from '../SymbolSvg';
import { Element, Normaltekst } from 'nav-frontend-typografi';

const labels = {
    virksomhet: 'FLESK OG FISK OSLO',
    næring: (
        <div>
            <Element>Næring:</Element>
            <Normaltekst>Jordbruk og tjenester tilknyttet jordbruk, jakt og viltstell</Normaltekst>
        </div>
    ),
    sektor: (
        <div>
            <Element>Sektor:</Element>
            <Normaltekst>Privat og offentlig næringsvirksomhet</Normaltekst>
        </div>
    ),
    land: 'Norge',
};

const grafLegend = () => {
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
            payload={linjer.map(name => {
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
