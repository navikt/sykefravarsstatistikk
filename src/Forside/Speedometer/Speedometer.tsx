import React, {FunctionComponent} from 'react';
import {SpeedometerRød} from './SpeedometerRød';
import {SpeedometerGul} from './SpeedometerGul';
import {SpeedometerGrønn} from './SpeedometerGrønn';
import classNames from 'classnames';
import {SpeedometerGrå} from './SpeedometerGrå';

export enum SykefraværVurdering {
  UNDER = 'UNDER',
  MIDDELS = 'MIDDELS',
  OVER = 'OVER',
  MASKERT = 'MASKERT',
  FEIL_ELLER_INGEN_DATA = 'FEIL_ELLER_INGEN_DATA',
  UFULLSTENDIG_DATA = 'UFULLSTENDIG_DATA',
}

interface Props {
  resultat: SykefraværVurdering;
  stor?: boolean;
  className?: string;
  inline?: boolean;
}

export const Speedometer: FunctionComponent<Props> = ({
                                                        resultat,
                                                        stor,
                                                        className,
                                                        inline,
                                                      }) => {
  const størrelsesfaktor = stor ? 1.2 : 0.7;

  return inline ? (
      <span className={classNames(className, 'speedometer')}>
            <SpeedometerSvg
                resultat={resultat}
                størrelsesfaktor={størrelsesfaktor}
            />
        </span>
  ) : (
      <div className={classNames(className, 'speedometer')}>
        <SpeedometerSvg
            resultat={resultat}
            størrelsesfaktor={størrelsesfaktor}
        />
      </div>
  );
};

const SpeedometerSvg: FunctionComponent<{
  resultat: SykefraværVurdering;
  størrelsesfaktor: number;
}> = ({resultat, størrelsesfaktor}) => {
  switch (resultat) {
    case SykefraværVurdering.UNDER:
      return <SpeedometerGrønn størrelsesfaktor={størrelsesfaktor}/>;
    case SykefraværVurdering.MIDDELS:
      return <SpeedometerGul størrelsesfaktor={størrelsesfaktor}/>;
    case SykefraværVurdering.OVER:
      return <SpeedometerRød størrelsesfaktor={størrelsesfaktor}/>;
    case SykefraværVurdering.MASKERT:
    case SykefraværVurdering.FEIL_ELLER_INGEN_DATA:
    case SykefraværVurdering.UFULLSTENDIG_DATA:
      return <SpeedometerGrå størrelsesfaktor={størrelsesfaktor}/>;
  }
};
