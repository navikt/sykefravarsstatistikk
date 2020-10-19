import React, { FunctionComponent, ReactElement } from 'react';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import { getTekstForOppdateringsdato } from '../../../utils/app-utils';
import './SykefraværMetadata.less';
import { SammenligningsType } from '../vurderingstekster';
import classNames from 'classnames';

interface Props {
    sammenligningsType: SammenligningsType;
    periode: string;
    className?: string;
}

export const SykefraværMetadata: FunctionComponent<Props> = ({
    sammenligningsType,
    periode,
    className,
}) => {
    const getTittel = (sammenligningsType: SammenligningsType): ReactElement => {
        switch (sammenligningsType) {
            case SammenligningsType.TOTALT:
                return <>Legemeldt sykefravær</>;
            case SammenligningsType.KORTTID:
                return (
                    <>
                        Andel legemeldt korttidsfravær <br /> fra 1. til 16. dag
                    </>
                );
            case SammenligningsType.LANGTID:
                return (
                    <>
                        Andel legemeldt langtidsfravær <br /> fra 17. dag
                    </>
                );
        }
    };

    return (
        <div className={classNames('sykefravær-metadata', className)}>
            <Ingress tag="h3" className="sykefravær-metadata__tittel">
                <strong>{getTittel(sammenligningsType)}</strong>
            </Ingress>
            <Normaltekst>Periode: {periode}</Normaltekst>
            <Normaltekst>{getTekstForOppdateringsdato()}</Normaltekst>
        </div>
    );
};
