import React, { FunctionComponent } from 'react';
import Lenke, { Props } from 'nav-frontend-lenker';
import { ReactComponent as EksternLenkeIkon } from './EksternLenkeIkon.svg';
import "./EksternLenke.less";

const EksternLenke: FunctionComponent<Props> = props => (
    <Lenke {...props} className="ekstern-lenke">
        {props.children}
        <EksternLenkeIkon className="ekstern-lenke__ikon"/>
    </Lenke>
);

export default EksternLenke;
