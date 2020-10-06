import React, { FunctionComponent } from 'react';
import { CheckboxGruppe } from 'nav-frontend-skjema';
import { LabelsForLinjer, Linje } from '../graf-utils';
import { LegendCheckbox } from './LegendChechbox/LegendCheckbox';
import './LegendMedToggles.less';
import { useSendEvent } from '../../../amplitude/amplitude';

interface Props {
    labels: LabelsForLinjer;
    harBransje: boolean;
    linjerSomKanVises: Linje[];
    linjerSomSkalVises: Linje[];
    setLinjerSomSkalVises: (linjer: Linje[]) => void;
}

export const LegendMedToggles: FunctionComponent<Props> = ({
    labels,
    harBransje,
    linjerSomKanVises,
    linjerSomSkalVises,
    setLinjerSomSkalVises,
}) => {
    const sendEvent = useSendEvent();

    const onChange = (event: any) => {
        const linje = event.target.value;
        if (linjerSomSkalVises.includes(linje)) {
            sendEvent('graf legend ' + linje, 'klikk', {
                toggle: 'av',
            });
            setLinjerSomSkalVises(linjerSomSkalVises.filter((enLinje) => enLinje !== linje));
        } else {
            sendEvent('graf legend ' + linje, 'klikk', {
                toggle: 'på',
            });
            setLinjerSomSkalVises([...linjerSomSkalVises, linje]);
        }
    };

    const checkboxProps = {
        linjerSomSkalVises,
        labels,
        onChange,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prefikser: { [linje in Linje]: string } = {
        virksomhet: 'Virksomhet:',
        overordnetEnhet: 'Overordnet enhet:',
        næringEllerBransje: harBransje ? 'Bransje:' : 'Næring:',
        sektor: 'Sektor:',
    };

    return (
        <div className="legend-med-toggles">
            <CheckboxGruppe>
                {linjerSomKanVises.map((linje) => (
                    <LegendCheckbox
                        key={linje}
                        {...checkboxProps}
                        linje={linje}
                        prefiks={prefikser[linje]}
                    />
                ))}
            </CheckboxGruppe>
        </div>
    );
};
