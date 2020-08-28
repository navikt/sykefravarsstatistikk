import React, { ReactElement } from 'react';
import { SykefraværResultat } from './Speedometer/Speedometer';

interface Props {
    resultat: SykefraværResultat;
    korttidEllerLangtid: 'korttidsfravær' | 'langtidsfravær';
}

export const getVurderingstekstTotalt = (
    sykefraværResultat: SykefraværResultat
): ReactElement | string => {
    switch (sykefraværResultat) {
        case SykefraværResultat.UNDER:
            return (
                <>
                    Du har <strong>lavere sykefravær</strong> enn andre barnehager i Norge
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    Du har <strong>omtrent likt sykefravær</strong> som andre barnehager i Norge
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    Du har <strong>høyere sykefravær</strong> enn andre barnehager i Norge
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return (
                <>
                    <strong>Vi mangler dine tall for deler av perioden</strong> med sammenligning.
                </>
            );
        case SykefraværResultat.MASKERT:
            return (
                <>
                    Du har <strong>for lave tall</strong> til at vi kan vise sykefraværsstatistikken
                    din.
                </>
            );
        case SykefraværResultat.INGEN_DATA:
            return (
                <>
                    Vi <strong>finner ikke tall</strong> for virksomheten din.
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
                    Du har et <strong>lavere legemeldt korttidsfravær</strong> enn bransjen
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    Du har <strong>omtrent likt legemeldt korttidsfravær</strong> som bransjen
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    Du har et <strong>høyere legemeldt korttidsfravær</strong> enn bransjen
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
        case SykefraværResultat.MASKERT:
        case SykefraværResultat.INGEN_DATA:
            return (
                <>
                    Andel <strong>legemeldt korttidsfravær</strong> mellom 1 og 16 dager:
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
                    Du har et <strong>lavere langtidsfravær</strong> enn bransjen
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    Du har <strong>omtrent likt langtidsfravær</strong> som bransjen
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    Du har et <strong>høyere langtidsfravær</strong> enn bransjen
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
        case SykefraværResultat.MASKERT:
        case SykefraværResultat.INGEN_DATA:
            return (
                <>
                    Andel <strong>langtidsfravær</strong> fra 17. dag:
                </>
            );
        case SykefraværResultat.FEIL:
            return <>—</>;
    }
};
