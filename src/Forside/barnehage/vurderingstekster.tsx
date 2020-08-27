import React, { FunctionComponent, ReactElement } from 'react';
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
                    Vi <strong>mangler tall</strong> for deler av perioden med sammenligning.
                </>
            );
        case SykefraværResultat.MASKERT:
            return 'Det er for få ansatte i virksomheten til at vi kan vise sykefraværsstatistikken for din virksomhet.';
        case SykefraværResultat.INGEN_DATA:
        case SykefraværResultat.FEIL: // TODO
            return <>Her er det noe som ikke stemmer :/</>;
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
            return (
                <>
                    Andel <strong>legemeldt korttidsfravær</strong> mellom 1 og 16 dager:
                </>
            );
        case SykefraværResultat.INGEN_DATA:
        case SykefraværResultat.FEIL: // TODO
            return <>Her er det noe som ikke stemmer :/</>;
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
            return (
                <>
                    Andel <strong>langtidsfravær</strong> fra 17. dag:
                </>
            );
        case SykefraværResultat.INGEN_DATA:
        case SykefraværResultat.FEIL: // TODO
            return <>Her er det noe som ikke stemmer :/</>;
    }
};
