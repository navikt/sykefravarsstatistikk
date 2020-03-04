import React, { FunctionComponent } from 'react';
import { RestStatus } from '../../api/api-utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import classNames from 'classnames';

interface Props {
    status: RestStatus;
    className?: string;
}

const SammenligningspanelFeilmelding: FunctionComponent<Props> = props => {
    const { status, children, className } = props;
    if (
        status === RestStatus.Suksess ||
        status === RestStatus.IkkeLastet ||
        status === RestStatus.LasterInn
    ) {
        return null;
    } else {
        return <AlertStripeFeil className={classNames(className)}>{children}</AlertStripeFeil>;
    }
};

export default SammenligningspanelFeilmelding;
