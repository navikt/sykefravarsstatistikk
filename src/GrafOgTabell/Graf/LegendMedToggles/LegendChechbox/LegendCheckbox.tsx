import React, {FunctionComponent} from 'react';
import {LabelsForLinjer, Linje} from '../../graf-utils';
import {GrafSymbol} from '../../GrafSymbol/GrafSymbol';
import {Element, Normaltekst} from 'nav-frontend-typografi';
import {Checkbox} from 'nav-frontend-skjema';
import './LegendChechbox.less';

interface Props {
  linje: Linje;
  prefiks?: string;
  linjerSomSkalVises: Linje[];
  onChange: (event: any) => void;
  labels: LabelsForLinjer;
}

export const LegendCheckbox: FunctionComponent<Props> = ({
                                                           linje,
                                                           prefiks,
                                                           linjerSomSkalVises,
                                                           onChange,
                                                           labels,
                                                         }) => (
    <Checkbox
        checked={linjerSomSkalVises.includes(linje)}
        value={linje}
        onChange={onChange}
        label={
          <div className="legend-checkbox">
            <GrafSymbol linje={linje} className="legend-checkbox__symbol"/>
            {prefiks && (
                <Element tag="span" className="legend-checkbox__prefiks">
                  {prefiks}
                </Element>
            )}
            <Normaltekst tag="span">{labels[linje]}</Normaltekst>
          </div>
        }
    />
);
