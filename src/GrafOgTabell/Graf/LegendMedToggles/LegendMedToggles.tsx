import React, { FunctionComponent } from 'react';
import { CheckboxGruppe } from 'nav-frontend-skjema';
import { LabelsForLinjer, Linje } from '../graf-utils';
import { LegendCheckbox } from './LegendChechbox/LegendCheckbox';
import './LegendMedToggles.less';

interface Props {
    labels: LabelsForLinjer;
    harBransje: boolean;
    linjerSomSkalVises: Linje[];
    setLinjerSomSkalVises: (linjer: Linje[]) => void;
}

export const LegendMedToggles: FunctionComponent<Props> = ({
    labels,
    harBransje,
    linjerSomSkalVises,
    setLinjerSomSkalVises,
}) => {
    const onChange = (e: any) => {
        const linje = e.target.value;
        if (linjerSomSkalVises.includes(linje)) {
            setLinjerSomSkalVises(linjerSomSkalVises.filter((enLinje) => enLinje !== linje));
        } else {
            setLinjerSomSkalVises([...linjerSomSkalVises, linje]);
        }
    };

    const checkboxProps = {
        linjerSomSkalVises,
        labels,
        onChange,
    };
    return (
        <div className="legend-med-toggles">
            <CheckboxGruppe>
                <LegendCheckbox linje="virksomhet" prefiks="Virksomhet:" {...checkboxProps} />
                <LegendCheckbox
                    linje="overordnetEnhet"
                    prefiks="Overordnet enhet:"
                    {...checkboxProps}
                />
                <LegendCheckbox
                    linje="næringEllerBransje"
                    prefiks={harBransje ? 'Bransje:' : 'Næring:'}
                    {...checkboxProps}
                />
                <LegendCheckbox linje="sektor" prefiks="Sektor:" {...checkboxProps} />
                <LegendCheckbox linje="land" {...checkboxProps} />
            </CheckboxGruppe>
        </div>
    );
};
