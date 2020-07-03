import React, { FunctionComponent } from 'react';
import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';
import { Systemtittel } from 'nav-frontend-typografi';

interface Props {
    laster: boolean;
    className?: string;
}

const SammenligningspanelOverskrift: FunctionComponent<Props> = (props) => {
    const classname = classNames(props.className);
    if (props.laster) {
        return (
            <div>
                <Skeleton height={28} />
            </div>
        );
    } else {
        return <Systemtittel className={classname}>{props.children}</Systemtittel>;
    }
};

export default SammenligningspanelOverskrift;
