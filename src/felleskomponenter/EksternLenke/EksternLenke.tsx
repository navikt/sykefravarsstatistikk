import React, { FunctionComponent } from 'react';
import Lenke, { Props } from 'nav-frontend-lenker';
import { ReactComponent as EksternLenkeIkon } from './EksternLenkeIkon.svg';
import './EksternLenke.less';
import classNames from 'classnames';

const EksternLenke: FunctionComponent<Props> = (props) => (
    <Lenke
        {...props}
        className={classNames('ekstern-lenke', props.className)}
        target="_blank"
        rel="noopener noreferrer"
    >
        {props.children}
        <EksternLenkeIkon className="ekstern-lenke__ikon" />
    </Lenke>
);

export default EksternLenke;
