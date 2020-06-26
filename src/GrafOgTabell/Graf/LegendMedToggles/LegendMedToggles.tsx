import React, { FunctionComponent } from 'react';
import { CheckboxGruppe } from 'nav-frontend-skjema';
import { Linje, LinjerMedLabel } from '../graf-utils';
import { LegendCheckbox } from './LegendChechbox/LegendCheckbox';
import './LegendMedToggles.less';

interface Props {
    linjerMedLabel: LinjerMedLabel;
    harBransje: boolean;
    setLinjerSomSkalVises: (linjer: Linje[]) => void;
    linjerSomSkalVises: Linje[];
}

export const LegendMedToggles: FunctionComponent<Props> = ({
    linjerMedLabel,
    harBransje,
    setLinjerSomSkalVises,
    linjerSomSkalVises,
}) => {
    const onChange = (e: any) => {
        const linje = e.target.value;
        if (linjerSomSkalVises.includes(linje)) {
            setLinjerSomSkalVises(linjerSomSkalVises.filter((enLinje) => enLinje !== linje));
        } else {
            setLinjerSomSkalVises([...linjerSomSkalVises, linje]);
        }
    };

    const fellesprops = {
        linjerSomSkalVises,
        linjerMedLabel,
        onChange,
    };
    return (
        <div className="legend-med-toggles">
            <CheckboxGruppe>
                <LegendCheckbox linje="virksomhet" prefiks="Virksomhet:" {...fellesprops} />
                <LegendCheckbox
                    linje="overordnetEnhet"
                    prefiks="Overordnet enhet:"
                    {...fellesprops}
                />
                <LegendCheckbox
                    linje="næringEllerBransje"
                    prefiks={harBransje ? 'Bransje:' : 'Næring:'}
                    {...fellesprops}
                />
                <LegendCheckbox linje="sektor" prefiks="Sektor:" {...fellesprops} />
                <LegendCheckbox linje="land" prefiks="" {...fellesprops} />
            </CheckboxGruppe>
        </div>
    );
};
