import React from 'react';
import { getGrønnGrense, getRødGrense, SykefraværVurdering } from './vurdering-utils';
import { formaterProsent } from '../utils/app-utils';
import { Normaltekst } from 'nav-frontend-typografi';

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
): JSX.Element => {
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
): JSX.Element => {
    const bransjeEllerNæringTekst = harBransje ? 'bransje' : 'næring';
    switch (sykefraværResultat) {
        case 'OVER':
            return (
                <>
                    Markert grønn: Du bruker <strong>mer gradert sykmelding</strong> enn andre i din{' '}
                    {bransjeEllerNæringTekst}
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
        case 'MASKERT':
            return (
                <>
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </>
            );
        case 'UFULLSTENDIG_DATA':
            return (
                <>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
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
): JSX.Element => {
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
        case 'MASKERT':
            return (
                <>
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </>
            );
      case 'UFULLSTENDIG_DATA':
        return (
          <>
            Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
            sammenligning.
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

const sammenliknSykefraværstekstKorttid = (
    resultat: SykefraværVurdering,
    harBransje: boolean
): JSX.Element => {
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
        case 'MASKERT':
            return (
                <>
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </>
            );
      case 'UFULLSTENDIG_DATA':
      case 'FEIL_ELLER_INGEN_DATA':
            return (
                <>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </>
            );
    }
};

export const sammenliknSykefraværstekstLangtid = (
    resultat: SykefraværVurdering,
    harBransje: boolean
): JSX.Element => {
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
      case 'MASKERT':
            return (
                <>
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </>
            );
      case 'UFULLSTENDIG_DATA':
      case 'FEIL_ELLER_INGEN_DATA':
            return (
                <>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
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
                    <br />
                    Dette skjer når ditt sykefravær er lavere enn{' '}
                    {formaterProsent(getGrønnGrense(bransjensProsent))} prosent.
                </Normaltekst>
            );
        case 'MIDDELS':
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som gul på en skala grønn, gul og rød.
                    <br />
                    Dette skjer når ditt sykefravær er mellom{' '}
                    {formaterProsent(getGrønnGrense(bransjensProsent))} og{' '}
                    {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                </Normaltekst>
            );
        case 'OVER':
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som rød på en skala grønn, gul og rød.
                    <br />
                    Dette skjer når ditt sykefravær er høyere enn{' '}
                    {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                </Normaltekst>
            );
        case 'MASKERT':
            return (
                <>
                    Markert grå: Det er <strong>for få</strong> som har denne typen sykemelding i
                    din bedrift til at vi kan vise statistikken.
                </>
            );
      case 'UFULLSTENDIG_DATA':
        return (
          <Normaltekst>
            Sammenligningen blir markert grå fordi vi mangler dine tall for deler av
            perioden. Sammenligningen lages når vi har tall for alle perioder.
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
