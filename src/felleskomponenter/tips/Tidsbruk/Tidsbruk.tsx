import React, {FunctionComponent} from 'react';
import {Normaltekst} from 'nav-frontend-typografi';
import classNames from 'classnames';
import klokkeSvg from './klokke.svg';
import './Tidsbruk.less';

interface Props {
  className?: string;
}

export const Tidsbruk: FunctionComponent<Props> = ({children, className}) => {
  return (
      <Normaltekst tag="div" className={classNames('antall-minutter', className)}>
        <img src={klokkeSvg} alt="klokkeikon"/>
        <div className="antall-minutter__innhold">{children}</div>
      </Normaltekst>
  );
};
