import React, { FunctionComponent } from 'react';
import { SykefraværResultat } from '../../Speedometer/Speedometer';

interface Props {
    resultat: SykefraværResultat;
    korttidEllerLangtid: 'korttidsfravær' | 'langtidsfravær';
}

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
        case SykefraværResultat.MASKERT:
        case SykefraværResultat.INGEN_DATA:
        case SykefraværResultat.UFULLSTENDIG_DATA:
        case SykefraværResultat.FEIL: // TODO
            return <>Her er det noe som ikke stemmer :/</>
    }
};
