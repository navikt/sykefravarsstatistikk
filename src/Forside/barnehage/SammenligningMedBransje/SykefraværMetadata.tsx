import React, {FunctionComponent, ReactElement} from 'react';
import { Ingress, Undertekst } from 'nav-frontend-typografi';
import { sisteOppdatering } from '../../../utils/app-utils';
import './SykefraværMetadata.less';
import {SammenligningsType} from "../vurderingstekster";

interface Props {
    sammenligningsType: SammenligningsType;
    periode: string;
}

export const SykefraværMetadata: FunctionComponent<Props> = ({ sammenligningsType, periode }) => {

    const getTittel =  (sammenligningsType: SammenligningsType): ReactElement => {
        switch (sammenligningsType) {
            case SammenligningsType.TOTALT:
                return <>Legemeldt sykefravær</>;
            case SammenligningsType.KORTTID:
                return <>Andel legemeldt korttidsfravær <br/> fra 1. til 16. dag</>;
            case SammenligningsType.LANGTID:
                return <>Andel legemeldt langtidsfravær <br/> fra 17. dag</>;
        }
    };

     return (
        <div className="sykefravær-metadata">
            <Ingress tag="h3" className="sykefravær-metadata__tittel">
                {getTittel(sammenligningsType)}
            </Ingress>
            <Undertekst>Periode: {periode}</Undertekst>
            <Undertekst>Sist oppdatert: {sisteOppdatering}</Undertekst>
        </div>
    );
};
