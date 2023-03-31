import React, { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './InternLenke.less';
import classNames from 'classnames';
import { sendNavigereEvent } from '../../amplitude/events';

interface Props {
    pathname: string;
    className?: string;
    onClick?: (e: any) => any;
    ariaCurrentLocation?: boolean;
}

const InternLenke: FunctionComponent<Props> = ({ children: lenketekst, ...props }) => {
    const location = useLocation();

    if (typeof lenketekst !== 'string') {
        throw Error('EksternLenke støttes bare av tekstlenker.');
    }

    return (
        <Link
            to={{
                pathname: props.pathname,
                search: location.search,
            }}
            onClick={(e) => {
                sendNavigereEvent(props.pathname, lenketekst);
                props.onClick?.(e);
            }}
            className={classNames('intern-lenke', props.className)}
            aria-current={props.ariaCurrentLocation && 'location'}
        >
            {lenketekst}
        </Link>
    );
};

export default InternLenke;
