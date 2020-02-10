import { Legend, LegendProps } from 'recharts';
import React from 'react';
import { getFarge, getSymbol } from '../Graf';
import './grafLegend.less';
import SymbolSvg from '../SymbolSvg';
import { Element, Normaltekst } from 'nav-frontend-typografi';

const labels = {
    virksomhet: 'STOREBRAND INTERNATIONAL PRIVATE EQUITY XI LIMITED',
    næring: <div className="eivind_wrapper"><Element>Næring:</Element><Normaltekst>Innsamling, behandling, disponering og gjenvinning av avfall</Normaltekst></div>,
    sektor: <div className="eivind_wrapper"><Element>Sektor:</Element><Normaltekst>Privat og offentlig næringsvirksomhet</Normaltekst></div>,
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
            wrapperStyle={{ paddingTop: 64 }}
            payload={['virksomhet', 'næring', 'sektor', 'land'].map(name => {
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
