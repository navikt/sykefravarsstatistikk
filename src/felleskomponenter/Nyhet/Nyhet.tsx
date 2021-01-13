import React, { FunctionComponent } from 'react';
import { Element } from 'nav-frontend-typografi';
import './Nyhet.less';
import classNames from 'classnames';

export const Nyhet: FunctionComponent<{ className?: string }> = ({ className }) => (
    <Element tag="span" className={classNames('nyhet', className)}>
        Nyhet
    </Element>
);
