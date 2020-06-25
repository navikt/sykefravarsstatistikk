import React, { FunctionComponent } from 'react';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { getFarge, getSymbol, LinjerMedLabel } from '../graf-utils';
import SymbolSvg from '../SymbolSvg';

interface Props {
    linjerMedLabel: LinjerMedLabel;
}

export const LegendMedToggles: FunctionComponent<Props> = ({ linjerMedLabel }) => {
    return (
        <CheckboxGruppe>
            {Object.keys(linjerMedLabel).map((linje) => (
                <Checkbox
                    key={linje}
                    label={
                        <>
                            <SymbolSvg
                                size={20}
                                symbolType={getSymbol(linje)}
                                fill={getFarge(linje)}
                                className="tooltip__ikon"
                            />
                            {linjerMedLabel[linje]}
                        </>
                    }
                />
            ))}
        </CheckboxGruppe>
    );
};
