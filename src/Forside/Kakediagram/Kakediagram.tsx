import React, {FunctionComponent} from 'react';
import classNames from 'classnames';
import {KakediagramGrønn} from './KakediagramGrønn';
import {KakediagramGrå} from './KakediagramGrå';
import {KakediagramGul} from './KakediagramGul';
import {KakediagramRød} from './KakediagramRød';

export enum SykefraværVurdering {
  UNDER = 'UNDER',
  MIDDELS = 'MIDDELS',
  OVER = 'OVER',
  MASKERT = 'MASKERT',
  UFULLSTENDIG_DATA = 'UFULLSTENDIG_DATA',
  FEIL_ELLER_INGEN_DATA = 'FEIL_ELLER_INGEN_DATA',
}

interface Props {
  resultat: SykefraværVurdering;
  className?: string;
}

export const Kakediagram: FunctionComponent<Props> = ({resultat, className}) => {

  return (
      <span className={classNames(className, 'kakediagram')}>
            <KakediagramSvg resultat={resultat}/>
        </span>
  );
};

const KakediagramSvg: FunctionComponent<{
  resultat: SykefraværVurdering;
}> = ({resultat}) => {
  switch (resultat) {
    case SykefraværVurdering.UNDER:
      return <KakediagramRød/>;
    case SykefraværVurdering.MIDDELS:
      return <KakediagramGul/>;
    case SykefraværVurdering.OVER:
      return <KakediagramGrønn/>;
    case SykefraværVurdering.MASKERT:
    case SykefraværVurdering.FEIL_ELLER_INGEN_DATA:
    case SykefraværVurdering.UFULLSTENDIG_DATA:
      return <KakediagramGrå/>;
  }
};
