import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import classNames from 'classnames';
import klokkeSvg from './klokke.svg';
import './AntallMinutter.less';

interface Props {
    className?: string;
    antallMinutter: number;
}

export const AntallMinutter: FunctionComponent<Props> = ({ antallMinutter, className }) => {
    const tekst = antallMinutter === 1 ? 'minutt' : 'minutter';
    return (
        <Normaltekst className={classNames('antall-minutter', className)}>
            <img src={klokkeSvg} alt="klokkeikon" />
            {antallMinutter} {tekst}
        </Normaltekst>
    );
};
