import React, {FunctionComponent} from 'react';
import classNames from 'classnames';
import {KakediagramGrønn} from './KakediagramGrønn';
import {KakediagramGrå} from './KakediagramGrå';
import {KakediagramGul} from './KakediagramGul';
import {KakediagramRød} from './KakediagramRød';
import { SykefraværVurdering } from "../vurdering-utils";



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
    case 'UNDER':
      return <KakediagramRød/>;
    case 'MIDDELS':
      return <KakediagramGul/>;
    case 'OVER':
      return <KakediagramGrønn/>;
    case 'MASKERT':
    case 'FEIL_ELLER_INGEN_DATA':
    case 'UFULLSTENDIG_DATA':
      return <KakediagramGrå/>;
  }
};
