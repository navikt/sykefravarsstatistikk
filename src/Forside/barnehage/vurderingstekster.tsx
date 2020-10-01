import React, { ReactElement } from 'react';
import { SykefraværResultat } from './Speedometer/Speedometer';
import { getGrønnGrense, getRødGrense } from './barnehage-utils';
import {formaterProsent} from "../../utils/app-utils";

export enum SammenligningsType {
    TOTALT = 'TOTALT',
    LANGTID = 'LANGTID',
    KORTTID = 'KORTTID'
}

export const getVurderingstekst = (
    sykefraværResultat: SykefraværResultat, sammenligningsType: SammenligningsType
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
    sykefraværResultat: SykefraværResultat
): ReactElement | string => {
    switch (sykefraværResultat) {
        case SykefraværResultat.UNDER:
            return (
                <>
                    Markert grønn: Du har <strong>lavere sykefravær</strong> enn andre barnehager i
                    Norge
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    Markert gul: Du har <strong>omtrent likt sykefravær</strong> som andre
                    barnehager i Norge
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    Markert rød: Du har <strong>høyere sykefravær</strong> enn andre barnehager i
                    Norge
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return (
                <>
                    Markert grå: <strong>Vi mangler dine tall for deler av perioden</strong> med
                    sammenligning.
                </>
            );
        case SykefraværResultat.MASKERT:
            return (
                <>
                    Markert grå: Du har <strong>for lave tall</strong> til at vi kan vise
                    statistikken din.
                </>
            );
        case SykefraværResultat.INGEN_DATA:
            return (
                <>
                    Markert grå: Vi <strong>finner ikke tall</strong> for virksomheten din.
                </>
            );
        case SykefraværResultat.FEIL:
            return <></>;
    }
};

export const getVurderingstekstKorttid = (resultat: SykefraværResultat) => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
            return (
                <>
                    Markert grønn: Du har et <strong>lavere legemeldt korttidsfravær</strong> enn
                    bransjen
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    Markert gul: Du har <strong>omtrent likt legemeldt korttidsfravær</strong> som
                    bransjen
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    Markert rød: Du har et <strong>høyere legemeldt korttidsfravær</strong> enn
                    bransjen
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
        case SykefraværResultat.MASKERT:
        case SykefraværResultat.INGEN_DATA:
            return (
                <>
                    Markert grå: Andel <strong>legemeldt korttidsfravær</strong> fra 1. til 16. dag:
                </>
            );
        case SykefraværResultat.FEIL:
            return <>—</>;
    }
};

export const getVurderingstekstLangtid = (resultat: SykefraværResultat) => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
            return (
                <>
                    Markert grønn: Du har et <strong>lavere langtidsfravær</strong> enn bransjen
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    Markert gul: Du har <strong>omtrent likt langtidsfravær</strong> som bransjen
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    Markert rød: Du har et <strong>høyere langtidsfravær</strong> enn bransjen
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
        case SykefraværResultat.MASKERT:
        case SykefraværResultat.INGEN_DATA:
            return (
                <>
                    Markert grå: Andel <strong>langtidsfravær</strong> fra 17. dag:
                </>
            );
        case SykefraværResultat.FEIL:
            return <>—</>;
    }
};

export const getForklaringAvVurdering = (resultat: SykefraværResultat, bransjensProsent: number) => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
            return (
                <>
                    Du er markert grønn.
                    <strong>
                        Sammenligningen blir markert grønn når ditt sykefravær er lavere enn{' '}
                        {formaterProsent(getGrønnGrense(bransjensProsent))} prosent.
                    </strong>
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    Du er markert gult.{' '}
                    <strong>
                        Sammenligningen blir markert gull når ditt sykefravær er mellom{' '}
                        {formaterProsent(getGrønnGrense(bransjensProsent))} og {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                    </strong>
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    Du er markert rødt.{' '}
                    <strong>
                        Sammenligningen blir markert rød når ditt sykefravær er høyere enn{' '}
                        {formaterProsent(getRødGrense(bransjensProsent))} prosent.
                    </strong>
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return (
                <>
                    Du er markert grått.{' '}
                    <strong>
                        Sammenligningen blir markert grå for Vi mangler dine tall for deler av
                        perioden.
                    </strong>
                </>
            );
        case SykefraværResultat.MASKERT:
            return (
                <>
                    Du er markert grått.{' '}
                    <strong>
                        Sammenligningen blir markert grå for du har for lave tall til at vi kan vise
                        statistikken din.
                    </strong>
                </>
            );
        case SykefraværResultat.INGEN_DATA:
            return (
                <>
                    Du er markert grått.{' '}
                    <strong>
                        Sammenligningen blir markert grå for vi finner ikke tall for virksomheten
                        din.
                    </strong>
                </>
            );
        case SykefraværResultat.FEIL:
            return <></>;
    }
};
