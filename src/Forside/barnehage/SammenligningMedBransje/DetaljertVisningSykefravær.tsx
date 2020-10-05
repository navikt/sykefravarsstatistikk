import React, { FunctionComponent, ReactElement } from 'react';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import { Prosent } from '../Prosent';
import './DetaljertVisningSykefravær.less';

interface Props {
    overskrift: string;
    prosent: number | undefined | null;
    visingAntallKvartaller: ReactElement | undefined | null;
}

export const DetaljertVisningSykefravær: FunctionComponent<Props> = ({
    overskrift,
    prosent,
    visingAntallKvartaller,
}) => {
    return (
        <div className="detaljert-visning-sykefravær">
            <Ingress className="detaljert-visning-sykefravær__tittel" tag="span">
                {overskrift}
            </Ingress>
            <Systemtittel tag="p" className="detaljert-visning-sykefravær__prosent-og-antall-kvartaller">
                <Prosent prosent={prosent} />
                {visingAntallKvartaller}
            </Systemtittel>
        </div>
    );
};
