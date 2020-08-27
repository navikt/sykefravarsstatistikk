import React, { FunctionComponent } from 'react';
import { SykefraværResultat } from '../../Speedometer/Speedometer';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    resultat: SykefraværResultat;
    korttidEllerLangtid: 'korttidsfravær' | 'langtidsfravær';
}

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
            return (
                <>
                    Andel <strong>legemeldt korttidsfravær</strong> mellom 1 og 16 dager:
                </>
            );
        case SykefraværResultat.MASKERT:
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
            return (
                <>
                    Andel <strong>langtidsfravær</strong> fra 17. dag:
                </>
            );
        case SykefraværResultat.MASKERT:
        case SykefraværResultat.INGEN_DATA:
        case SykefraværResultat.FEIL: // TODO
            return <>Her er det noe som ikke stemmer :/</>;
    }
};

export const Vurderingstekst: FunctionComponent<Props> = ({ resultat, korttidEllerLangtid }) => {
    switch (resultat) {
        case SykefraværResultat.UNDER:
            return (
                <>
                    Du har et <strong>lavere legemeldt {korttidEllerLangtid}</strong> enn bransjen
                </>
            );
        case SykefraværResultat.MIDDELS:
            return (
                <>
                    Du har <strong>omtrent likt legemeldt {korttidEllerLangtid}</strong> som
                    bransjen
                </>
            );
        case SykefraværResultat.OVER:
            return (
                <>
                    Du har et <strong>høyere legemeldt {korttidEllerLangtid}</strong> enn bransjen
                </>
            );
        case SykefraværResultat.UFULLSTENDIG_DATA:
            return (
                <>
                    Andel <strong>langtidsfravær</strong> fra 17. dag:
                </>
            );
        case SykefraværResultat.MASKERT:
        case SykefraværResultat.INGEN_DATA:
        case SykefraværResultat.FEIL: // TODO
            return <>Her er det noe som ikke stemmer :/</>;
    }
};
