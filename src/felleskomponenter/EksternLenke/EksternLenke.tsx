import React, { FunctionComponent } from 'react';
import Lenke, { Props } from 'nav-frontend-lenker';
import { ReactComponent as EksternLenkeIkon } from './EksternLenkeIkon.svg';
import './EksternLenke.less';
import classNames from 'classnames';
import { useSendNavigereEvent } from '../../amplitude/amplitude';

interface ExtendedProps {
    children: string;
}

const EksternLenke: FunctionComponent<Props & ExtendedProps> = (props) => {
    const sendNavigereEvent = useSendNavigereEvent();

    return (
        <Lenke
            {...props}
            className={classNames('ekstern-lenke', props.className)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
                sendNavigereEvent({
                    lenketekst: props.children,
                    destinasjon: props.href,
                    url: window.location.href,
                });
            }}
        >
            {props.children}
            <EksternLenkeIkon className="ekstern-lenke__ikon" />
        </Lenke>
    );
};

export default EksternLenke;
