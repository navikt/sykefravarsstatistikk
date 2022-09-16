import React, {FunctionComponent, ReactElement} from 'react';
import {Ingress, Normaltekst} from 'nav-frontend-typografi';
import {getAriaLabelTekstForOppdateringsdato, periodeFraOgTil} from '../../utils/app-utils';
import './ForklaringAvPeriode.less';
import {SammenligningsType} from '../vurderingstekster';
import classNames from 'classnames';

interface Props {
  sammenligningsType: SammenligningsType;
  className?: string;
}

export const ForklaringAvPeriode: FunctionComponent<Props> = (
    {
      sammenligningsType,
      className,
    }) => {
  const getTittel = (sammenligningsType: SammenligningsType): ReactElement => {
    switch (sammenligningsType) {
      case SammenligningsType.TOTALT:
        return <>Legemeldt sykefravær</>;
      case SammenligningsType.KORTTID:
        return (
            <>
              Andel legemeldt korttidsfravær <br/> fra 1. til 16. dag
            </>
        );
      case SammenligningsType.LANGTID:
        return (
            <>
              Andel legemeldt langtidsfravær <br/> fra 17. dag
            </>
        );
      case SammenligningsType.GRADERT:
        return <>Gradert sykmelding</>;
    }
  };

  return (
      <div className={classNames('forklaring-av-periode', className)}>
        <Ingress tag='h3' className='forklaring-av-periode__tittel'>
          <strong>{getTittel(sammenligningsType)}</strong>
        </Ingress>
        <Normaltekst>{periodeFraOgTil}</Normaltekst>
        <Normaltekst>{getAriaLabelTekstForOppdateringsdato()}</Normaltekst>
      </div>
  );
};
