import React, {ReactElement} from 'react';
import { getGrønnGrense, getRødGrense, SykefraværVurdering } from "./vurdering-utils";
import {formaterProsent} from '../utils/app-utils';
import {Normaltekst} from 'nav-frontend-typografi';

export enum SammenligningsType {
  TOTALT = 'TOTALT',
  LANGTID = 'LANGTID',
  KORTTID = 'KORTTID',
  GRADERT = 'GRADERT',
}

export const sammenliknSykefraværstekst = (
    sykefraværResultat: SykefraværVurdering,
    sammenligningsType: SammenligningsType,
    harBransje: boolean
): ReactElement | string => {
  switch (sammenligningsType) {
    case SammenligningsType.TOTALT:
      return sammenliknSykefraværstekstTotalt(sykefraværResultat, harBransje);
    case SammenligningsType.LANGTID:
      return sammenliknSykefraværstekstLangtid(sykefraværResultat, harBransje);
    case SammenligningsType.KORTTID:
      return sammenliknSykefraværstekstKorttid(sykefraværResultat, harBransje);
    case SammenligningsType.GRADERT:
      return sammenliknSykefraværstekstGradert(sykefraværResultat, harBransje);
  }
};
const sammenliknSykefraværstekstGradert = (
    sykefraværResultat: SykefraværVurdering,
    harBransje: boolean
): ReactElement | string => {
  const bransjeEllerNæringTekst = harBransje ? 'bransje' : 'næring';
  switch (sykefraværResultat) {
    case 'OVER':
      return (
          <>
            Markert grønn: Du bruker <strong>mer gradert sykmelding</strong> enn andre i
            din {bransjeEllerNæringTekst}
          </>
      );
    case 'MIDDELS':
      return (
          <>
            Markert gul: Du bruker <strong>omtrent like mye gradert sykmelding</strong> som
            andre i din {bransjeEllerNæringTekst}
          </>
      );
    case 'UNDER':
      return (
          <>
            Markert rød: Du bruker <strong>mindre gradert sykmelding</strong> enn andre i
            din {bransjeEllerNæringTekst}
          </>
      );
    case 'UFULLSTENDIG_DATA':
      return (
          <>
            Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
            sammenligning.
          </>
      );
    case 'MASKERT':
      return (
          <>
            Markert grå: Du har <strong>for lave tall</strong> til at vi kan vise
            statistikken din.
          </>
      );
    case 'FEIL_ELLER_INGEN_DATA':
      return (
          <>
            Markert grå: Vi <strong>kan ikke finne tall</strong> for virksomheten din.
          </>
      );
  }
};

const sammenliknSykefraværstekstTotalt = (
    sykefraværResultat: SykefraværVurdering,
    harBransje: boolean
): ReactElement | string => {
  const bransjeEllerNæringTekst = harBransje ? 'bransjen' : 'næringen';
  switch (sykefraværResultat) {
    case 'UNDER':
      return (
          <>
            Markert grønn: Du har <strong>lavere sykefravær</strong> enn{' '}
            {bransjeEllerNæringTekst}
          </>
      );
    case 'MIDDELS':
      return (
          <>
            Markert gul: Du har <strong>omtrent likt sykefravær</strong> som{' '}
            {bransjeEllerNæringTekst}
          </>
      );
    case 'OVER':
      return (
          <>
            Markert rød: Du har <strong>høyere sykefravær</strong> enn{' '}
            {bransjeEllerNæringTekst}
          </>
      );
    case 'UFULLSTENDIG_DATA':
      return (
          <>
            Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
            sammenligning.
          </>
      );
    case 'MASKERT':
      return (
          <>
            Markert grå: Du har <strong>for lite tallgrunnlag</strong> til at vi kan vise
            statistikken din.
          </>
      );
    case 'FEIL_ELLER_INGEN_DATA':
      return (
          <>
            Markert grå: Vi <strong>finner ikke tall</strong> for virksomheten din.
          </>
      );
  }
};

const sammenliknSykefraværstekstKorttid = (resultat: SykefraværVurdering, harBransje: boolean) => {
  const bransjeEllerNæringTekst = harBransje ? 'bransjen' : 'næringen';
  switch (resultat) {
    case 'UNDER':
      return (
          <>
            Markert grønn: Du har et <strong>lavere legemeldt korttidsfravær</strong> enn{' '}
            {bransjeEllerNæringTekst}
          </>
      );
    case 'MIDDELS':
      return (
          <>
            Markert gul: Du har <strong>omtrent likt legemeldt korttidsfravær</strong> som{' '}
            {bransjeEllerNæringTekst}
          </>
      );
    case 'OVER':
      return (
          <>
            Markert rød: Du har et <strong>høyere legemeldt korttidsfravær</strong> enn{' '}
            {bransjeEllerNæringTekst}
          </>
      );
    case 'UFULLSTENDIG_DATA':
    case 'MASKERT':
    case 'FEIL_ELLER_INGEN_DATA':
      return (
          <>
            Markert grå: Andel <strong>legemeldt korttidsfravær</strong> fra 1. til 16. dag:
          </>
      );
  }
};

export const sammenliknSykefraværstekstLangtid = (resultat: SykefraværVurdering, harBransje: boolean) => {
  const bransjeEllerNæringTekst = harBransje ? 'bransjen' : 'næringen';
  switch (resultat) {
    case 'UNDER':
      return (
          <>
            Markert grønn: Du har et <strong>lavere langtidsfravær</strong> enn{' '}
            {bransjeEllerNæringTekst}
          </>
      );
    case 'MIDDELS':
      return (
          <>
            Markert gul: Du har <strong>omtrent likt langtidsfravær</strong> som{' '}
            {bransjeEllerNæringTekst}
          </>
      );
    case 'OVER':
      return (
          <>
            Markert rød: Du har et <strong>høyere langtidsfravær</strong> enn{' '}
            {bransjeEllerNæringTekst}
          </>
      );
    case 'UFULLSTENDIG_DATA':
    case 'MASKERT':
    case 'FEIL_ELLER_INGEN_DATA':
      return (
          <>
            Markert grå: Andel <strong>langtidsfravær</strong> fra 17. dag:
          </>
      );
  }
};

export const getForklaringAvVurdering = (
    resultat: SykefraværVurdering,
    bransjensProsent: number | null | undefined
) => {
  if (bransjensProsent === null || bransjensProsent === undefined) {
    return (
        <Normaltekst>
          Sammenligningen din er blitt markert som grå fordi vi ikke finner tall for
          bransjen/næringen din. Vi viser dine tall når de publiseres.
        </Normaltekst>
    );
  }

  switch (resultat) {
    case 'UNDER':
      return (
          <Normaltekst>
            Sammenligningen din er blitt markert som grønn på en skala grønn, gul og rød.
            <br/>
            Dette skjer når ditt sykefravær er lavere enn{' '}
            {formaterProsent(getGrønnGrense(bransjensProsent))} prosent.
          </Normaltekst>
      );
    case 'MIDDELS':
      return (
          <Normaltekst>
            Sammenligningen din er blitt markert som gul på en skala grønn, gul og rød.
            <br/>
            Dette skjer når ditt sykefravær er mellom{' '}
            {formaterProsent(getGrønnGrense(bransjensProsent))} og{' '}
            {formaterProsent(getRødGrense(bransjensProsent))} prosent.
          </Normaltekst>
      );
    case 'OVER':
      return (
          <Normaltekst>
            Sammenligningen din er blitt markert som rød på en skala grønn, gul og rød.
            <br/>
            Dette skjer når ditt sykefravær er høyere enn{' '}
            {formaterProsent(getRødGrense(bransjensProsent))} prosent.
          </Normaltekst>
      );
    case 'UFULLSTENDIG_DATA':
      return (
          <Normaltekst>
            Sammenligningen blir markert grå fordi vi mangler dine tall for deler av
            perioden. Sammenligningen lages når vi har tall for alle perioder.
          </Normaltekst>
      );
    case 'MASKERT':
      return (
          <Normaltekst>
            Sammenligningen din er blitt markert som grå fordi du har for lave tall til at
            vi kan vise statistikken din.
          </Normaltekst>
      );
    case 'FEIL_ELLER_INGEN_DATA':
      return (
          <Normaltekst>
            Sammenligningen din er blitt markert som grå fordi vi ikke finner tall for
            virksomheten din. Vi viser dine tall når de publiseres.
          </Normaltekst>
      );
  }
};

export const getTilpassetTittelOgTekstOmGradertSykmelding = (
    resultat: SykefraværVurdering
): { tittel: String; tekst: String } => {
  switch (resultat) {
    case 'OVER':
      return {
        tittel: 'Du bruker mer gradert sykmelding enn andre i din næring',
        tekst:
            'Det er positivt å bruke gradert sykmelding. Vurder bruken av gradert sykmelding sammen med langtidsfraværet. Er fraværet høyt eller lavt totalt sett? ',
      };
    case 'UNDER':
      return {
        tittel: 'Du bruker mindre gradert sykmelding enn andre i din næring',
        tekst:
            'Vurder bruken av gradert sykmelding sammen med langtidsfraværet. Er fraværet høyt eller lavt? Økt bruk av gradert sykmelding er et av flere virkemidler for å forebygge og redusere langtidsfravær. ',
      };
    case 'MIDDELS':
      return {
        tittel:
            'Du bruker omtrent like mye gradert sykmelding som andre i din bransje/næring',
        tekst:
            'Vurder bruken av gradert sykmelding sammen med langtidsfraværet. Er fraværet høyt eller lavt? Økt bruk av gradert sykmelding er et av flere virkemidler for å forebygge og redusere langtidsfravær.',
      };
    case 'UFULLSTENDIG_DATA':
    case 'MASKERT':
    case 'FEIL_ELLER_INGEN_DATA':
      return {
        tittel: 'Vurder bruken av gradert sykmelding sammen med langtidsfraværet',
        tekst:
            'Vi kan ikke sammenligne deg med andre, bruk gjerne egen erfaring. Er fraværet høyt eller lavt? Økt bruk av gradert sykmelding er et av flere virkemidler for å forebygge og redusere langtidsfravær.',
      };

    default:
      return {tittel: '', tekst: ''};
  }
};
