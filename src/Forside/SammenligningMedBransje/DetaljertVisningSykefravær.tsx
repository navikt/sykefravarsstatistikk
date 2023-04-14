import React, { FunctionComponent, ReactElement } from 'react';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import { Prosent } from '../Prosent';
import './DetaljertVisningSykefravær.less';
import classNames from 'classnames';

interface Props {
    overskrift: string;
    prosent: string | undefined | null;
    visingAntallKvartaller: ReactElement | undefined | null;
    className?: string;
}

export const DetaljertVisningSykefravær: FunctionComponent<Props> = ({
    overskrift,
    prosent,
    visingAntallKvartaller,
    className,
}) => {
    return (
        <div className={classNames('detaljert-visning-sykefravær', className)}>
            <Ingress className="detaljert-visning-sykefravær__tittel" tag="span">
                {overskrift}
            </Ingress>
            <Systemtittel
                tag="p"
                className="detaljert-visning-sykefravær__prosent-og-antall-kvartaller"
            >
                <Prosent prosent={prosent} />
                {visingAntallKvartaller}
            </Systemtittel>
        </div>
    );
};
