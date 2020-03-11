import { Legend, LegendProps } from 'recharts';
import React from 'react';
import './grafLegend.less';
import SymbolSvg from '../SymbolSvg';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { getFarge, getSymbol, grafConfig } from '../graf-utils';

const grafLegend = (
    labelVirksomhet: string,
    labelOverordnetEnhet: string,
    labelNæringEllerBransje: string,
    labelSektor: string,
    labelLand: string,
    harBransje: boolean,
    harOverordnetEnhet: boolean
) => {
    const labels = {
        virksomhet: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">Virksomhet:</Element>
                <Normaltekst>{labelVirksomhet}</Normaltekst>
            </div>
        ),
        overordnetEnhet: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">Overordnet enhet:</Element>
                <Normaltekst>{labelOverordnetEnhet}</Normaltekst>
            </div>
        ),
        næringEllerBransje: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">
                    {harBransje ? 'Bransje:' : 'Næring:'}
                </Element>
                <Normaltekst>{labelNæringEllerBransje}</Normaltekst>
            </div>
        ),
        sektor: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">Sektor:</Element>
                <Normaltekst>Privat og offentlig næringsvirksomhet</Normaltekst>
            </div>
        ),
        land: (
            <div className="graf-legend__tekst">
                <Element>Norge</Element>
            </div>
        ),
    };

    const innhold = (props: LegendProps) => (
        <ul className="graf-legend">
            {props.payload!.map(load => (
                <li className="graf-legend__listeelement" key={load.value}>
                    <span>
                        <SymbolSvg
                            size={25}
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

    const linjer = harOverordnetEnhet
        ? grafConfig.linjer
        : grafConfig.linjer.filter(name => name !== 'overordnetEnhet');

    return (
        <Legend
            wrapperStyle={{ paddingBottom: 30 }}
            verticalAlign="top"
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
