import React, {FunctionComponent, ReactElement} from 'react';
import {Ingress, Normaltekst} from 'nav-frontend-typografi';
import {
  formatterDatoMedMånedNavn,
  getÅrstallOgKvartalTilPeriode,
} from '../../utils/app-utils';
import './ForklaringAvPeriode.less';
import {SammenligningsType} from '../vurderingstekster';
import classNames from 'classnames';
import {
  RestPubliseringsdatoer
} from "../../api/publiseringsdatoer-api";
import {RestStatus} from "../../api/api-utils";
import NavFrontendSpinner from "nav-frontend-spinner";

interface Props {
  sammenligningsType: SammenligningsType;
  className?: string;
  restPubliseringsdatoer: RestPubliseringsdatoer;
}

export const ForklaringAvPeriode: FunctionComponent<Props> = (
    {
      sammenligningsType,
      className,
      restPubliseringsdatoer,
    }) => {

  const getPubliseringsdatoinfoElement = (): ReactElement => {
    if (restPubliseringsdatoer.status === RestStatus.Suksess) {
      const publiseringsdatoer = restPubliseringsdatoer.data;
      return (
          <div>
            <Normaltekst>{`Sist oppdatert: `+ formatterDatoMedMånedNavn(new Date(publiseringsdatoer.sistePubliseringsdato))}</Normaltekst>
            <Normaltekst>{`Neste oppdatering: `+ formatterDatoMedMånedNavn(new Date(publiseringsdatoer.nestePubliseringsdato))}</Normaltekst>
          </div>
      )
    } else if (
        restPubliseringsdatoer.status === RestStatus.LasterInn ||
        restPubliseringsdatoer.status === RestStatus.IkkeLastet
    ) {
      return <NavFrontendSpinner/>
    } else {
      return <Normaltekst>{""}</Normaltekst>
    }
  }

  const getPeriodeElement = (): ReactElement => {
    if (restPubliseringsdatoer.status === RestStatus.Suksess) {
      return (
          <div>
            <Normaltekst>{`Periode: `+ getÅrstallOgKvartalTilPeriode(restPubliseringsdatoer.data.gjeldendePeriode)}</Normaltekst>
          </div>
      )
    } else if (
        restPubliseringsdatoer.status === RestStatus.IkkeLastet ||
        restPubliseringsdatoer.status === RestStatus.LasterInn
    ) {
      return <NavFrontendSpinner/>
    } else {
      return <Normaltekst>{""}</Normaltekst>
    }
  }

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
        {getPeriodeElement()}
        {getPubliseringsdatoinfoElement()}
      </div>
  );
};
