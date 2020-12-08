import React, { FunctionComponent } from 'react';
import Lenke, { Props } from 'nav-frontend-lenker';
import { ReactComponent as EksternLenkeIkon } from './EksternLenkeIkon.svg';
import './EksternLenke.less';
import classNames from 'classnames';
import { EventData, useSendNavigereEvent } from '../../amplitude/amplitude';

interface ExtendedProps {
    children: string;
    eventProperties?: EventData;
}

const EksternLenke: FunctionComponent<Props & ExtendedProps> = ({
    children,
    eventProperties,
    className,
    ...lenkeProperties
}) => {
    const sendNavigereEvent = useSendNavigereEvent();

    return (
        <Lenke
            {...lenkeProperties}
            className={classNames('ekstern-lenke', className)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
                sendNavigereEvent({
                    lenketekst: children,
                    destinasjon: lenkeProperties.href,
                    url: window.location.href,
                    ...eventProperties
                });
            }}
        >
            {children}
            <EksternLenkeIkon className="ekstern-lenke__ikon" />
        </Lenke>
    );
};

export default EksternLenke;
