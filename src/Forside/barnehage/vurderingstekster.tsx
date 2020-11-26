import React, { ReactElement } from 'react';
import { SykefraværVurdering } from './Speedometer/Speedometer';
import { getGrønnGrense, getRødGrense } from './barnehage-utils';
import { formaterProsent } from '../../utils/app-utils';
import { Normaltekst } from 'nav-frontend-typografi';

export enum SammenligningsType {
    TOTALT = 'TOTALT',
    LANGTID = 'LANGTID',
    KORTTID = 'KORTTID',
}

export const getVurderingstekst = (
    sykefraværResultat: SykefraværVurdering,
    sammenligningsType: SammenligningsType
): ReactElement | string => {
    switch (sammenligningsType) {
        case SammenligningsType.TOTALT:
            return getVurderingstekstTotalt(sykefraværResultat);
        case SammenligningsType.LANGTID:
            return getVurderingstekstLangtid(sykefraværResultat);
        case SammenligningsType.KORTTID:
            return getVurderingstekstKorttid(sykefraværResultat);
    }
};

export const getVurderingstekstTotalt = (
    sykefraværResultat: SykefraværVurdering
): ReactElement | string => {
    switch (sykefraværResultat) {
        case SykefraværVurdering.UNDER:
            return (
                <>
                    Markert grønn: Du har <strong>lavere sykefravær</strong> enn andre barnehager i
                    Norge
                </>
            );
        case SykefraværVurdering.MIDDELS:
            return (
                <>
                    Markert gul: Du har <strong>omtrent likt sykefravær</strong> som andre
                    barnehager i Norge
                </>
            );
        case SykefraværVurdering.OVER:
            return (
                <>
                    Markert rød: Du har <strong>høyere sykefravær</strong> enn andre barnehager i
                    Norge
                </>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
            return (
                <>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </>
            );
        case SykefraværVurdering.MASKERT:
            return (
                <>
                    Markert grå: Du har <strong>for lave tall</strong> til at vi kan vise
                    statistikken din.
                </>
            );
        case SykefraværVurdering.INGEN_DATA:
            return (
                <>
                    Markert grå: Vi <strong>finner ikke tall</strong> for virksomheten din.
                </>
            );
        case SykefraværVurdering.FEIL:
            return <></>;
    }
};

export const getVurderingstekstKorttid = (resultat: SykefraværVurdering) => {
    switch (resultat) {
        case SykefraværVurdering.UNDER:
            return (
                <>
                    Markert grønn: Du har et <strong>lavere legemeldt korttidsfravær</strong> enn
                    bransjen
                </>
            );
        case SykefraværVurdering.MIDDELS:
            return (
                <>
                    Markert gul: Du har <strong>omtrent likt legemeldt korttidsfravær</strong> som
                    bransjen
                </>
            );
        case SykefraværVurdering.OVER:
            return (
                <>
                    Markert rød: Du har et <strong>høyere legemeldt korttidsfravær</strong> enn
                    bransjen
                </>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
        case SykefraværVurdering.MASKERT:
        case SykefraværVurdering.INGEN_DATA:
            return (
                <>
                    Markert grå: Andel <strong>legemeldt korttidsfravær</strong> fra 1. til 16. dag:
                </>
            );
        case SykefraværVurdering.FEIL:
            return <>—</>;
    }
};

export const getVurderingstekstLangtid = (resultat: SykefraværVurdering) => {
    switch (resultat) {
        case SykefraværVurdering.UNDER:
            return (
                <>
                    Markert grønn: Du har et <strong>lavere langtidsfravær</strong> enn bransjen
                </>
            );
        case SykefraværVurdering.MIDDELS:
            return (
                <>
                    Markert gul: Du har <strong>omtrent likt langtidsfravær</strong> som bransjen
                </>
            );
        case SykefraværVurdering.OVER:
            return (
                <>
                    Markert rød: Du har et <strong>høyere langtidsfravær</strong> enn bransjen
                </>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
        case SykefraværVurdering.MASKERT:
        case SykefraværVurdering.INGEN_DATA:
            return (
                <>
                    Markert grå: Andel <strong>langtidsfravær</strong> fra 17. dag:
                </>
            );
        case SykefraværVurdering.FEIL:
            return <>—</>;
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
        case SykefraværVurdering.UNDER:
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som grønn på en skala grønn, gul og rød
                    <br />
                    Dette skjer når ditt sykefravær er lavere enn{' '}
                    {formaterProsent(getGrønnGrense(bransjensProsent))} prosent.
                </Normaltekst>
            );
        case SykefraværVurdering.MIDDELS:
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som gul på en skala grønn, gul og rød
                    <br />
                    Dette skjer når ditt sykefravær er mellom{' '}
                    {formaterProsent(getGrønnGrense(bransjensProsent))} og{' '}
                    {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                </Normaltekst>
            );
        case SykefraværVurdering.OVER:
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som rød på en skala grønn, gul og rød
                    <br />
                    Dette skjer når ditt sykefravær er høyere enn{' '}
                    {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                </Normaltekst>
            );
        case SykefraværVurdering.UFULLSTENDIG_DATA:
            return (
                <Normaltekst>
                    Sammenligningen blir markert grå fordi vi mangler dine tall for deler av
                    perioden. Sammenligningen lages når vi har tall for alle perioder.
                </Normaltekst>
            );
        case SykefraværVurdering.MASKERT:
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som grå fordi du har for lave tall til at
                    vi kan vise statistikken din.
                </Normaltekst>
            );
        case SykefraværVurdering.INGEN_DATA:
            return (
                <Normaltekst>
                    Sammenligningen din er blitt markert som grå fordi vi ikke finner tall for
                    virksomheten din. Vi viser dine tall når de publiseres.
                </Normaltekst>
            );
        case SykefraværVurdering.FEIL:
            return <></>;
    }
};
