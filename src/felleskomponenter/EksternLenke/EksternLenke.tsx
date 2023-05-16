import React, { FunctionComponent } from 'react';
import { Link, LinkProps } from '@navikt/ds-react';
import { ReactComponent as EksternLenkeIkon } from './EksternLenkeIkon.svg';
import './EksternLenke.less';
import classNames from 'classnames';
import { sendNavigereEvent } from '../../amplitude/events';
import { WithRequired } from '../../utils/app-utils';

const EksternLenke: FunctionComponent<WithRequired<LinkProps, 'href'>> = ({
    children: lenketekst,
    className,
    ...lenkeProperties
}) => {
    if (typeof lenketekst !== 'string') {
        throw Error('EksternLenke støttes bare av tekstlenker.');
    }

    return (
        <Link
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
        </Link>
    );
};

export default EksternLenke;
