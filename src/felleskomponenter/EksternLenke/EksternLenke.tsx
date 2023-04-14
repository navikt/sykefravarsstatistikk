import React, { FunctionComponent } from 'react';
import Lenke, { Props } from 'nav-frontend-lenker';
import { ReactComponent as EksternLenkeIkon } from './EksternLenkeIkon.svg';
import './EksternLenke.less';
import classNames from 'classnames';
import { sendNavigereEvent } from '../../amplitude/events';

const EksternLenke: FunctionComponent<Props> = ({
    children: lenketekst,
    className,
    ...lenkeProperties
}) => {
    if (typeof lenketekst !== 'string') {
        throw Error('EksternLenke støttes bare av tekstlenker.');
    }

    return (
        <Lenke
            {...lenkeProperties}
            className={classNames('ekstern-lenke', className)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
                sendNavigereEvent(lenkeProperties.href, lenketekst);
            }}
        >
            {lenketekst}
            <EksternLenkeIkon className="ekstern-lenke__ikon" />
        </Lenke>
    );
};

export default EksternLenke;
