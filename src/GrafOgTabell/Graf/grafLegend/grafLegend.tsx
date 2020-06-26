import { Legend, LegendProps } from 'recharts';
import React from 'react';
import './grafLegend.less';
import SymbolSvg from '../SymbolSvg';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { getFarge, getSymbol, Linje, LabelsForLinjer } from '../graf-utils';

const grafLegend = (
    linjerMedLabel: LabelsForLinjer,
    harBransje: boolean,
    linjer: Linje[]
) => {
    const labels = {
        virksomhet: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">Virksomhet:</Element>
                <Normaltekst>{linjerMedLabel.virksomhet}</Normaltekst>
            </div>
        ),
        overordnetEnhet: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">Overordnet enhet:</Element>
                <Normaltekst>{linjerMedLabel.overordnetEnhet}</Normaltekst>
            </div>
        ),
        næringEllerBransje: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">
                    {harBransje ? 'Bransje:' : 'Næring:'}
                </Element>
                <Normaltekst>{linjerMedLabel.næringEllerBransje}</Normaltekst>
            </div>
        ),
        sektor: (
            <div className="graf-legend__tekst">
                <Element className="graf-legend__tekst-element">Sektor:</Element>
                <Normaltekst>{linjerMedLabel.sektor}</Normaltekst>
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
            {props.payload!.map((load) => (
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

    return (
        <Legend
            wrapperStyle={{ paddingBottom: 30 }}
            verticalAlign="top"
            payload={linjer.map((name) => {
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
