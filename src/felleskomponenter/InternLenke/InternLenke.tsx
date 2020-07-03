import React, { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './InternLenke.less';

interface Props {
    pathname: string;
    onClick?: (e: any) => any;
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
            className="intern-lenke"
        >
            {props.children}
        </Link>
    );
};

export default InternLenke;
