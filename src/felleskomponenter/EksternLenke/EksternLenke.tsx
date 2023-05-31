import React, { FunctionComponent } from 'react';
import { Link, LinkProps } from '@navikt/ds-react';
import {
    ExternalLinkIcon
} from '@navikt/aksel-icons';
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
            className={classNames(className)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
                sendNavigereEvent(lenkeProperties.href, lenketekst);
            }}
        >
            {lenketekst}
            <ExternalLinkIcon  />
        </Link>
    );
};

export default EksternLenke;
