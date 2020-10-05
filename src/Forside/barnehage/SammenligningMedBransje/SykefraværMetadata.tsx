import React, { FunctionComponent } from 'react';
import { Ingress, Undertekst } from 'nav-frontend-typografi';
import { sisteOppdatering } from '../../../utils/app-utils';
import './SykefraværMetadata.less';

interface Props {
    tittel: string;
    periode: string;
}

export const SykefraværMetadata: FunctionComponent<Props> = ({ tittel, periode }) => {
    return (
        <div className="sykefravær-metadata">
            <Ingress tag="h3" className="sykefravær-metadata__tittel">
                {tittel}
            </Ingress>
            <Undertekst>Periode: {periode}</Undertekst>
            <Undertekst>Sist oppdatert: {sisteOppdatering}</Undertekst>
        </div>
    );
};
