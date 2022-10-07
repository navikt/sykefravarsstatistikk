import React, { FunctionComponent, ReactElement } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import './ForklaringAvPeriode.less';
import { SammenligningsType } from '../vurderingstekster';
import classNames from 'classnames';
import { RestPubliseringsdatoer } from '../../api/publiseringsdatoer-api';
import { PeriodeForStatistikk } from './PeriodeForStatistikk';
import { PubliseringsdatoOppdateringsinfo } from './PubliseringsdatoOppdateringsinfo';

interface Props {
    sammenligningsType: SammenligningsType;
    className?: string;
    restPubliseringsdatoer: RestPubliseringsdatoer;
}

export const ForklaringAvPeriode: FunctionComponent<Props> = ({
    sammenligningsType,
    className,
    restPubliseringsdatoer,
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
            case SammenligningsType.GRADERT:
                return <>Gradert sykmelding</>;
        }
    };

    return (
        <div className={classNames('forklaring-av-periode', className)}>
            <Ingress tag="h3" className="forklaring-av-periode__tittel">
                <strong>{getTittel(sammenligningsType)}</strong>
            </Ingress>
            <PeriodeForStatistikk restPubliseringsdatoer={restPubliseringsdatoer} />
            <PubliseringsdatoOppdateringsinfo restPubliseringsdatoer={restPubliseringsdatoer} />
        </div>
    );
};
