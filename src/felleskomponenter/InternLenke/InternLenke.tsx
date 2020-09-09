import React, { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './InternLenke.less';
import classNames from 'classnames';

interface Props {
    pathname: string;
    className?: string;
    onClick?: (e: any) => any;
    ariaCurrentLocation?: boolean;
}

const InternLenke: FunctionComponent<Props> = (props) => {
    const location = useLocation();

    return (
        <Link
            to={{
                pathname: props.pathname,
                search: location.search,
            }}
            onClick={props.onClick}
            className={classNames('intern-lenke', props.className)}
            aria-current={props.ariaCurrentLocation && 'location'}
        >
            {props.children}
        </Link>
    );
};

export default InternLenke;
